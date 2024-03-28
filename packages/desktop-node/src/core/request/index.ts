/**
 * ==========================================
 * 项目的请求 Api 创建
 * ==========================================
 */
import { CONFIG } from '@rapid/config/constants';
import { REQ_METHODS, createApiRequest } from '@suey/pkg-utils';

export const { apiGet, apiPost, createApi } = createApiRequest(CONFIG.API_URL, {}, {

})

export const apiPut = createApi(REQ_METHODS.PUT);

export const apiDelete = createApi(REQ_METHODS.DELETE);
