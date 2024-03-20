import { isDef, isString } from '@suey/pkg-utils';

/**
 * 验证当前是否是一个空字符串
 * @param val
 * @returns
 */
export const validateSpaceStr = (val: string) => val.trim() === '';

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
export const validatePhone = (val: string) => {
  const regex = /^[1-9]\d{10}$/;

  return regex.test(val);
};

