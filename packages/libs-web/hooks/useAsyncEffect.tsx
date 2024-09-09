import type { FC, Ref, RefObject, DependencyList, EffectCallback } from 'react';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { toPicket } from '@suey/pkg-utils';

// NOTE: callbacks are _only_ allowed to return either void, or a destructor.
export type AsyncEffectCallback = () => (Promise<void | boolean | undefined | number | string | EffectCallback>);

export { useAsyncEffect } from 'ahooks';

export function useAsyncLayoutEffect(asyncEffect: AsyncEffectCallback, deps?: DependencyList) {

  useLayoutEffect(() => {
    ;(async () => {
      const [err] = await toPicket(Promise.resolve(asyncEffect()));

      // 未处理的错误, 那么 hook 也不处理
      if (err) throw err;
    })();
  }, deps);
}
