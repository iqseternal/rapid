import type { RefObject, DependencyList } from 'react';
import { useEffect, useMemo, Key, useRef } from 'react';

/**
 * 为某个 Ref 添加某个事件的监听
 *
 * @example
 *
 * const dom = useRef();
 *
 * useEventListener(dom, 'click', () => {
 *  console.log('click');
 * }, [dom]);
 *
 * <div ref={dom}></div>
 */
export function useEventListener<T extends HTMLElement | Window, Key extends keyof HTMLElementEventMap>(target: RefObject<T | null>, key: Key, callback: EventListener, deps?: DependencyList) {
  useEffect(() => {
    const element = target.current;
    if (!element) return;

    const handler = (event: Event) => callback(event);

    element.addEventListener(key, handler);

    return () => element.removeEventListener(key, handler);
  }, [target.current, key, ...(deps ?? [])]);
}

/**
 * 为某个 Ref 添加多个事件监听
 *
 * @example

 * const [state] = useState(1);
 * const dom = useRef();
 *
 * useEventListeners(dom, {
 *  'click': () => {
 *    console.log(state);
 *  }
 * }, [state]);
 *
 * <div ref={dom}></div>
 *
 */
export function useEventListeners<T extends HTMLElement | Window, Key extends keyof HTMLElementEventMap>(target: RefObject<T | null>, evtMap: Record<Key, EventListener>, deps?: DependencyList) {
  useEffect(() => {
    const element = target.current;
    if (!element) return;

    for (const key in evtMap) {
      element.addEventListener(key, evtMap[key]);
    }

    return () => {
      for (const key in evtMap) {
        element.removeEventListener(key, evtMap[key]);
      }
    }
  }, [target.current, ...(deps ?? [])]);
}
