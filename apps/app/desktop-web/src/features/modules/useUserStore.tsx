import { loginReq, getUserinfoReq, UserinfoResponse, logoutReq } from '@/api';
import { useShallowReactive } from '@rapid/libs-web';
import { toPicket, asynced, RPromiseLike } from '@rapid/libs';
import { useEffect, useLayoutEffect } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface UserStore {
  userinfo?: UserinfoResponse;
  accessToken: string;
}

export const useUserStore = create<UserStore>()(persist(immer((set, get, store) => ({
  // store
  userinfo: {},
  accessToken: ''
})), {
  name: 'userStore',
  storage: createJSONStorage(() => window.sessionStorage)
}));

/**
 * 获得用户的 AccessToken
 */
export const getAccessToken = async () => {
  const accessToken = await window.stores.appStore.get('accessToken');
  //
  if (accessToken !== useUserStore.getState().accessToken) return Promise.reject('');

  return accessToken;
}

export const setAccessToken = async (accessToken: string) => {
  const [err, res] = await toPicket(window.stores.appStore.set('accessToken', accessToken));
  if (err) return Promise.reject(err);

  useUserStore.setState({ accessToken });
  return res;
}


/**
 * 校验用户是否获取了凭证, 即是否登录了
 * @returns
 */
export const authHasAuthorizedSync = () => {
  const { accessToken, userinfo } = useUserStore.getState();
  return (accessToken && accessToken.trim() !== '');
}
export const authHasAuthorized = async () => {
  const [err, accessToken] = await toPicket(getAccessToken());
  if (err || !accessToken || accessToken.trim() === '') return false;
  return true;
}
export const useAuthHasAuthorized = () => {
  const accessToken = useUserStore((store) => store.accessToken);

  const [state] = useShallowReactive({
    hasAuthorize: (accessToken && accessToken.trim() !== '')
  });

  useLayoutEffect(() => {
    state.hasAuthorize = (accessToken && accessToken.trim() !== '');
  }, [accessToken]);
  return state;
}

export interface AuthHasRoleOptions {

}

/**
 * 验证用户的权限等级
 * @returns
 */
export const authHasRoleSync = (roleOptions: AuthHasRoleOptions) => {
  const { accessToken, userinfo } = useUserStore.getState();

  const roles = userinfo?.roles ?? [];
  if (roles.includes('admin')) return true;
  return false;
}
export const authHasRole = async (roleOptions: AuthHasRoleOptions) => {

  return authHasRoleSync(roleOptions);
}
export const useAuthRole = (roleOptions: AuthHasRoleOptions) => {
  const [state] = useShallowReactive({
    hasRole: false
  });
  const accessToken = useUserStore((store) => store.accessToken);
  const roles = useUserStore(store => store.userinfo?.roles ?? []);

  useLayoutEffect(() => {
    if (roles.includes('admin')) {
      state.hasRole = true;
    }
  }, [accessToken, roles]);

  return state;
}


/**
 * 用户相关的操作, actions
 *
 * 异步、网络请求
 */
export const userActions = {

  /**
   * 用户登录
   */
  userLogin: asynced<typeof loginReq>(async (loginPayload) => {
    const [loginErr, loginRes] = await toPicket(loginReq(loginPayload));
    if (loginErr) return Promise.reject(loginErr);

    await setAccessToken(loginRes.data.userinfo.token);
    return loginRes;
  }),

  /**
   * 更新用户信息
   */
  userUpdateInfo: asynced<typeof getUserinfoReq>(async () => {
    const [infoErr, infoRes] = await toPicket(getUserinfoReq());
    if (infoErr) return Promise.reject(infoErr);

    useUserStore.setState({ userinfo: infoRes.data });
    return infoRes;
  }),

  /**
   * 用户退出登录
   */
  useLogout: asynced<() => RPromiseLike<void>>(async () => {
    const [err, res] = await toPicket(logoutReq());

    if (err) return Promise.reject();
    return Promise.resolve();
  })
}

