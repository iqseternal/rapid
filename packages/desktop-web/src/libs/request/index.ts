/**
 * ==========================================
 * 项目的请求 Api 创建
 * ==========================================
 */
import { createApiRequest } from '@suey/pkg-utils';
import { getToken } from '@libs/storage';
import { inflate } from 'pako';
import { CONFIG } from '@rapid/config/constants';

const isOkStatus = (status: number): boolean => {
  if (status >= 200 && status < 300) return true;
  if (status === 400) console.log('失败的请求');
  if (status === 403) console.log('服务器拒绝了此请求');
  if (status === 404) console.log('目标地址未找到');
  if (status >= 500) console.log('服务器内部错误');
  return false;
}

export { REQ_METHODS, type RequestConfig } from '@suey/pkg-utils';

export const { apiGet, apiPost, request, createApi } = createApiRequest<HConfig, BasicResponse>(CONFIG.API.URL, {
  timeout: CONFIG.API.TIMEOUT
}, {
  onFulfilled: config => {
    if (config.hConfig?.needAuth) {
      if (!config.headers) config.headers = {};
      if (getToken()) config.headers['authorization'] = 'Bearer ' + getToken(true);
    }
  },
  onRejected: config => Promise.reject(config)
}, {
  onFulfilled: response => {
    if (response.data.status && response.data.flag) {
      const status = response.data.status;

      if (response.data.more && response.data.more.pako === true) response.data.data = JSON.parse(inflate(response.data.data as Buffer, { to: 'string' }));

      if (!isOkStatus(+status)) return Promise.reject(response.data);
      return Promise.resolve(response.data);
    }
    return Promise.resolve(response);
  },
  onRejected: err => {
    if (err.data && err.data.status && err.data.flag) err.data = err.data.data as any;
    return Promise.reject(err);
  }
});
