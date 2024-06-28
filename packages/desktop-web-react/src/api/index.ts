import { CONFIG } from '@rapid/config/constants';
import { REQ_METHODS, createApiRequest, isUndefined } from '@suey/pkg-utils';

export type { RequestConfig, Interceptors } from '@suey/pkg-utils';
export { REQ_METHODS, createApiRequest, createRequest } from '@suey/pkg-utils';

/** 请求 hconfig 配置 */
export interface RApiHConfig {
  /** 默认都需要认证 */
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
}

export const rApi = createApiRequest<RApiHConfig, RApiBasicResponse>(CONFIG.API.URL, {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  timeout: CONFIG.API.TIMEOUT,
  // withCredentials: true
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
    if (response.data.more?.pako) {
      // TODO:
    }

    return response;
  }
})

export const { apiGet: rApiGet, apiPost: rApiPost, request: rRequest, createApi: rCreateApi } = rApi;

export const rApiPut = rCreateApi(REQ_METHODS.PUT);

export const rApiDelete = rCreateApi(REQ_METHODS.DELETE);
