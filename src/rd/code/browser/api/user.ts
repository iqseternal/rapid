import { rApiPost } from 'rd/base/common/api';
import type { RApiPromiseLike } from 'rd/base/common/api';
import { rRsaEncrypt } from '@/libs/crypto';

// ==================================================================================

export type LoginResponse = {
  readonly userinfo: {
    readonly id: number;
    readonly token: string;
  }
}

export interface LoginApiPayload {
  readonly username: string;
  readonly password: string;
}

export type LoginApiPromise = RApiPromiseLike<LoginResponse, null>;

/**
 * 登录
 */
export const loginApi = (payload: LoginApiPayload) => {
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
export interface RegisterResponse {

}

export interface RegisterApiPayload {

}

export type RegisterApiPromise = RApiPromiseLike<RegisterResponse, null>;

/**
 * 注册
 */
export const registerApi = (payload: RegisterApiPayload) => {
  return rApiPost<RegisterResponse, null>('/user/register', {

  })
}


// ==================================================================================
export interface LogoutResponse {

}

export interface LogoutApiPayload {

}

export type LogoutApiPromise = RApiPromiseLike<LogoutResponse, null>;

/**
 * 登出
 */
export const logoutApi = (payload: LogoutApiPayload) => {
  return rApiPost<LogoutResponse, null>('/user/logout', {

  })
}
