import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRefresh } from './useRefresh';
import { useReactive as useAHookReactive } from 'ahooks';
import type { Reactive, WatchHandle } from '@rapid/reactivity';
import { reactive, watch } from '@rapid/reactivity';

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
  const isFirstInitialize = useRef(true);
  const stateRef = useRef<S>({} as S);

  if (isFirstInitialize.current) {
    const initState: S = ((typeof initValue === 'function') ? initValue() : initValue);
    for (const key in initState) stateRef.current[key] = initState[key];
    isFirstInitialize.current = false;
  }

  return [stateRef.current] as (readonly [S]);
}

/**
 * 每次组件刷新都会执行初始化函数的 state
 */
export function useSyncNormalState<S extends object>(initValue: () => S) {
  const stateRef = useRef<S>({} as S);
  const initState = initValue();

  for (const key in initState) stateRef.current[key] = initState[key];
  return [stateRef.current] as const;
}

export type UseDeepReactiveReturnType<S extends object> = readonly [S];

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
export function useDeepReactive<S extends object>(initValue: S): UseDeepReactiveReturnType<S>;
export function useDeepReactive<S extends object>(initValue: S | (() => S)): UseDeepReactiveReturnType<S> {
  const isFirstInitialize = useRef(true);

  const initValueRef = useRef<S | (() => S)>(initValue);
  initValueRef.current = initValue;

  const state = useAHookReactive(
    !isFirstInitialize ? {} : (
      (typeof initValue === 'function') ? initValue() : initValue
    )
  ) as S;

  if (isFirstInitialize.current) isFirstInitialize.current = false;

  return [state] as const;
}

export type UseShallowReactiveRestoreFunction = () => void;

export type UseShallowReactiveReturnType<S extends object> = readonly [Reactive<S>, UseShallowReactiveRestoreFunction];

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
export function useShallowReactive<S extends object>(initValue: S | (() => S)): UseShallowReactiveReturnType<S>;
export function useShallowReactive<S extends object>(initValue: S | (() => S)): UseShallowReactiveReturnType<S> {
  const refresh = useRefresh();
  const isFirstInitialize = useRef(true);

  const unwatchRef = useRef<null | WatchHandle>(null);
  const initValueRef = useRef<S | (() => S)>(initValue);
  initValueRef.current = initValue;

  const [state] = useState(() => {
    const initialState = (typeof initValue === 'function') ? initValue() : initValue;
    return reactive(initialState);
  });

  /**
   * 重置 state
   */
  const restoreState = useCallback(() => {
    const initValue = initValueRef.current;
    const initialState: S = (typeof initValue === 'function') ? initValue() : initValue;
    for (const key in state) state[key as keyof typeof state] = initialState[key as keyof S] as any;
  }, []);

  if (isFirstInitialize.current) {
    unwatchRef.current = watch(() => ({ ...state }), refresh);
    isFirstInitialize.current = false;
  }

  useEffect(() => {
    if (!unwatchRef.current) {
      unwatchRef.current = watch(() => ({ ...state }), refresh);
    }

    return () => {
      if (unwatchRef.current) unwatchRef.current();
      unwatchRef.current = null;
    }
  }, []);

  return [state, restoreState] as const;
}
