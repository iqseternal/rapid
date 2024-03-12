/**
 * ==========================================
 * 创建通用型 Api 函数
 * ==========================================
 */
import { request, apiGet, apiPost, createApi, REQ_METHODS, type RequestConfig } from '@libs/request';

export { request, apiGet, apiPost };

export const apiPut = createApi(REQ_METHODS.PUT);

export const apiDel = createApi(REQ_METHODS.DELETE);

export const apiLink = createApi('LINK');

export const apiOptions = createApi('OPTIONS');

export const apiPatch = createApi('PATCH');
