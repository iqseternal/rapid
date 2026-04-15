import type { AxiosResponse, AxiosPromise, AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosInterceptorManager, InternalAxiosRequestConfig, Axios } from 'axios';
import type { RPromiseLike } from '../types';
import type { IsUnknown } from '../types';

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK';

/**
 * 预定义的请求发送方式
 */
export const REQ_METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
  PUT: 'PUT'
} as const;

/**
 * 扩展机制, 当项目中需要配置指定请求发送 Token, 加密, 时间戳时使用
 */
export type RequestConfig<T, D = {}> = AxiosRequestConfig<D> & {
  hConfig?: T;
}

/**
 * 拦截器
 */
export interface Interceptors<K, V> {
  readonly onFulfilled?: (config: K) => V | Promise<V>;

  readonly onRejected?: <T extends AxiosError>(config: T) => V | Promise<V>;
}

export type R<Template, Definition = unknown, CrossAttribute extends string = 'data'> = IsUnknown<
  Template,
  Definition,
  (
    Template extends { [K in CrossAttribute]: infer S }
    ? Omit<Template, CrossAttribute> & { [K in CrossAttribute]: Definition }
    : Template & { [K in CrossAttribute]: Definition }
  )
>;

export type ApiPromiseLikeTypeBuilder<SuccessResponse, FailResponse = unknown> = RPromiseLike<AxiosResponse<SuccessResponse>, FailResponse>;

export type ApiPromiseResultTypeBuilder<SuccessResponseTemplate, FailResponseTemplate, SuccessResponse, FailResponse, CrossAttribute extends string = 'data'> = ApiPromiseLikeTypeBuilder<
  R<SuccessResponseTemplate, SuccessResponse, CrossAttribute>,
  R<FailResponseTemplate, FailResponse, CrossAttribute>
>;
