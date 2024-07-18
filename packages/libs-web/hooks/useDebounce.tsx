import type { DependencyList } from 'react';
import { useCallback } from 'react';

/**
 * 可以在 组件外部使用
 * @example
 * window.addEventListener('scroll', useDebounceHook(() => {
 *   console.log('scroll');
 * }))
 *
 * @returns
 */
export function useDebounceHook<T extends (...args: any[]) => void>(cb: T, time: number = 50) {
  let timer: number | undefined = void 0;

  return ((...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
      timer = void 0;
    }, time) as unknown as number;
  }) as unknown as T;
}

/**
 *
 * @example
 *
 * const [state, setState] = useAutoState({
 *   target: void 0 as (undefined | HTMLElement)
 * });
 * const onScroll = useDebounce(() => {
 *   console.log('scroll');
 * }, [state.target]);
 *
 */
export function useDebounce<T extends (...args: unknown[]) => void>(callback: T, time = 50, deps?: DependencyList) {
  if (!deps) return useDebounceHook(callback, time);

  return useCallback(useDebounceHook(callback, time), deps);
}

/**
 *
 * @example
 * window.addEventListener('scroll', useThrottleHook(() => {
 *   console.log('scroll');
 * }))
 */
export function useThrottleHook<T extends (...args: unknown[]) => void>(callback: T, time = 10) {
  let timer: number | undefined = void 0;

  return (...args: unknown[]) => {
    if (timer) return;

    callback.call(this, ...args);

    timer = setTimeout(() => {
      timer = void 0;
    }, time)
  }
}

/**
 *
 * @example
 *
 * const [state, setState] = useAutoState({
 *   target: void 0 as (undefined | HTMLElement)
 * });
 * const onScroll = useThrottle(() => {
 *   console.log('scroll');
 * }, [state.target]);
 *
 */
export function useThrottle<T extends (...args: unknown[]) => void>(callback: T, time = 10, deps?: DependencyList) {
  if (!deps) return useThrottleHook(callback, time);

  return useCallback(useThrottleHook(callback, time), deps);
}
