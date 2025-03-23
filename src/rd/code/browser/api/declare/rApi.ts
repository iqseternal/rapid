import { REQ_METHODS, createApiRequest, ApiPromiseResultTypeBuilder, AxiosError, RequestConfig } from '@rapid/libs';
import { StringFilters } from '@rapid/libs-web';
import { getAccessToken } from '@/features';
import { AppInformationService } from 'rd/base/common/service/AppInformationService';

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
  readonly code: number;

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

  /**
   * 响应描述
   */
  readonly message: string;

  /**
   * 响应服务器 响应时时间戳
   */
  readonly _t: number;
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

const appInformation = AppInformationService.getInstance();

const rApiConfig: RequestConfig<RApiHConfig> = {
  timeout: 5000,
};

const rApiRequest = createApiRequest<RApiHConfig, RApiSuccessResponse, RApiFailResponse>(appInformation.information.appApiUrls.rApi, rApiConfig, {
  async onFulfilled(config) {

  },
}, {
  onFulfilled(response) {
    if (response.data && Reflect.has(response.data, 'code') && Reflect.has(response.data, 'data')) {
      const data = response.data;
      if (data.code === 0) return Promise.resolve(data);
      return Promise.reject(data);
    }

    return response;
  },
  onRejected(err) {
    return Promise.reject<RApiFailResponse>({
      code: -1,
      data: err.response?.data,
      message: StringFilters.toValidStr(err.message, '未知错误'),
      _t: +new Date(),
      INNER: {
        stack: err.stack,
        config: err.config,
        request: err.request,
        response: err.response,
        name: err.name
      },
      more: {
        pako: false
      }
    } as RApiFailResponse);
  }
})

export const { apiGet: rApiGet, apiPost: rApiPost, request: rRequest, createApi: rCreateApi } = rApiRequest;

export const rApiPut = rCreateApi(REQ_METHODS.PUT);

export const rApiDelete = rCreateApi(REQ_METHODS.DELETE);

export const rApiPatch = rCreateApi('PATCH');
