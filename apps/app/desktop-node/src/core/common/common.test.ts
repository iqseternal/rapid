
import { randomRegion, randomRegionForInt } from './common';

test('随机数测试', (done) => {
  const rs = [Math.random(), Math.random()];
  const [start, end] = rs.sort();

  for (let i = 0;i < 30;i ++) {
    const targetNumber = randomRegion(start, end);

    if (targetNumber < start || targetNumber > end) return done(`产生的数字超出了区间`);
  }

  done();
})

test('随机整数测试', (done) => {
  const rs = [Math.floor(Math.random()), Math.floor(Math.random())];
  const [start, end] = rs.sort();

  for (let i = 0;i < 30;i ++) {
    const targetNumber = randomRegionForInt(start, end);

    if (targetNumber < start || targetNumber > end) return done(`产生的数字超出了区间`);

    if (!Number.isInteger(targetNumber)) return done(`产生的数字不是整数`);
  }

  done();
})
