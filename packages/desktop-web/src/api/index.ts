
import { toPicket } from '@rapid/libs/common';
import { rApiGet, rApiPost } from './declare';

export * from './declare';

export type LoginSuccessResponse = {
  userinfo: {
    id: number;
    token: string;
  }
}
export interface  LoginReqPayload {
  username: string;
  password: string;
}
export const loginReq = (payload: LoginReqPayload) => {
  return rApiPost<LoginSuccessResponse, null>('/user/login', {
    data: payload
  })
}

export type RegisterSuccessResponse = {

}
export const registerReq = () => {
  return rApiPost<RegisterSuccessResponse, null>('/user/register', {

  })
}
