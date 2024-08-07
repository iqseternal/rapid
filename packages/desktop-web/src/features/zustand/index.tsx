import { AppStore } from '@/actions';
import { loginReq, getUserinfoReq, UserinfoResponse } from '@/api';
import { toPicket, asynced } from '@rapid/libs/common';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface UserStore {
  userinfo?: UserinfoResponse;
  token: string;
}

export const useUserStore = create<UserStore>()(persist(immer((set, get, store) => ({
  // store
  userinfo: {},
  token: ''
})), {
  name: 'userStore',
  storage: createJSONStorage(() => window.sessionStorage)
}));

export const getAccessToken = async () => {
  const accessToken = await AppStore.get('accessToken');
  //
  if (accessToken !== useUserStore.getState().token) return Promise.reject('');

  return accessToken;
}

export const setToken = async (token: string) => {
  const [err, res] = await toPicket(AppStore.set('accessToken', token));
  if (err) return Promise.reject(err);

  useUserStore.setState({ token });
  return res;
}

export const userLogin = asynced<typeof loginReq>(async (loginPayload) => {
  const [loginErr, loginRes] = await toPicket(loginReq(loginPayload));
  if (loginErr) return Promise.reject(loginErr);

  await setToken(loginRes.data.userinfo.token);
  return loginRes;
});


export const userUpdateInfo = asynced<typeof getUserinfoReq>(async () => {
  const [infoErr, infoRes] = await toPicket(getUserinfoReq());

  if (infoErr) return Promise.reject(infoErr);

  useUserStore.setState({ userinfo: infoRes.data });
  return infoRes;
});
