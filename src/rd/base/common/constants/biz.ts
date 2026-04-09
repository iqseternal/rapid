import type { RApiBasicResponse } from '../api';

export const enum Biz {
  Success = 0,
  Failure = -1,

  Unauthorized = 401,
  Forbidden = 403,
  RequestTimeout = 408,
  MethodNotAllowed = 405,

  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,

  BearerAuthorizationInvalid = -1001,
  ParameterError = -1003,

  AccessTokenInvalid = -2002,
  RefreshTokenInvalid = -2003,
  DatabaseQueryError = -2004,
  AccessTokenExpired = -2005,
  RefreshTokenExpired = -2006,

  UserNotHasAdminRole = 1001,
  UserNotExists = 1010,
}

export const BizMessage = {
  [Biz.MethodNotAllowed]: '方法不允许',

  [Biz.InternalServerError]: '内部错误',
  [Biz.NotImplemented]: '服务未实现',
  [Biz.BadGateway]: '网关错误',
  [Biz.ServiceUnavailable]: '服务不可用',


  [Biz.ParameterError]: '参数错误',
} as const;

export const toBizErrorMsg = (response: RApiBasicResponse, msg?: string) => {
  if (typeof response !== 'object') return msg;
  if (!Reflect.has(response, 'data')) return msg;

  const data = response.data;

  if (typeof data !== 'object') return msg;
  if (!Reflect.has(data, 'code')) return msg;

  const definitionMsg = BizMessage[data.code as keyof typeof BizMessage];

  if (definitionMsg) return definitionMsg;
  return data.message ?? msg;
}
