import { toPicket } from '@rapid/libs/common';
import { RApiPromiseLike, rApiGet, rApiPost } from './declare';
import { APP_STORE_KEYS, RSA_PUBLIC_KEY } from '@rapid/config/constants';
import { rsaEncryptAlgorithm, rsaDecryptAlgorithm, ApiPromiseLike } from '@suey/pkg-utils';
import { AppStore } from '@/actions';

export * from './declare';

export type LoginResponse = {
  userinfo: {
    id: number;
    token: string;
  }
}

export interface LoginReqPayload {
  username: string;
  password: string;
}
export type LoginReqPromise = RApiPromiseLike<LoginResponse, null>;
export const loginReq = (payload: LoginReqPayload) => {
  return rApiPost<LoginResponse, {}>('/user/login', {
    hConfig: {
      needAuth: false
    },
    data: {
      username: payload.username,
      password: rsaEncryptAlgorithm(payload.password, RSA_PUBLIC_KEY)
    }
  });
}

export type UserinfoResponse = Partial<{
  id: number;
  username: string;
  nickname: string;
  roles: string[];
  isVip: number;
  vipTime: number;
  sex: boolean | null;
  avatarUrl: string;
  age: number;
  qq: string;
  email: string;
  phone: string;
  address: string;
}>;
export type GetUserinfoReqPromise = RApiPromiseLike<UserinfoResponse>;
export const getUserinfoReq = () => {
  return rApiPost<UserinfoResponse>('/user/getUserinfo', {

  });
}

export type RegisterSuccessResponse = {

}
export const registerReq = () => {
  return rApiPost<RegisterSuccessResponse, null>('/user/register', {

  })
}


export const logoutReq = () => {
  return rApiPost<null, null>('/user/logout');
}
