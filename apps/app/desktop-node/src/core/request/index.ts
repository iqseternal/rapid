/**
 * ==========================================
 *
 * 项目的请求 Api 创建
 *
 * ==========================================
 */
import { CONFIG } from '@rapid/config/constants';
import { createApiRequest, REQ_METHODS } from '@rapid/libs';

export const { apiGet, apiPost, createApi } = createApiRequest(CONFIG.API.URL, {}, {

})

export const apiPut = createApi(REQ_METHODS.PUT);

export const apiDelete = createApi(REQ_METHODS.DELETE);
