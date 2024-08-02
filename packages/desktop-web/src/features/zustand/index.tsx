import { useStore, create, createStore, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { produce } from 'immer';
import { toPicket, asynced } from '@rapid/libs/common';
import { loginReq, LoginReqPayload, getUserinfoReq, UserinfoResponse, LoginReqPromise, GetUserinfoReqPromise } from '@/api';
import { AppStore } from '@/actions';
import { APP_STORE_KEYS } from '@rapid/config/constants';
import { message } from 'antd';

import IMessage from '@rapid/libs-web/components/IMessage';

export interface UserStore {
  userinfo?: UserinfoResponse;
  token: string;

  getToken: () => Promise<string>;
  setToken: (token: string) => Promise<void>;
}

export const useUserStore = create<UserStore>()(immer((set, get, store) => ({
  // store
  userinfo: { },
  token: '',

  getToken: async () => {

    return get().token;
  },
  setToken: async (token: string) => {
    set(state => {
      state.token = token;
    });

    return AppStore.set(APP_STORE_KEYS.USER_TOKEN, token);
  }
})));


export const userLogin = asynced<(payload: LoginReqPayload) => LoginReqPromise>(async (loginPayload) => {

  const [loginErr, loginRes] = await toPicket(loginReq(loginPayload));

  if (loginErr) return Promise.reject(loginErr);

  localStorage.setItem(APP_STORE_KEYS.USER_TOKEN, loginRes.data.userinfo.token);

  return loginRes;
});


export const userUpdateInfo = asynced<() => GetUserinfoReqPromise>(async () => {
  const [infoErr, infoRes] = await toPicket(getUserinfoReq());

  if (infoErr) return Promise.reject(infoErr);
  useUserStore.setState(state => {
    state.userinfo = infoRes.data;
  })
  return infoRes;
});
