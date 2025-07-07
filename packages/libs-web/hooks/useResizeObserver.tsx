import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
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
  const [syncState] = useSyncNormalState(() => ({
    resizeCallback: callback
  }));

  const [normalState] = useNormalState(() => {
    const observer = new ResizeObserver((entries, observer) => {
      syncState.resizeCallback && syncState.resizeCallback(entries, observer);
    });

    return {
      resizeObserver: observer
    }
  })

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
      if (!tDomRef.current) return;
      normalState.resizeObserver.unobserve(tDomRef.current);
    }
  }, [dom]);

  useUnmount(() => {
    normalState.resizeObserver.disconnect();
  })

  return [normalState.resizeObserver] as const;
}
