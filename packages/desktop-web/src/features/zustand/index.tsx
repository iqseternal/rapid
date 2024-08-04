import {AppStore} from '@/actions';
import {loginReq, getUserinfoReq, UserinfoResponse} from '@/api';
import {APP_STORE_KEYS} from '@rapid/config/constants';
import {toPicket, asynced} from '@rapid/libs/common';
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

export interface UserStore {
  userinfo?: UserinfoResponse;
  token: string;
}

export const useUserStore = create<UserStore>()(immer((set, get, store) => ({
  // store
  userinfo: {},
  token: ''
})));

export const getToken = async () => {
  // return useUserStore.getState().token;

  return await AppStore.get(APP_STORE_KEYS.USER_TOKEN);
}

export const setToken = async (token: string) => {
  const [err, res] = await toPicket(AppStore.set(APP_STORE_KEYS.USER_TOKEN, token));
  if (err) return Promise.reject(err);

  useUserStore.setState(state => {
    state.token = token;
  })
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
  useUserStore.setState(state => {
    state.userinfo = infoRes.data;
  })
  return infoRes;
});
