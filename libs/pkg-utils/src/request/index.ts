import { REQ_METHODS } from './declare';
import { createApiRequest } from './request';

export type {
  AxiosError, AxiosResponse, AxiosAdapter, AxiosInterceptorOptions,
  AddressFamily, Axios, AxiosRequestConfig, AxiosRequestHeaders,
  AxiosRequestTransformer, AxiosResponseTransformer, AxiosResponseHeaders
} from 'axios';

export type { Method, RequestConfig, Interceptors, ApiPromiseLikeTypeBuilder, ApiPromiseResultTypeBuilder, R } from './declare';
export { REQ_METHODS } from './declare';

export type { RequestFunction } from './request';
export { createApiRequest, default as createRequest } from './request';

const { apiGet, apiPost, createApi, request } = createApiRequest('', {}, {});

export { apiGet, apiPost, request }

export const apiPut = createApi(REQ_METHODS.PUT);

export const apiDelete = createApi(REQ_METHODS.DELETE);
