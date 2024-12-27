import { rApiPost } from './declare';
import type { RApiPromiseLike } from './declare';
import { rRsaEncrypt } from '@libs/crypto';

// ==================================================================================

export type LoginResponse = {
  readonly userinfo: {
    readonly id: number;
    readonly token: string;
  }
}

export interface LoginReqPayload {
  readonly username: string;
  readonly password: string;
}

export type LoginReqPromise = RApiPromiseLike<LoginResponse, null>;

export const loginReq = (payload: LoginReqPayload) => {
  return rApiPost<LoginResponse, {}>('/user/login', {
    hConfig: {
      needAuth: false
    },
    data: {
      username: payload.username,
      password: rRsaEncrypt(payload.password)
    }
  });
}

// ==================================================================================
export interface UserinfoResponse {
  readonly id: number;
  readonly username: string;
  readonly nickname?: string;
  readonly roles?: string[];
  readonly isVip?: number;
  readonly vipTime?: number;
  readonly sex?: boolean | null;
  readonly avatarUrl?: string;
  readonly age?: number;
  readonly qq?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly address?: string;
}

export type GetUserinfoReqPromise = RApiPromiseLike<UserinfoResponse>;

export const getUserinfoReq = () => {
  return rApiPost<UserinfoResponse>('/user/getUserinfo', {

  });
}


// ==================================================================================

export interface RegisterSuccessResponse {

}

export const registerReq = () => {
  return rApiPost<RegisterSuccessResponse, null>('/user/register', {

  })
}

// ==================================================================================

export const logoutReq = () => {
  return rApiPost<null, null>('/user/logout');
}
