
import type { Ref, UnwrapRef } from 'vue';

import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { setCssVar, getCssVar } from '@rapid/libs/common';

interface USE_CSS_VAR_OPTIONS<T> {
  defaultValue?: string; // 维护默认值
  get: (str: string) => T; // 从 HTMLElement 元素中获取的样式的字符串值, 要求返回一个指定的格式维护
  set: (val: T) => string; // 你的指定格式的值被设置到 HTMLElement 元素中的时候, 需要进行格式化的操作
}

export const cssRoot: HTMLElement = document.querySelector(':root') as HTMLElement;

export const useCssVar = <KEY extends `--${string}`, T>(el: Ref<HTMLElement>, cssVar: KEY, options: USE_CSS_VAR_OPTIONS<T> = {
  get(str: string) { return str as unknown as T; },
  set(val: T) { return val as string; }
}) => {
  let isFull = false;
  const cssVarData = ref(options.defaultValue) as Ref<T>;
  onMounted(() => {
    if (!el.value) {
      console.error('ref 没有挂载成功');
      return;
    }
    cssVarData.value = options.get(getCssVar(el.value, cssVar));
    isFull = true;
  });

  watch(() => cssVarData.value, (cur, pre) => {
    if (!isFull) return;
    setCssVar(el.value, cssVar, options.set(cur));
  });
  return cssVarData;
}

export const useCssVarForRoot = <KEY extends `--${string}`, T>(cssVar: KEY, options: USE_CSS_VAR_OPTIONS<T> = {
  get(str: string) { return str as unknown as T; },
  set(val: T) { return val as string; }
}) => useCssVar(ref(cssRoot) as Ref<HTMLElement>, cssVar, options);


