import { REQ_METHODS, createApiRequest, ApiPromiseResultTypeBuilder, AxiosError, RequestConfig } from '@suey/pkg-utils';
import type { AxiosRequestConfig, AxiosResponse } from '@suey/pkg-utils';
import { AppInformationService } from 'rd/base/common/service/AppInformationService';

const appInformation = AppInformationService.getInstance();

/**
 * 请求 hConfig 配置
 */
export interface RApiHConfig {
  /**
   * 默认都需要认证
   * @default true
   */
  readonly needAuth?: boolean;
}

/**
 * 基本响应结构体的内容
 */
export interface RApiBasicResponse {
  /**
   * 状态码
   */
  readonly code: 0 | number;

  /**
   * 响应描述
   */
  readonly message: string;

  /**
   * 返回数据, 具有 data 定义
   */
  readonly data: any;

  /**
   * 更多的响应体修饰
   */
  readonly more?: {

    /**
     * 响应数据是否被压缩了
     */
    readonly pako?: boolean;
  }
}

export interface RApiSuccessResponse extends RApiBasicResponse {

}

export interface RApiFailResponse extends RApiBasicResponse {
  /**
   * 更多的错误信息
   */
  readonly INNER: {
    /**
     * 栈信息
     */
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

export const isRApiResponse = (response: AxiosResponse<any>): response is AxiosResponse<RApiSuccessResponse, RApiFailResponse> => response.data && Reflect.has(response.data, 'code');

const rApiConfig: RequestConfig<RApiHConfig> = {
  timeout: 5000,
};

const rApiRequest = createApiRequest<RApiHConfig, RApiSuccessResponse, RApiFailResponse>(appInformation.information.appApiUrls.rApi, rApiConfig, {
  async onFulfilled(config) {

  },
}, {
  onFulfilled(response) {
    if (!isRApiResponse(response)) return response;

    if (response.data.code === 0) return response;

    const globalThat = globalThis as any;

    // 获取当前环境是否存在 rApp
    // 如果存在, 则寻找存在的 invoker 分发器
    if (
      Reflect.has(globalThat, 'rApp') &&
      Reflect.has(globalThat.rApp, 'invoker')
    ) return globalThat.rApp.invoker.invoke('r-api-err-distributor', response);

    return response;
  },
  onRejected(err) {

    return Promise.reject<RApiFailResponse>({
      code: -1,
      data: err.response?.data,
      message: err.message || '未知错误',
      INNER: {
        stack: err.stack || '',
        config: err.config,
        request: err.request,
        response: err.response as any,
        name: err.name
      },
    });
  }
})

export const { apiGet: rApiGet, apiPost: rApiPost, request: rRequest, createApi: rCreateApi } = rApiRequest;

export const rApiPut = rCreateApi(REQ_METHODS.PUT);

export const rApiDelete = rCreateApi(REQ_METHODS.DELETE);

export const rApiPatch = rCreateApi('PATCH');
