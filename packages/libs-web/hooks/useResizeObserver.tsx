import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { DependencyList, Ref, RefObject } from 'react';
import { useNormalState, useSyncNormalState } from './useReactive';
import { Ansi } from '@rapid/libs';
import { useUnmount } from 'ahooks';

/**
 * resizeObserver, 利用 Hook 的方式创建该对象, 传递 Ref, 自动添加 callback 注册
 *
 * @example
 *
 * const [resizeObserver] = useResizeObserver(dom, callback, deps);
 *
 * @returns
 */
export function useResizeObserver<TElement extends HTMLElement>(dom: RefObject<TElement | null> | TElement, callback: ResizeObserverCallback, deps: DependencyList) {
  const resizeCallbackRef = useRef(callback);
  if (resizeCallbackRef.current !== callback) resizeCallbackRef.current = callback;

  const [normalState] = useNormalState(() => ({
    resizeObserver: new ResizeObserver((entries, observer) => {
      resizeCallbackRef.current && resizeCallbackRef.current(entries, observer);
    })
  } as const));

  useEffect(() => {
    interface TDomRef {
      current: TElement | null;
    }

    const tDomRef: TDomRef = {
      current: null
    };

    if (dom instanceof HTMLDivElement) tDomRef.current = dom;
    else if (Reflect.has(dom, 'current')) tDomRef.current = (dom as RefObject<TElement>).current;
    else {
      Ansi.print(Ansi.red, `useResizeObserver: 传入的 dom 参数似乎是不符合规范的 (非 RefObject | HTMLElement)`);
      return;
    }

    if (tDomRef.current) normalState.resizeObserver.observe(tDomRef.current);

    return () => {
      normalState.resizeObserver.disconnect();
    }
  }, [dom]);

  return [normalState.resizeObserver] as const;
}
