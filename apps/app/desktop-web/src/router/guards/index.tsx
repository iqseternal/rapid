import type { FC, Dispatch, SetStateAction, ReactElement, ReactNode, FunctionComponent, ForwardRefExoticComponent } from 'react';
import { useLayoutEffect, createContext, useState, useCallback, useMemo, forwardRef, useEffect, isValidElement, useContext } from 'react';
import { useAsyncLayoutEffect, useReactive, useShallowReactive, useUnmount } from '@rapid/libs-web/hooks';
import { Input, Skeleton } from 'antd';
import { authHasAuthorized, authHasRoleSync, getAccessToken, useAuthRole, useUserStore, useAuthHasAuthorized } from '@/features';
import { toPicket, isObject } from '@suey/pkg-utils';
import { useNavigate, useRouteLoaderData, useMatch } from 'react-router-dom';
import { retrieveRoutes } from '@router/retrieve';

import IMessage from '@rapid/libs-web/components/IMessage';

export type ReactFCComponent = ForwardRefExoticComponent<any> | FC<any>;

export type GuardsAuthorizedContext = {
  authFinished: boolean;
  authorized: boolean;
  auth: () => Promise<void>;
}

export const GuardsContext = {
  Authorized: createContext<ReturnType<typeof useAuthHasAuthorized>>({
    hasAuthorize: false
  })
}

/**
 * 验证权限/角色是否符合规范
 * @returns
 */
function AuthRole<GFC extends ReactFCComponent>(Component: GFC): GFC;
function AuthRole<GProps extends { children: ReactNode }>(props: GProps): ReactNode;
function AuthRole<GFC extends ReactFCComponent>(args: GFC | { children: ReactNode }): GFC | ReactNode {
  // 包裹 FC, 返回一个新的组件
  if (
    typeof args === 'function' ||
    (args as unknown as ForwardRefExoticComponent<any>).$$typeof
  ) {
    const Component = args as ReactFCComponent;

    return forwardRef<any, any>((props, ref) => {
      const hasRoleState = useAuthRole({});

      if (!hasRoleState.hasRole) return <></>;

      return <Component {...props} ref={ref} />;
    }) as unknown as GFC;
  }

  // 本身作为了一个组件使用
  const { children } = args;

  const hasRoleState = useAuthRole({});

  if (!hasRoleState.hasRole) return <></>;

  return children;
}


/**
 * 授权守卫, 检测当前用户是否获得了授权凭证
 * @returns
 */
function AuthAuthorized<GFC extends ReactFCComponent>(Component: GFC): GFC;
function AuthAuthorized<GProps extends { children: ReactNode }>(props: GProps): ReactNode;
function AuthAuthorized<GFC extends ReactFCComponent>(args: GFC | { children: ReactNode }): GFC | ReactNode {
  if (typeof args === 'function') {
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

  // 自身是一个组件
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
}



export const Guards = {
  AuthAuthorized,
  AuthRole
}


