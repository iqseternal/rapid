
import { classnames } from './common';

test('react classnames 合并类名函数测试', () => {
  // 没有参数
  expect(classnames()).toBe('');

  expect(classnames('a')).toBe('a');
  expect(classnames('a', 'b')).toBe('a b');
  expect(classnames('a', 'b', 'c')).toBe('a b c');

  expect(classnames('a', true && 'b', 'c')).toBe('a b c');
  expect(classnames('a', false && 'b', 'c')).toBe('a c');

  expect(classnames('a', void 0, 'c')).toBe('a c');
  expect(classnames('a', true, true && 'b', void 0, 'c')).toBe('a b c');
  expect(classnames('a', true, false && 'b', void 0, 'c')).toBe('a c');

  expect(
    classnames(
      'a',
      'b',
      {
        ['c']: true,
        ['d']: false
      }
    )
  ).toBe('a b c');
})

