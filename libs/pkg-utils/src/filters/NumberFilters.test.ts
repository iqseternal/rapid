import { NumberFilters } from '.';

describe('NumberFilters', () => {
  it('toFixed', () => {
    expect(NumberFilters.toFixed(3.1415926, 2)).toBe(3.14);
    expect(NumberFilters.toFixed(null, 2)).toBe(0);
    expect(NumberFilters.toFixed(void 0, 2)).toBe(0);
    expect(NumberFilters.toFixed(undefined, 2)).toBe(0);
    expect(NumberFilters.toFixed(NaN, 2)).toBe(0);

    // @ts-ignore: 测试错误参数传递
    expect(NumberFilters.toFixed({}, 2)).toBe(0);
    // @ts-ignore: 测试错误参数传递
    expect(NumberFilters.toFixed([], 2)).toBe(0);
    // @ts-ignore: 测试错误参数传递
    expect(NumberFilters.toFixed('3.1415926', 2)).toBe(3.14);
    // @ts-ignore: 测试错误参数传递
    expect(NumberFilters.toFixed('3.1415926a', 2)).toBe(0);
    // @ts-ignore: 测试错误参数传递
    expect(NumberFilters.toFixed('a3.1415926', 2)).toBe(0);
  })

  it('toPercentage', () => {
    expect(NumberFilters.toPercentage(0.111111, 2)).toBe('11.11%');
    expect(NumberFilters.toPercentage(null, 2)).toBe('0%');
    expect(NumberFilters.toPercentage(void 0, 2)).toBe('0%');
    expect(NumberFilters.toPercentage(undefined, 2)).toBe('0%');
    expect(NumberFilters.toPercentage(NaN, 2)).toBe('0%');

    // @ts-ignore: 测试错误参数传递
    expect(NumberFilters.toPercentage({}, 2)).toBe('0%');
    // @ts-ignore: 测试错误参数传递
    expect(NumberFilters.toPercentage([], 2)).toBe('0%');
    // @ts-ignore: 测试错误参数传递
    expect(NumberFilters.toPercentage('0.111111', 2)).toBe('11.11%');
    // @ts-ignore: 测试错误参数传递
    expect(NumberFilters.toPercentage('0.111111a', 2)).toBe('0%');
    // @ts-ignore: 测试错误参数传递
    expect(NumberFilters.toPercentage('a0.111111', 2)).toBe('0%');
  })
});
