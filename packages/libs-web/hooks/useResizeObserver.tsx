import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { DependencyList, Ref, RefObject } from 'react';
import { useNormalState } from './useReactive';
import { Ansi } from '@rapid/libs';

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
  const [normalState] = useNormalState(() => ({
    resizeObserver: new ResizeObserver((entries, observer) => {
      normalState.resizeCallback?.(entries, observer);
    }),
    resizeCallback: callback,
  }))

  const tDomRef = useMemo(() => {
    if (dom instanceof HTMLElement) return { current: dom };
    if (Reflect.has(dom, 'current')) return dom;
    Ansi.print(Ansi.red, `useResizeObserver: 传入的 dom 参数似乎是不符合规范的 (非 RefObject | HTMLElement)`);
    return dom;
  }, [dom]);

  useLayoutEffect(() => {
    normalState.resizeCallback = callback;
  }, [deps]);

  useEffect(() => {
    if (tDomRef.current) normalState.resizeObserver.observe(tDomRef.current);

    return () => {
      if (!tDomRef.current) return;
      normalState.resizeObserver.unobserve(tDomRef.current);
    }
  }, [tDomRef.current]);

  useEffect(() => {

    return () => {
      normalState.resizeObserver.disconnect();
    }
  }, []);

  return [normalState.resizeObserver] as const;
}
