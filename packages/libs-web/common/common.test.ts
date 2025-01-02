
import { classnames } from './common';

describe('classnames', () => {
  it('should handle an empty set of arguments', () => {
    expect(classnames()).toBe('');
  });

  it('should ignore void 0 arguments', () => {
    expect(classnames(void 0)).toBe('');
  });

  it('should ignore boolean arguments', () => {
    expect(classnames(true)).toBe('');
    expect(classnames(false)).toBe('');
  });

  it('should ignore number arguments', () => {
    expect(classnames(123)).toBe('');
  });

  it('should accept string arguments', () => {
    expect(classnames('class1', 'class2')).toBe('class1 class2');
  });

  it('should accept a mix of string and void 0 arguments', () => {
    expect(classnames('class1', void 0, 'class2')).toBe('class1 class2');
  });

  it('should accept a mix of string and boolean arguments', () => {
    expect(classnames('class1', true, 'class2')).toBe('class1 class2');
  });

  it('should accept a mix of string and number arguments', () => {
    expect(classnames('class1', 123, 'class2')).toBe('class1 class2');
  });

  it('should accept an object argument', () => {
    expect(classnames({ 'class1': true, 'class2': false })).toBe('class1');
  });

  it('should accept a mix of string and object arguments', () => {
    expect(classnames('class1', { 'class2': true, 'class3': false }, 'class4')).toBe('class1 class2 class4');
  });

  it('should accept nested objects', () => {
    expect(classnames({ 'class1': true, 'class2': { 'class3': true } })).toBe('class1 class2');
  });

  it('should handle multiple classes in a single object', () => {
    expect(classnames({ 'class1': true, 'class2': true })).toBe('class1 class2');
  });

  it('should handle no classes in an object', () => {
    expect(classnames({ 'class1': false, 'class2': false })).toBe('');
  });

  it('should handle an empty object', () => {
    expect(classnames({})).toBe('');
  });

  it('should handle null', () => {
    expect(classnames(null)).toBe('');
  });

  it('should handle a mix of all valid inputs', () => {
    expect(classnames('class1', { 'class2': true, 'class3': false }, 'class4', null, void 0, true, 123, { 'class5': true })).toBe('class1 class2 class4 class5');
  });
});

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

