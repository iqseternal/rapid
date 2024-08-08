
import { AppStore } from '@/actions';
import { loginReq, getUserinfoReq, UserinfoResponse } from '@/api';
import { toPicket, asynced } from '@rapid/libs/common';
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
  const accessToken = await AppStore.get('accessToken');
  //
  if (accessToken !== useUserStore.getState().accessToken) return Promise.reject('');

  return accessToken;
}

export const setAccessToken = async (accessToken: string) => {
  const [err, res] = await toPicket(AppStore.set('accessToken', accessToken));
  if (err) return Promise.reject(err);

  useUserStore.setState({ accessToken });
  return res;
}

export const userLogin = asynced<typeof loginReq>(async (loginPayload) => {
  const [loginErr, loginRes] = await toPicket(loginReq(loginPayload));
  if (loginErr) return Promise.reject(loginErr);

  await setAccessToken(loginRes.data.userinfo.token);
  return loginRes;
});


export const userUpdateInfo = asynced<typeof getUserinfoReq>(async () => {
  const [infoErr, infoRes] = await toPicket(getUserinfoReq());

  if (infoErr) return Promise.reject(infoErr);

  useUserStore.setState({ userinfo: infoRes.data });
  return infoRes;
});

