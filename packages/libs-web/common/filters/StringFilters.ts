
/**
 * 转换为有效字符串
 *
 * @example
 *
 * const str: (null | string) = '';
 *
 * <>{StringFilters.toValidStr(str, '-')}</> // 展示 -
 */
export const toValidStr = (value: string | undefined | null, fillStr: string) => {
  if (!(typeof value === 'string')) return fillStr;
  if (value.trim() === '') return fillStr;
  return value;
}

/**
 * 首字母大写
 */
export const toCapitalizeFirstLetter = (value: string | undefined | null) => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}
