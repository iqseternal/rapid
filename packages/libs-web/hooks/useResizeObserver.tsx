import { useEffect, useMemo, useState } from 'react';
import type { Ref, RefObject } from 'react';

/**
 * resizeObserver, 利用 Hook 的方式创建该对象, 传递 Ref, 自动添加 callback 注册
 * @returns
 */
export function useResizeObserver<TElement extends HTMLElement>(dom: RefObject<TElement> | TElement, callback: ResizeObserverCallback) {
  const [resizeObserver] = useState(() => {
    return new ResizeObserver(callback);
  })

  const tDom = useMemo(() => {
    if (dom instanceof HTMLElement) {

      return {
        current: dom
      }
    }
    if (Reflect.has(dom, 'current')) return dom;

    console.error(`useResizeObserver: 传入的 dom 参数似乎是不符合规范的 (非 RefObject | HTMLElement)`);
    return dom;
  }, []);


  useEffect(() => {
    if (!tDom.current) return () => {};

    resizeObserver.observe(tDom.current);

    return () => {
      if (!tDom.current) return;

      resizeObserver.unobserve(tDom.current);
    }
  }, [tDom.current]);


  useEffect(() => {


    return () => {

      resizeObserver.disconnect();
    }
  }, []);

  return [resizeObserver];
}
