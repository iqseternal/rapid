import { useMemo, useState } from 'react';
import { useRefresh } from './useRefresh';
import { useReactive as useAHookReactive } from 'ahooks';

/**
 * 修改 state 自动刷新组件
 * @example
 * const [state] = useReactive({
 *   a: 1,
 *   b: {
 *     c: 1
 *   }
 * });
 *
 * state.a = 2; // 自动刷新组件
 * state.b.c = 2; // 自动刷新组件
 */
export function useReactive<S extends object>(initValue: S | (() => S)) {
  const initialState = useMemo(() => {
    return (typeof initValue === 'function') ? initValue() : initValue;
  }, [initValue]);

  const state = useAHookReactive(initialState);

  return [state];
}
