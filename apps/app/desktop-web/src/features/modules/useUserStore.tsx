import { loginReq, getUserinfoReq, UserinfoResponse, logoutReq } from '@/api';
import { useShallowReactive } from '@rapid/libs-web';
import { toNil, asynced, RPromiseLike } from '@rapid/libs';
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
  userinfo: void 0,
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
  const [err, res] = await toNil(window.stores.appStore.set('accessToken', accessToken));
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
  const [err, accessToken] = await toNil(getAccessToken());
  if (err || !accessToken || accessToken.trim() === '') return false;
  return true;
}
export const useAuthHasAuthorized = () => {
  const accessToken = useUserStore((store) => store.accessToken);
  return !!accessToken && accessToken.trim() !== '';
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
    state.hasRole = true;
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
    const [loginErr, loginRes] = await toNil(loginReq(loginPayload));
    if (loginErr) {
      // return Promise.reject(loginErr.reason);
      await setAccessToken('虚假的 TOKEN');
      const res = {
        data: {
          userinfo: {
            id: 1,
            username: 'Apache'
          }
        }
      }
      useUserStore.setState({
        userinfo: res.data.userinfo
      })
      return res;
    }

    await setAccessToken(loginRes.data.userinfo.token);
    useUserStore.setState({
      userinfo: {
        id: 1,
        username: 'Apache'
      }
    })
    return loginRes;
  }),

  /**
   * 更新用户信息
   */
  userUpdateInfo: asynced<typeof getUserinfoReq>(async () => {
    const [infoErr, infoRes] = await toNil(getUserinfoReq());
    if (infoErr) return Promise.reject(infoErr.reason);

    useUserStore.setState({ userinfo: infoRes.data });
    return infoRes;
  }),

  /**
   * 用户退出登录
   */
  useLogout: asynced<() => RPromiseLike<void>>(async () => {
    const [err, res] = await toNil(logoutReq());

    if (err) return Promise.reject();
    return Promise.resolve();
  })
}

