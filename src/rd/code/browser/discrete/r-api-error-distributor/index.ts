import { isRApiResponse } from 'rd/base/common/api';
import { Biz } from 'rd/base/common/constants';

/**
 *
 * 分发器
 */
native.invoker.handle('r-api-err-distributor', async response => {
  if (!isRApiResponse(response)) return Promise.reject(response);

  const data = response.data;

  // 资源访问凭证过期或者无效 ?
  if (
    [
      Biz.BearerAuthorizationInvalid,
      Biz.AccessTokenExpired,
      Biz.AccessTokenInvalid
    ].includes(data.code)
  ) {


    return Promise.reject(response);
  }

  return Promise.reject(data);
})
