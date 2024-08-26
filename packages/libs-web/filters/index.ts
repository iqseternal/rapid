/**
 * 字符串转换
 */
export const StringFilters = {
  /**
   * 转换为有效字符串
   *
   * @example
   *
   * const str: (null | string) = '';
   *
   * <>{StringFilters.toValidStr(str, '-')}</> // 展示 -
   *
   * @param value
   * @param fillStr
   * @returns
   */
  toValidStr(value: string | undefined | null, fillStr: string) {
    if (!(typeof value === 'string')) return fillStr;
    if (value.trim() === '') return fillStr;
    return value;
  }
}

/**
 * 数字转换
 */
export const NumberFilters = {
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
   *
   * @param value
   * @param position
   * @returns
   */
  toFixed(value: number | undefined | null, position = 2) {
    if (!(typeof value === 'number')) return 0;

    return Number(value.toFixed(position));
  },
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
  toPercentage(value: number | undefined | null, position = 2, fillStr = '0%' as `${number}%`): `${number}%` {
    if (!(typeof value === 'number')) return fillStr; // 如果不是合格的数字, 直接返回填充字符, 因为填充字符可能不是数字字符
    const dist = NumberFilters.toFixed(value * 100, position);
    return `${dist.toFixed(position) as `${number}`}%` as const;
  },
  /**
   * 转换为科学技术法
   *
   * @example
   * const a = 1234567.89;
   * NumberFilters.toScientificCount(a); // 1.235E6
   *
   */
  toScientificCount(value: number | undefined | null) {
    if (!(typeof value === 'number')) value = 0;

    const formatter = new Intl.NumberFormat('zh-CN', {
      style: 'decimal',
      notation: 'scientific'
    });
    return formatter.format(value);
  },

  /**
   * 将数字转换为货币进行展示
   * @example
   * const a = 1000.12;
   * NumberFilters.toCurrency(a, 'CNY'); // ￥1,000.12
   */
  toCurrency(value: number | undefined | null, currency = 'CNY' as ('CNY' | 'USD')) {
    if (!(typeof value === 'number')) value = 0;

    const formatter = new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency
    });
    return formatter.format(value);
  },
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
  toString(value: number | undefined | null, defaultStr = '') {
    if (!(typeof value === 'number')) return defaultStr;

    return value.toString();
  }
}
