import { isUnDef } from '@suey/pkg-utils';
import { computed, isRef } from 'vue';
import type { Ref, ComputedRef, UnwrapNestedRefs, UnwrapRef } from 'vue';

/** 数字类的 Filter */
export const NumberFilters = {
  /** 对小数点进行 Filter */
  toFixed: (value: Ref<number | undefined> | number | undefined, position = 2) => {
    if (isUnDef(value)) value = 0;

    if (isRef(value)) return Number(value.value.toFixed(position));
    return Number(value.toFixed(position));
  },
  toString: (value: number) => value.toString()
}

/** 字符串类的 Filter */
export const StringFilters = {
  /** 转换为有效字符串 */
  toValidStr: (value: Ref<string | undefined> | string | undefined, fillStr: string) => {
    const realValue = isRef(value) ? value.value : value;
    if (!realValue) return fillStr;
    return realValue;
  }
}
