import { StringFilters, NumberFilters } from '.';

describe('StringFilters', () => {
  it('toValidStr', () => {
    expect(StringFilters.toValidStr(void 0, '-')).toBe('-');
    expect(StringFilters.toValidStr(null, '-')).toBe('-');
    expect(StringFilters.toValidStr('', '-')).toBe('-');
    expect(StringFilters.toValidStr('hello', '-')).toBe('hello');

    // @ts-ignore: 测试错误参数传递
    expect(StringFilters.toValidStr({}, '-')).toBe('-');
    // @ts-ignore: 测试错误参数传递
    expect(StringFilters.toValidStr([], '-')).toBe('-');
  })

  it('toCapitalizeFirstLetter', () => {
    expect(StringFilters.toCapitalizeFirstLetter(void 0)).toBe('');
    expect(StringFilters.toCapitalizeFirstLetter(null)).toBe('');
    expect(StringFilters.toCapitalizeFirstLetter('')).toBe('');
    expect(StringFilters.toCapitalizeFirstLetter('hello')).toBe('Hello');
  })
});

