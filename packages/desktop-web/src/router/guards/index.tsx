import type { FC, Dispatch, SetStateAction, ReactElement, ReactNode, FunctionComponent, ForwardRefExoticComponent } from 'react';
import { useLayoutEffect, createContext, useState, useCallback, useMemo, forwardRef } from 'react';
import { useAsyncLayoutEffect, useReactive, useUnmount } from '@rapid/libs-web/hooks';
import { Input, Skeleton } from 'antd';
import { getToken, useUserStore } from '../../features/zustand';
import { toPicket } from '@rapid/libs/common';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';

import IMessage from '@rapid/libs-web/components/IMessage';

export type ReactFCComponent = ForwardRefExoticComponent<any> | FC<any>;

export type GuardsAuthorizedContext = {
  authFinished: boolean;
  authorized: boolean;
  auth: () => Promise<void>;
}

export const GuardsContext = {
  Authorized: createContext<GuardsAuthorizedContext>({
    authFinished: false,
    authorized: false,
    auth: async () => {}
  })
}


/**
 * 验证权限/角色是否符合规范
 * @returns
 */
function AuthRole<GFC extends ReactFCComponent>(Component: GFC): GFC;
function AuthRole<GProps extends { children?: ReactNode }>(props: GProps): ReactNode;
function AuthRole<GFC extends ReactFCComponent>(args: GFC | { children: ReactNode }): GFC | ReactNode {

  // 验证用户的权限等级
  const authHasRole = () => {
    const token = useUserStore(store => store.token);
    const roles = useUserStore(store => store.userinfo?.roles ?? []);
    if (roles.includes('admin')) return true;
    return false;
  }

  // 包裹 FC, 返回一个新的组件
  if (
    typeof args === 'function' ||
    (args as unknown as ForwardRefExoticComponent<any>).$$typeof
  ) {
    const Component = args as ReactFCComponent;

    return forwardRef<any, any>((props, ref) => {
      const hasRole = authHasRole();

      if (!hasRole) return <></>;

      return <Component {...props} ref={ref} />;
    }) as unknown as GFC;
  }

  // 本身作为了一个组件使用
  const { children } = args;

  const hasRole = authHasRole();

  if (!hasRole) return <></>;

  return children;
}


export const Guards = {
  /**
   * 授权守卫, 检测当前用户是否获得了授权凭证
   * @returns
   */
  AuthAuthorized: <GFC extends FC<any>>(Component: GFC): GFC => forwardRef<any, Parameters<GFC>[0]>((props, ref) => {
    const navigate = useNavigate();

    const [state] = useReactive({
      // 是否获取授权信息完成
      authFinished: false,
      // 是否被授权
      authorized: false
    });

    const auth = useCallback(async (): Promise<void> => {
      console.log('检查授权信息');
      // 获得授权信息
      const [err, token] = await toPicket(getToken());

      if (err || !token || token === '') IMessage.warning(`未获得授权许可`);
      else state.authorized = true;

      state.authFinished = true;
    }, []);
    const authorizedContext = useMemo(() => ({
      ...state,
      auth
    }), [state.authFinished, state.authorized, auth]);

    useAsyncLayoutEffect(auth, []);
    useAsyncLayoutEffect(async () => {
      if (!state.authFinished) return;

      const { loginRoute } = await import('../modules');

      // 未获得授权
      if (!state.authorized) navigate(loginRoute.meta.fullPath);
    }, [state.authFinished]);

    useUnmount(() => {
      state.authFinished = false;
      state.authorized = false;
    });

    return <GuardsContext.Authorized.Provider value={authorizedContext}>
      {!state.authorized ? <Skeleton /> : <Component {...props} ref={ref} />}
    </GuardsContext.Authorized.Provider>

  }) as unknown as GFC,
  AuthRole
}


