import type { FC, Ref, RefObject, DependencyList, EffectCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import { toPicket } from '@rapid/libs/common';

// NOTE: callbacks are _only_ allowed to return either void, or a destructor.
export type AsyncEffectCallback = () => (
  void |
  EffectCallback |
  Promise<void | EffectCallback>
);

/**
 * 异步的 effect, 通常使用这个函数在组件中发送串行网络请求或者需要异常捕捉的网络请求
 * @example
 * useAsyncEffect(async () => {
 *   const [err, res] = await toPicket(reqPromise);
 *   if (err) return;
 *
 *   const { data } = res;
 *
 *   return () => { // Destructor
 *
 *   }
 * }, []);
 *
 */
export function useAsyncEffect(asyncEffect: AsyncEffectCallback, deps?: DependencyList) {
  const [state] = useState({
    fns: [] as (() => void)[]
  }); // 回调函数集合

  useEffect(() => {
    state.fns = [];

    ;(async () => {
      const [err, unMountFn] = await toPicket(Promise.resolve(asyncEffect()));

      // 未处理的错误, 那么 hook 也不处理
      if (err) throw err;

      if (unMountFn) state.fns.push(unMountFn);
    })();

    // 异步函数可能具有返回值, 为一个函数，和 useEffect 一样，希望再被卸载的时候调用一次
    return () => {
      state.fns.forEach(fn => {
        fn();
      })
    }
  }, deps);
}
