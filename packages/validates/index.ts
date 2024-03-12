import { isString, isDecimal, isDef } from '@suey/pkg-utils';

/**
 * 校验目标字符串是一个非空串
 * @param str
 * @returns
 */
export const validatorIsSpaceStr = (str: string) => isString(str) && str.trim() === '';

/**
 * 校验字符串是否有效，即非空字符串
 * @param str
 * @returns
 */
export const validatorValidStr = (str: string) => !validatorIsSpaceStr(str);

/**
 * 校验用户真实姓名是否符合规范，是否在Unicode码中并且支持译名
 * @param str
 * @returns
 */
export const validatorRealName = (str: string) => isString(str) && /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/.test(str);

/**
 * 返回一个验证函数，验证改值是否在指定数字范围中
 * @param min
 * @param max
 * @returns
 */
export const validatorNumberRange = (min: number, max: number) => (value: string | number) => {
  const vn = +value;
  if (vn < min || vn > max) return false;
  return true;
}

/**
 * 验证邮箱是否有效
 * @param val
 * @returns
 */
export const validateEmail = (val: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(val);
};

/**
 * 验证手机号码是否有效 (+86)
 * @param val
 * @returns
 */
export const validateChinaPhone = (val: string) => {
  const regex = /^[1-9]\d{10}$/;

  return regex.test(val);
};

