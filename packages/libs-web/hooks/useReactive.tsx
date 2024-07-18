import { useState } from 'react';
import { useRefresh } from './useRefresh';

const DEFAULT_OPTIONS = {
  autoRefresh: true
};

export type ReactiveOptions = typeof  DEFAULT_OPTIONS;

/**
 * 修改 state 自动刷新组件 (浅层)
 * @example
 * const [state] = useShallowReactive(() => {
 *    return {
 *      a: 1,
 *      b: {
 *        c: 1
 *      }
 *    }
 * });
 *
 * state.a = 2; // 自动刷新组件
 *
 * state.b.c = 2; // 不会自动刷新组件, 如果需要, 可以使用 useReactive
 */
export function useShallowReactive<T extends object>(initValue: T | (() => T), options = DEFAULT_OPTIONS) {
  const refresh = useRefresh();

  const [value] = useState(() => {
    const toAutoRefresh = <Target extends object>(target: Target) => {
      return new Proxy(target, {
        get(target, p, receiver) {
          return Reflect.get(target, p, receiver);
        },
        set(target: object, p, newValue, receiver) {
          const oldValue = Reflect.get(target, p);
          Reflect.set(target, p, newValue, receiver);

          if (oldValue !== newValue) {
            if (options.autoRefresh) refresh();
          }
          return true;
        }
      })
    }

    const value = (typeof initValue === 'function') ? initValue() : initValue;

    return toAutoRefresh(value) as T;
  });

  return [value, refresh] as const;
}

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
export function useReactive<T extends object>(initValue: T | (() => T), options = DEFAULT_OPTIONS) {
  const refresh = useRefresh();

  const [value] = useState(() => {
    const toAutoRefresh = <Target extends object>(target: Target) => {
      if (typeof target !== 'object') return target;

      for (const key in target) Reflect.set(target, key, toAutoRefresh(target[key as keyof typeof target] as T));

      return new Proxy(target, {
        get(target, p, receiver) {
          return Reflect.get(target, p, receiver);
        },
        set(target: object, p, newValue, receiver) {
          const oldValue = Reflect.get(target, p);
          Reflect.set(target, p, newValue, receiver);

          if (oldValue !== newValue) {
            if (options.autoRefresh) refresh();
          }
          return true;
        }
      })
    }

    const value = (typeof initValue === 'function') ? initValue() : initValue;
    return toAutoRefresh(value) as T;
  });

  return [value, refresh] as const;
}
