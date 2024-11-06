import type { FC, Ref, RefObject, DependencyList, EffectCallback } from 'react';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { toPicket } from '@rapid/libs';

/**
 * useAsyncLayoutEffect 的 回调类型
 */
export type AsyncEffectCallback = () => AsyncGenerator<void, void, void> | Promise<void>;

export { useAsyncEffect } from 'ahooks';

/**
 * 和 useAsyncEffect 用法一致, 但是执行实际会比 useAsyncEffect 更靠前
 */
export function useAsyncLayoutEffect(asyncEffect: AsyncEffectCallback, deps?: DependencyList) {

  useLayoutEffect(() => {
    ;(async () => {
      const [err] = await toPicket(Promise.resolve(asyncEffect()));

      // 未处理的错误, 那么 hook 也不处理
      if (err) throw err;
    })();
  }, deps);
}
