
import { randomRegionForInt, toNil, apiPost, apiGet } from '@rapid/libs';


;;(async () => {
  const [err, res] = await toNil(apiGet('http://oupro.cn/api/v1.0.0/t', {
    data: {
      username: "username",
      password: ""
    }
  }));

  if (err) {
    console.error('Failed to fetch data:', err?.reason.data);
    return;
  }

  console.log(res.data);
})();
