
import { apiGet } from './index';


test('测试是否能够请求', async () => {
  const res = await apiGet('/t');

  if (res.data) {
    return Promise.resolve();
  }

  return Promise.reject();
})

