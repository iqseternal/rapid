import type { FC, Dispatch, SetStateAction, ReactElement, ReactNode, FunctionComponent, ForwardRefExoticComponent } from 'react';
import { useLayoutEffect, createContext, useState, useCallback, useMemo, forwardRef, useEffect, isValidElement, useContext } from 'react';
import { useAsyncLayoutEffect, useReactive, useShallowReactive, useUnmount } from '@rapid/libs-web/hooks';
import { Input, Skeleton } from 'antd';
import { authHasAuthorized, authHasRoleSync, getAccessToken, useAuthRole, useUserStore, useAuthHasAuthorized } from '@/features';
import { toPicket, isObject, isFunction, isClass } from '@suey/pkg-utils';
import { useNavigate, useRouteLoaderData, useMatch } from 'react-router-dom';
import { retrieveRoutes } from '@/router';

import { isReactFC, isReactForwardFC, isReactComponent } from '@rapid/libs-web';

import IMessage from '@components/IMessage';


export type ReactComponent = ForwardRefExoticComponent<any> | FC<any>;

export const GuardsContext = {
  Authorized: createContext<ReturnType<typeof useAuthHasAuthorized>>({
    hasAuthorize: false
  })
}

/**
 * 验证权限/角色是否符合规范
 * @returns
 */
export function AuthRole<GFC extends ReactComponent>(Component: GFC): GFC;
export function AuthRole<GProps extends { children: ReactNode }>(props: GProps): ReactNode;
export function AuthRole<GFC extends ReactComponent>(args: GFC | { children: ReactNode }): GFC | ReactNode {
  // 包裹 FC, 返回一个新的组件
  if (isReactComponent(args)) {
    const Component = args;

    return forwardRef<any, any>((props, ref) => {
      const hasRoleState = useAuthRole({});

      if (!hasRoleState.hasRole) return <></>;

      return <Component {...props} ref={ref} />;
    }) as unknown as GFC;
  }

  // 本身作为了一个组件使用
  if (isObject(args) && isValidElement(args.children)) {
    const { children } = args;

    const hasRoleState = useAuthRole({});

    if (!hasRoleState.hasRole) return <></>;

    return children;
  }

  throw new Error(`AuthRole: 参数错误`);
}


/**
 * 授权守卫, 检测当前用户是否获得了授权凭证
 * @returns
 */
export function AuthAuthorized<GFC extends ReactComponent>(Component: GFC): GFC;
export function AuthAuthorized<GProps extends { children: ReactNode }>(props: GProps): ReactNode;
export function AuthAuthorized<GFC extends ReactComponent>(args: GFC | { children: ReactNode }): GFC | ReactNode {
  if (isReactComponent(args)) {
    const Component = args as GFC;

    return forwardRef<any, Parameters<GFC>[0]>((props, ref) => {
      const navigate = useNavigate();

      const hasAuthorizedContext = useContext(GuardsContext.Authorized);

      useEffect(() => {
        if (hasAuthorizedContext.hasAuthorize) return;

        const { loginRoute } = retrieveRoutes();

        navigate(loginRoute.meta.fullPath);
      }, [hasAuthorizedContext.hasAuthorize]);

      if (!hasAuthorizedContext.hasAuthorize) return <></>;

      return <Component {...props} ref={ref} />
    }) as unknown as GFC;
  }

  // 自身是一个组件, 那么必须含有 children
  if (isObject(args) && isValidElement(args.children)) {
    const { children } = args;

    const navigate = useNavigate();

    const hasAuthorizedContext = useContext(GuardsContext.Authorized);

    useEffect(() => {
      if (hasAuthorizedContext.hasAuthorize) return;

      const { loginRoute } = retrieveRoutes();

      navigate(loginRoute.meta.fullPath);
    }, [hasAuthorizedContext.hasAuthorize]);

    if (!hasAuthorizedContext.hasAuthorize) return <></>;

    return children;
  }

  throw new Error(`AuthAuthorized: 参数错误`);
}



export const Guards = {
  AuthAuthorized,
  AuthRole
}


