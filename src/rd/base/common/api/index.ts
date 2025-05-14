
export type { RApiBasicResponse, RApiFailResponse, RApiHConfig, RApiPromiseLike, RApiSuccessResponse } from './rApi';
export { isRApiResponse, rApiDelete, rApiGet, rApiPatch, rApiPost, rApiPut, rCreateApi, rRequest } from './rApi';

export type { RequestConfig, Interceptors, ApiPromiseLikeTypeBuilder, ApiPromiseResultTypeBuilder, Method } from '@suey/pkg-utils';

export { REQ_METHODS } from '@suey/pkg-utils';
export { createApiRequest, createRequest } from '@suey/pkg-utils';
export { apiGet, apiPost, apiPut, apiDelete, request } from '@suey/pkg-utils';
