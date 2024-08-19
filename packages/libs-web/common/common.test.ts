
import { combinationCName } from './common';

test('react combinationCName 合并类名函数测试', () => {
  // 没有参数
  expect(combinationCName()).toBe('');

  expect(combinationCName('a')).toBe('a');
  expect(combinationCName('a', 'b')).toBe('a b');
  expect(combinationCName('a', 'b', 'c')).toBe('a b c');

  expect(combinationCName('a', true && 'b', 'c')).toBe('a b c');
  expect(combinationCName('a', false && 'b', 'c')).toBe('a c');

  expect(combinationCName('a', void 0, 'c')).toBe('a c');
  expect(combinationCName('a', true, true && 'b', void 0, 'c')).toBe('a b c');
  expect(combinationCName('a', true, false && 'b', void 0, 'c')).toBe('a c');

  expect(
    combinationCName(
      'a',
      'b',
      {
        ['c']: true,
        ['d']: false
      }
    )
  ).toBe('a b c');
})

