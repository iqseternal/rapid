import { isUnDef, isUndefined } from '@suey/pkg-utils';
import { validateIsSpaceStr } from '@rapid/validates';

/** 数字类的 Filter */
export const NumberFilters = {
  /** 对小数点进行 Filter */
  toFixed: (value: number | undefined, position = 2) => {
    if (isUndefined(value)) return 0;
    return Number(value.toFixed(position));
  },
  toString: (value: number) => value.toString()
}

/** 字符串类的 Filter */
export const StringFilters = {
  /**
   * 转换为有效字符串
   * @param value 需要转换的值
   * @param fillStr 如果是非有效字符串,那么填充什么字符串
   * @returns
   */
  toValidStr: (value: string | undefined, fillStr: string) => {
    if (isUndefined(value)) return fillStr;
    if (validateIsSpaceStr(value)) return fillStr;
    return value;
  }
}

/** 时间类的 Filter */
export const DateFilters = {




  toFullDate: () => {
    // TODO
  }
}
