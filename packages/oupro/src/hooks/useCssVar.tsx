import type { RefObject } from 'react';
import { useState, useEffect } from 'react';
import { useReactive } from './useReactive';
import { getCssVar, setCssVar } from '@rapid/libs/common';
import type { CSSTypes } from '@rapid/libs/common';
import { isString } from '@suey/pkg-utils';

interface USE_CSS_VAR_OPTIONS<T> {
  autoInit?: boolean;
  defaultValue?: string; // 维护默认值
  get: (str: string) => T; // 从 HTMLElement 元素中获取的样式的字符串值, 要求返回一个指定的格式维护
  set: (val: T) => string; // 你的指定格式的值被设置到 HTMLElement 元素中的时候, 需要进行格式化的操作
}

const DEFAULT_CSS_VAR_OPTIONS = {
  autoInit: true,
  get<V>(str: string) { return str as unknown as V; },
  set<V>(val: V) { return val as string; }
}

const isValidStr = (str: string | undefined | null) => {
  if (!isString(str)) return false;
  if (str.trim() === '') return false;
  return true;
}

export function useCssVar<Key extends CSSTypes.CSSVarName, Dom extends HTMLElement, V>(dom: RefObject<Dom>, cssVar: Key, options: USE_CSS_VAR_OPTIONS<V> = DEFAULT_CSS_VAR_OPTIONS) {
  const state = useReactive({
    value: options.defaultValue ?? ''
  });

  const setCssValue = (key: Key, value: V) => {
    if (!dom.current) return;
    setCssVar(dom.current, key, options.set(value));
  }

  useEffect(() => {
    if (!dom.current) return;

    const preV = getCssVar(dom.current, cssVar);

    if (isValidStr(preV)) setCssVar(dom.current, cssVar, state.value, { convert: options.set });
    else state.value = getCssVar(dom.current, cssVar);
  }, []);

  useEffect(() => {
    if (!dom.current) return;

    setCssVar(dom.current, cssVar, state.value);
  }, [state.value])

  return state;
}


export function useCssVars<Key extends string, Dom extends HTMLElement, V>(dom: RefObject<Dom>, cssVars: Record<Key, string | undefined>, options: Omit<USE_CSS_VAR_OPTIONS<V>, 'defaultValue'> = DEFAULT_CSS_VAR_OPTIONS) {
  const state = useReactive({ ...cssVars }, { autoRefresh: false });

  useEffect(() => {
    if (dom.current) return;




  }, []);
}
