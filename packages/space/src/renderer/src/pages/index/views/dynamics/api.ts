import { randomRegionForInt } from '@rapid/libs/common';

const str = `阿萨大大金卡睡觉流口水大家发的时间都是垃圾斯大林你卡上你大四那年啊发生的的那几款三剑客飒飒你就打算睡觉而非你说的发到你姐夫单价多少附件双方发生的那件事都见不到VS吧撒旦你决定是否南京南京`;

const randomChar = () => str.charAt(randomRegionForInt(0, str.length - 1));

const randomStr = (len: number) => [...new Array(len)].map(() => randomChar()).join('');

export interface Response {
  name: string;
  age: string;
  data: {
    s_addr: string;
    d_addr: string;
  };
}

export async function getListApi() {
  return new Promise<Response[]>((resolve, reject) => {
    const data: Response[] = [];

    for (let i = 0;i < 100;i ++) {
      data.push({
        name: randomStr(randomRegionForInt(3, 7)),
        age: i.toString(),
        data: {
          s_addr: '0.0.0.0',
          d_addr: '0.0.0.1'
        }
      })
    }

    setTimeout(() => {
      resolve(data);
    }, 500);
  })
}
