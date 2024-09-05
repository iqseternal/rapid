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
  }, []);

  const state = useAHookReactive(initialState);

  return [state];
}

/**
 * 修改 state 自动刷新组件
 * @example
 * const [state] = useShallowReactive({
 *   a: 1,
 *   b: {
 *     c: 1
 *   }
 * });
 *
 * state.a = 2; // 自动刷新组件
 * state.b.c = 2; // 不会自动刷新组件
 */
export function useShallowReactive<S extends object>(initValue: S | (() => S)) {
  const refresh = useRefresh();

  const initialState = useMemo(() => {
    return (typeof initValue === 'function') ? initValue() : initValue;
  }, []);

  const [state] = useState(() => {
    return new Proxy(initialState, {
      get(target, p, receiver) {

        return Reflect.get(target, p, receiver);
      },
      set(target, p, newValue, receiver) {
        const oldValue = Reflect.get(target, p, receiver);
        if (oldValue === newValue) return true;

        const setResult = Reflect.set(target, p, newValue, receiver);
        if (setResult) {
          refresh();
          return true;
        }
        return false;
      },

      defineProperty(target, property, attributes) {
        refresh();
        return Reflect.defineProperty(target, property, attributes);
      },
      deleteProperty(target, p) {
        refresh();
        return Reflect.deleteProperty(target, p);
      },
    })
  });

  return [state];
}
