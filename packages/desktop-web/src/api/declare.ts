import { CONFIG } from '@rapid/config/constants';
import { REQ_METHODS, createApiRequest, isUndefined, ApiPromiseResultTypeBuilder } from '@suey/pkg-utils';
import { StringFilters } from '@rapid/libs/formatter';
import type { AxiosError } from 'axios';
import { getAccessToken } from '@/features/zustand';

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

export type RApiPromiseLike<Success, Fail = {}> = ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, Success, Fail>;

export const rApi = createApiRequest<RApiHConfig, RApiSuccessResponse, RApiFailResponse>(CONFIG.API.URL, {
  timeout: CONFIG.API.TIMEOUT
}, {
  async onFulfilled(config) {
    if (!config.hConfig) config.hConfig = { needAuth: true };
    if (isUndefined(config.hConfig.needAuth)) config.hConfig.needAuth = true;
    if (config.hConfig.needAuth && config.headers) {
      // TODO:
      const accessToken = await getAccessToken();
      if (accessToken) config.headers.authorization = `Bearer ${accessToken}`;
      // config.headers['_t'] = `${+new Date()}`;
    }
  },
}, {
  onFulfilled(response) {
    // nestjs server response.
    if (response.data && response.data.flag && response.data.status) {
      if (response.data.flag === 'ApiResponseOk') return Promise.resolve(response.data);
      if (response.data.flag === 'ApiResponseFal') {
        console.error(response.data);

        return Promise.reject(response.data);
      }

      return response;
    }
    return response;
  },
  onRejected(err) {
    return Promise.reject<RApiFailResponse>({
      status: +(err.response?.status ?? 0),
      flag: 'ApiResponseFal',
      data: err.response?.data,
      descriptor: StringFilters.toValidStr(err.message, '未知错误'),
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

export const rApiPatch = rCreateApi('PATCH');
