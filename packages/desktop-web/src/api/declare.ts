import { CONFIG } from '@rapid/config/constants';
import { REQ_METHODS, createApiRequest, isUndefined } from '@suey/pkg-utils';

import type { Axios, AxiosError } from 'axios';
export type { RequestConfig, Interceptors } from '@suey/pkg-utils';
export { REQ_METHODS, createApiRequest, createRequest } from '@suey/pkg-utils';

/** 请求 hConfig 配置 */
export interface RApiHConfig {
  /**
   * 默认都需要认证
   * @default true
   */
  needAuth?: boolean;
}

/** 基本响应结构体的内容 */
export interface RApiBasicResponse {
  status: number;
  flag: string;
  data: any;
  more?: {
    pako?: boolean;
  }
  descriptor: string;
  _t: number;
}
export interface RApiSuccessResponse extends RApiBasicResponse {
  flag: 'ApiResponseOk';
}
export interface RApiFailResponse extends RApiBasicResponse {
  flag: 'ApiResponseFal';

  INNER: {
    stack: string;
    name: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['name'];
    config: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['config'];
    request: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['request'];
    response: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['response'];

  }
}

export const rApi = createApiRequest<RApiHConfig, RApiSuccessResponse, RApiFailResponse>(CONFIG.API.URL, {
  timeout: CONFIG.API.TIMEOUT
}, {
  onFulfilled(config) {
    if (!config.hConfig) config.hConfig = { needAuth: true };
    if (isUndefined(config.hConfig.needAuth)) config.hConfig.needAuth = true;
    if (config.hConfig.needAuth) {
      // TODO:
    }
  },
}, {
  onFulfilled(response) {
    // nestjs server response.
    if (response.data && response.data.flag && response.data.status) {
      if (response.data.flag === 'ApiResponseOk') return Promise.resolve(response.data);
      if (response.data.flag === 'ApiResponseFal') return Promise.reject(response.data);

      return response;
    }
    return response;
  },
  onRejected(err) {

    return Promise.reject<RApiFailResponse>({
      status: +(err.code ?? '0'),
      flag: 'ApiResponseFal',
      data: err.toJSON(),
      descriptor: err.message,
      _t: +new Date(),
      INNER: {
        stack: err.stack,
        config: err.config,

        request: err.request,
        response: err.response,
        name: err.name

      }
    } as RApiFailResponse);
  }
})

export const {
  apiGet: rApiGet,
  apiPost: rApiPost,
  request: rRequest,
  createApi: rCreateApi
} = rApi;

export const rApiPut = rCreateApi(REQ_METHODS.PUT);

export const rApiDelete = rCreateApi(REQ_METHODS.DELETE);

