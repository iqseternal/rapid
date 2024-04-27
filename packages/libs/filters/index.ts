import { isUnDef, isUndefined } from '@suey/pkg-utils';
import { isRef, unref } from 'vue';
import type { Ref } from 'vue';
import { validateIsSpaceStr } from '@rapid/validates';

/** 数字类的 Filter */
export const NumberFilters = {
  /** 对小数点进行 Filter */
  toFixed: (value: Ref<number | undefined> | number | undefined, position = 2) => {
    if (isUnDef(value)) value = 0;
    if (isUndefined(value)) value = 0;

    if (isRef<number>(value)) {
      if (isUndefined(value.value)) return 0;

      return Number(value.value.toFixed(position));
    }

    return Number((value as number).toFixed(position));
  },
  toString: (value: number) => value.toString()
}

/** 字符串类的 Filter */
export const StringFilters = {
  /** 转换为有效字符串 */
  toValidStr: (value: Ref<string | undefined> | string | undefined, fillStr: string) => {
    const realValue = unref(value);

    if (isUndefined(realValue)) return fillStr;

    if (validateIsSpaceStr(realValue)) return fillStr;
    return realValue;
  }
}
