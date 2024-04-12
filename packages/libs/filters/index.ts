import { computed, isRef } from 'vue';
import type { Ref, ComputedRef, UnwrapNestedRefs, UnwrapRef } from 'vue';

/** 数字类的 Filter */
export const NumberFilters = {
  /** 对小数点进行 Filter */
  toFixed: (value: () => (Ref<number> | number), position = 2) => {
    const distValue = computed(value) as ComputedRef<number>;

    return computed(() => Number(distValue.value.toFixed(position)));
  },
  toString: (value: number) => value.toString()
}

