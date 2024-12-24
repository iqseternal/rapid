import { CONFIG } from '@rapid/config/constants';
import { REQ_METHODS, createApiRequest, isUndefined, ApiPromiseResultTypeBuilder } from '@rapid/libs';
import { StringFilters } from '@rapid/libs-web';
import type { AxiosError } from 'axios';
import { getAccessToken } from '@/features';

export type { RequestConfig, Interceptors } from '@rapid/libs';
export type { createApiRequest, createRequest } from '@rapid/libs';
export { REQ_METHODS }

/** 请求 hConfig 配置 */
export interface RApiHConfig {
  /**
   * 默认都需要认证
   * @default true
   */
  readonly needAuth?: boolean;
}

/** 基本响应结构体的内容 */
export interface RApiBasicResponse {
  readonly status: number;
  readonly flag: 'ApiResponseOk' | 'ApiResponseFal';
  readonly data: any;
  readonly more?: {
    readonly pako?: boolean;
  }
  readonly descriptor: string;
  readonly _t: number;
}

export interface RApiSuccessResponse extends RApiBasicResponse {
  readonly flag: 'ApiResponseOk';
}

export interface RApiFailResponse extends RApiBasicResponse {
  readonly flag: 'ApiResponseFal';

  /** 更多的错误信息 */
  readonly INNER: {
    readonly stack: string;
    readonly name: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['name'];
    readonly config: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['config'];
    readonly request: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['request'];
    readonly response: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['response'];
  }
}

/**
 * RApiPromiseLike, 可以通过 then, catch 获得不同的相应数据类型提示
 * 也可以通过 toNil 获取类型
 *
 * ```ts
 * declare const pr: RApiPromiseLike<number,  string>;
 * const [err, res] = await toNil(pr);
 * if (err) {
 *   console.log(err.descriptor);
 *   return;
 * }
 * res;
 * //
 * ```
 */
export type RApiPromiseLike<Success, Fail = {}> = ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, Success, Fail>;


export const rApi = createApiRequest<RApiHConfig, RApiSuccessResponse, RApiFailResponse>(CONFIG.API.URL, {
  timeout: 5000
}, {
  async onFulfilled(config) {
    if (!config.hConfig) config.hConfig = { needAuth: true };

    const needAuth = config.hConfig.needAuth ?? true;

    if (needAuth && config.headers) {
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
      if (response.data.flag === 'ApiResponseFal') return Promise.reject(response.data);

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

export const { apiGet: rApiGet, apiPost: rApiPost, request: rRequest, createApi: rCreateApi } = rApi;

export const rApiPut = rCreateApi(REQ_METHODS.PUT);

export const rApiDelete = rCreateApi(REQ_METHODS.DELETE);

export const rApiPatch = rCreateApi('PATCH');
