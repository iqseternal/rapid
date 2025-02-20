import { CONFIG } from '@rapid/config/constants';
import { REQ_METHODS, createApiRequest, ApiPromiseResultTypeBuilder, AxiosError } from '@rapid/libs';
import { StringFilters } from '@rapid/libs-web';
import { getAccessToken } from '@/features';

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
  /**
   * 状态码
   */
  readonly status: number;

  /**
   * 标志
   */
  readonly flag: 'ApiResponseOk' | 'ApiResponseFal';

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
  readonly descriptor: string;

  /**
   * 响应服务器 响应时时间戳
   */
  readonly _t: number;
}

export interface RApiSuccessResponse extends RApiBasicResponse {
  readonly flag: 'ApiResponseOk';
}

export interface RApiFailResponse extends RApiBasicResponse {
  readonly flag: 'ApiResponseFal';

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

const rApiRequest = createApiRequest<RApiHConfig, RApiSuccessResponse, RApiFailResponse>(CONFIG.API.URL, {
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

export const { apiGet: rApiGet, apiPost: rApiPost, request: rRequest, createApi: rCreateApi } = rApiRequest;

export const rApiPut = rCreateApi(REQ_METHODS.PUT);

export const rApiDelete = rCreateApi(REQ_METHODS.DELETE);

export const rApiPatch = rCreateApi('PATCH');
