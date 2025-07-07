import { useCallback, useMemo, useRef, useState } from 'react';
import { useRefresh } from './useRefresh';
import { useReactive as useAHookReactive } from 'ahooks';
import { createSallowProxy } from '@rapid/libs';

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
export function useNormalState<S extends object>(initValue: S | (() => S)) {
  const stateRef = useRef<S>(
    typeof initValue === 'function' ? (initValue as () => S)() : initValue
  );

  return [stateRef.current] as const;
}

/**
 * 每次组件刷新都会执行初始化函数的 state
 */
export function useSyncNormalState<S extends object>(initValue: () => S) {
  const initState = initValue();

  const [state] = useNormalState(() => initState);

  for (const key in initState) state[key] = initState[key];
  return [state] as const;
}

/**
 * 修改 state 自动刷新组件
 * @example
 * const [state, resetState] = useDeepReactive(() => ({
 *   a: 1,
 *   b: {
 *     c: 1
 *   }
 * });
 *
 * state.a = 2; // 自动刷新组件
 * state.b.c = 2; // 自动刷新组件
 *
 * resetState(); // 调用初始化函数重置 state
 */
export function useDeepReactive<S extends object>(initValue: (() => S)): readonly [S, () => void];

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
export function useDeepReactive<S extends object>(initValue: S): readonly [S];

export function useDeepReactive<S extends object>(initValue: S | (() => S)): (readonly [S] | readonly [S, () => void]) {
  const isInitStateFunction = useMemo(() => (typeof initValue === 'function'), []);

  const [syncNormalState] = useSyncNormalState(() => ({
    initValue: initValue
  }))

  const state = useAHookReactive(
    (typeof initValue === 'function') ? initValue() : initValue
  );

  /**
   * 重置 state
   */
  const resetState = useCallback(() => {
    const initValue = syncNormalState.initValue;
    const initialState = (typeof initValue === 'function') ? initValue() : initValue;
    for (const key in initialState) state[key] = initialState[key];
  }, []);

  if (isInitStateFunction) return [state, resetState] as const;
  return [state] as const;
}

/**
 * 修改 state 自动刷新组件
 * @example
 * const [state, resetState] = useShallowReactive(() => ({
 *   a: 1,
 *   b: {
 *     c: 1
 *   }
 * });
 *
 * state.a = 2; // 自动刷新组件
 * state.b.c = 2; // 不会自动刷新组件
 *
 * resetState(); // 调用初始化函数重置 state
 */
export function useShallowReactive<S extends object>(initValue: (() => S)): readonly [S, () => void];

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
export function useShallowReactive<S extends object>(initValue: S): readonly [S];

export function useShallowReactive<S extends object>(initValue: S | (() => S)) {
  const refresh = useRefresh();

  const isInitStateFunction = useMemo(() => (typeof initValue === 'function'), []);

  const [syncNormalState] = useSyncNormalState(() => ({
    initValue: initValue
  }))

  const [state] = useState(() => {
    const initialState = (typeof initValue === 'function') ? initValue() : initValue;
    return createSallowProxy(initialState, refresh);
  });

  /**
   * 重置 state
   */
  const resetState = useCallback(() => {
    const initValue = syncNormalState.initValue;
    const initialState = (typeof initValue === 'function') ? initValue() : initValue;
    for (const key in initialState) state[key] = initialState[key];
  }, []);

  if (isInitStateFunction) return [state, resetState] as const;
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
  readonly deep?: boolean;
}

export function useReactive<S extends object>(initValue: (() => S), options?: ReactiveOptions): readonly [S, () => void];

export function useReactive<S extends object>(initValue: S, options?: ReactiveOptions): readonly [S];

export function useReactive<S extends object>(initValue: S | (() => S), options?: ReactiveOptions): (readonly [S, () => void] | readonly [S]) {
  const { deep = true } = options ?? {};

  if (deep) return useDeepReactive(initValue as S) as readonly [S, () => void] | readonly [S];

  return useShallowReactive(initValue as S) as readonly [S, () => void] | readonly [S];
}

