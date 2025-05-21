
/**
 * 将数字按照指定小数点格式输出
 *
 * @example
 *
 * const n = 3.1415926;
 * <>{NumberFilters.toFixed(n, 2)}</> // 展示 3.14
 *
 * const nr: (undefined | number) = void 0;
 * <>{NumberFilters.toFixed(nr, 2)}</> // 展示 0.00
 */
export const toFixed = (value: number | `${number}` | undefined | null, position = 2) => {
  if (!(typeof value === 'number')) value = Number(value);
  if (Number.isNaN(value)) return 0;
  return Number(value.toFixed(position));
}

/**
 * 将数字转换为百分率
 *
 * @example
 *
 * const a = 0.111111;
 * NumberFilters.toPercentage(a, 2); // 11.11%
 *
 * const c = void 0;
 * NumberFilters.toPercentage(a, 2, '0%'); // c不是一个数字, 0%
 *
 */
export const toPercentage = (value: number | undefined | null, position = 2, fillStr = '0%' as `${number}%`): `${number}%` => {
  // 如果不是合格的数字, 直接返回填充字符, 因为填充字符可能不是数字字符
  if (!(typeof value === 'number')) return fillStr;

  const dist = toFixed(value * 100, position);
  if (Number.isNaN(dist)) return fillStr;
  return `${dist}%` as const;
}

/**
 * 将数字转换为字符串输出
 *
 * @example
 *
 * const a = void 0;
 * NumberFilters.toString(a); // ''
 *
 * @returns
 */
export const toString = (value: number | undefined | null, defaultStr = '') => {
  if (!(typeof value === 'number')) return defaultStr;
  return value.toString();
}
