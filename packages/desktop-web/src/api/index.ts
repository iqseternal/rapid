
import { toPicket } from '@rapid/libs/common';
import { RApiPromise, rApiGet, rApiPost } from './declare';
import { APP_STORE_KEYS, RSA_PUBLIC_KEY } from '@rapid/config/constants';
import { rsaEncryptAlgorithm, rsaDecryptAlgorithm, ApiPromiseLike } from '@suey/pkg-utils';
import { AppStore } from '@/actions';
import { PromiseThenRes, PromiseCatchReason } from '@rapid/libs/types';

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
export type LoginReqPromise = RApiPromise<LoginResponse, {}>;
export const loginReq = (payload: LoginReqPayload) => {
  return rApiPost<LoginResponse, {}>('/user/login', {
    data: {
      username: payload.username,
      // password: rsaEncryptAlgorithm(payload.password, RSA_PUBLIC_KEY)
    }
  });
}


export type UserinfoResponse = Partial<{
  id: number;
  username: string;
  nikename: string;
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
export type GetUserinfoReqPromise = RApiPromise<UserinfoResponse>;
export const getUserinfoReq = () => {
  return rApiPost<UserinfoResponse>('/user/getUserinfo');
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
