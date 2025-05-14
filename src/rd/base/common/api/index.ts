
export type { RApiBasicResponse, RApiFailResponse, RApiHConfig, RApiPromiseLike, RApiSuccessResponse } from './rApi';
export { isRApiResponse, rApiDelete, rApiGet, rApiPatch, rApiPost, rApiPut, rCreateApi, rRequest } from './rApi';

export type { RequestConfig, Interceptors, ApiPromiseLikeTypeBuilder, ApiPromiseResultTypeBuilder, Method } from '@rapid/libs';

export { REQ_METHODS } from '@rapid/libs';
export { createApiRequest, createRequest } from '@rapid/libs';
export { apiGet, apiPost, apiPut, apiDelete, request } from '@rapid/libs';
