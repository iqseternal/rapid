import { useState } from 'react';
import { useRefresh } from './useRefresh';

/**
 * 调用 set 函数会自动刷新组件, 不论是否更改了 state
 *
 * @example
 * const [state, setState] = useAutoState(() => {
 *    return {
 *      a: 1
 *    }
 * });
 *
 * setState(() => (state.a = 2));
 * setState((state) => (state.a = 2));
 *
 * @example
 * const [state, _, setStateSource] = useAutoState(() => {
 *   return {
 *     a: 1
 *   }
 * });
 *
 * setSateSource(state => ({ // 参考 useState 第二个返回值
 *   ...state,
 *   a: 2
 * }));
 *
 */
export function useAutoState<T extends Record<string | symbol | number, unknown>>(initValue: T | (() => T)) {
  const refresh = useRefresh();
  const [value, setValueSource] = useState(initValue);

  const setValue = (setEffect: (v: typeof value) => any) => {
    setEffect(value);
    refresh();
  }

  return [value, setValue, setValueSource] as const;
}
