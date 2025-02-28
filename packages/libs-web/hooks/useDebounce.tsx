import type { DependencyList } from 'react';
import { useLayoutEffect, useMemo, useRef } from 'react';

/**
 * 防抖函数的配置
 */
export interface DebounceOptions {
  /**
   * 等待时间
   */
  readonly wait: number;

  /**
   * 最大等待时间
   * @description > 0
   */
  readonly maxWait?: number;
}

/**
 * 防抖函数的类型
 */
export interface DebounceTarget<Fn extends (...args: any[]) => void> {
  (this: ThisParameterType<Fn>, ...args: Parameters<Fn>): ReturnType<Fn>;

  /**
   * 取消防抖
   */
  cancel: () => void;
}

/**
 * 可以在 组件外部使用
 * @example
 * window.addEventListener('scroll', useDebounceHook(() => {
 *   console.log('scroll');
 * }, { wait: 1000 }))
 *
 * @returns
 */
export function useDebounceHook<T extends (...args: any[]) => void>(callback: T, options: DebounceOptions) {
  const { wait, maxWait = void 0 } = options;

  let timer: number | NodeJS.Timeout | undefined = void 0;
  let lastCallTime: number = 0;

  const that: ThisParameterType<T> = this;

  const debounce = ((...args: Parameters<T>): void => {
    const now = Date.now();
    const remaining = maxWait && maxWait - (now - lastCallTime);

    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }

    timer = setTimeout(() => {
      callback.call(that, ...args);
    }, remaining || wait);

    if (remaining) {
      lastCallTime = now;
    }
  }) as DebounceTarget<T>;

  debounce.cancel = () => {
    if (timer) clearTimeout(timer);
  }

  return debounce;
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
 * }, { wait: 1000 }, [state.target]);
 *
 */
export function useDebounce<T extends (...args: any[]) => void>(callback: T, options: DebounceOptions, deps: DependencyList) {
  const targetFn = useRef(callback);

  useLayoutEffect(() => {
    targetFn.current = callback;
  }, deps);

  return useMemo(() => {
    return useDebounceHook<T>(((... args) => {
      targetFn.current(... args);
    }) as T, options);
  }, []);
}


export interface ThrottleOptions {
  /**
   * 等待时间
   */
  readonly wait: number;
}

/**
 * 节流函数的类型
 */
export interface ThrottleTarget<Fn extends (...args: any[]) => void> {
  (this: ThisParameterType<Fn>, ...args: Parameters<Fn>): ReturnType<Fn>;
}

/**
 *
 * @example
 *
 * const onScroll = useThrottle(() => {
 *   console.log('scroll');
 * }, { wait: 1000 });
 *
 */
export function useThrottleHook<T extends (...args: unknown[]) => void>(callback: T, options: ThrottleOptions) {
  const { wait } = options;

  let timer: number | NodeJS.Timeout | undefined = void 0;
  const that: ThisParameterType<T> = this;

  return ((...args: Parameters<T>): void => {
    if (timer) return;

    callback.call(that, ...args);

    timer = setTimeout(() => {
      timer = void 0;
    }, wait);
  }) as ThrottleTarget<T>;
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
 * }, { wait: 1000 }, [state.target]);
 *
 */
export function useThrottle<T extends (...args: any[]) => void>(callback: T, options: ThrottleOptions, deps: DependencyList) {
  const targetFn = useRef(callback);

  useLayoutEffect(() => {
    targetFn.current = callback;
  }, deps);

  return useMemo(() => {
    return useThrottleHook<T>(((...args) => {
      targetFn.current(...args);
    }) as T, options);
  }, []);
}
