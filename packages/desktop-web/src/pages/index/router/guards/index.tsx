import { useLayoutEffect, type FC, ReactNode, createContext, useState, Dispatch, SetStateAction, useCallback, useMemo, forwardRef, ReactElement } from 'react';
import { useAsyncLayoutEffect, useReactive, useUnmount } from '@rapid/libs-web/hooks';
import { Skeleton } from 'antd';

import { getToken, useUserStore } from '@/features/zustand';
import { toPicket } from '@rapid/libs/common';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { loginRoute } from '../routes';

import IMessage from '@rapid/libs-web/components/IMessage';

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
    useLayoutEffect(() => {
      if (!state.authFinished) return;

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

  /**
   * 验证权限/角色是否符合规范
   * @returns
   */
  AuthRole: <GFC extends FC<any>>(Component: GFC): GFC => forwardRef<any, Parameters<GFC>[0]>((props, ref) => {

    const token = useUserStore(store => store.token);
    const roles = useUserStore(store => store.userinfo?.roles ?? []);

    if (!roles.includes('admin')) return <></>;

    return <Component {...props} ref={ref} />;

  }) as unknown as GFC,


}


