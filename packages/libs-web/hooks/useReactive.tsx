import { useMemo, useRef, useState } from 'react';
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
export function useDepReactive<S extends object>(initValue: S | (() => S)) {
  const initialState = useMemo(() => {
    return (typeof initValue === 'function') ? initValue() : initValue;
  }, []);

  const state = useAHookReactive(initialState);

  return [state] as const;
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


  const [state] = useState(() => {
    const initialState = (typeof initValue === 'function') ? initValue() : initValue;

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
      deleteProperty(target, p) {
        refresh();
        return Reflect.deleteProperty(target, p);
      },
    })
  });

  return [state] as const;
}


/**
 * 修改 state 自动刷新组件 的配置
 */
export interface ReactiveOptions {
  /**
   * 是否深度监听
   *
   * @default true
   */
  deep?: boolean;
}

/**
 * 修改 state 自动刷新组件
 */
export function useReactive<S extends object>(initValue: S | (() => S), options?: ReactiveOptions) {
  const { deep = true } = options ?? {};

  if (deep) return useDepReactive(initValue);
  return useShallowReactive(initValue);
}


/**
 * 普通 state, 不自动刷新组件
 *
 * @example
 * const [state] = useNormalState({
 *  a: 1,
 *  b: 2
 * });
 *
 * state.a = 2; // 不会自动刷新组件
 */
export function useNormalState<S extends {}>(initValue: S | (() => S)) {
  const [state] = useState(initValue);
  return [state] as const;
}
