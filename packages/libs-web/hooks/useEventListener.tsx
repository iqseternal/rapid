import type { RefObject, DependencyList } from 'react';
import { useEffect, useMemo, Key } from 'react';

/**
 * 为 Ref 添加某个事件的监听
 *
 * @example

 * const [state] = useState(1);
 * const dom = useRef();
 *
 * useEventListener(dom, 'click', () => {
 *   console.log(state);
 * }, [state]);
 *
 * <div ref={dom}></div>
 *
 */
export function useEventListener<T extends HTMLElement | Window, Key extends keyof HTMLElementEventMap>(target: RefObject<T | null> | T | null, type: Key, callback: EventListenerOrEventListenerObject, deps?: DependencyList): void;

/**
 * 为某个 Ref 添加多个事件监听
 *
 * @example

 * const [state] = useState(1);
 * const dom = useRef();
 *
 * useEventListener(dom, {
 *  'click': () => {
 *    console.log(state);
 *  }
 * }, [state]);
 *
 * <div ref={dom}></div>
 *
 */
export function useEventListener<T extends HTMLElement | Window, Key extends keyof HTMLElementEventMap>(target: RefObject<T | null> | T | null, evtMap: Record<Key, EventListenerOrEventListenerObject>, deps?: DependencyList): void;

export function useEventListener<T extends HTMLElement | Window, Key extends keyof HTMLElementEventMap>(
  targetRef: RefObject<T | null> | T | null,
  type: Key | Record<Key, EventListenerOrEventListenerObject>,
  callback?: EventListenerOrEventListenerObject | DependencyList,
  deps?: DependencyList
) {
  /**
   * 第1个重载
   */
  const overrideOne = (typeof type === 'string') && (typeof callback === 'function') && (typeof deps === 'undefined');

  /**
   * Dom
   */
  const tRef = useMemo(() => {
    if (targetRef === null) return { current: null };

    if ((targetRef instanceof HTMLElement) || (targetRef instanceof Window)) return { current: targetRef };

    if (Reflect.has(targetRef, 'current')) return targetRef as RefObject<T | null>;

    return { current: null };
  }, [targetRef]);

  /**
   * 副作用列表
   */
  const dependencies = (overrideOne ? [] : ((callback as DependencyList) ?? []));

  /**
   * 监听函数
   */
  const listeners = useMemo(() => {
    const listeners: [Key, EventListenerOrEventListenerObject][] = [];

    if (overrideOne) listeners.push([type, callback]);
    else {
      if (typeof type === 'object') {

        const keys = Object.keys(type) as Key[];
        for (let i = 0;i < keys.length;i ++) {
          const key = keys[i];
          listeners.push([key, type[key] as EventListenerOrEventListenerObject]);
        }
      }

    }
    return listeners;
  }, [overrideOne, dependencies]);

  useEffect(() => {
    if (!tRef.current) return () => {};

    // 获取 targetDom, 目标 Dom
    const targetDom = tRef.current;

    // 如果 targetDom 不是一个 Dom, 那么不满足添加事件的条件
    if (!(targetDom instanceof HTMLElement) && !(targetDom instanceof Window)) return () => { };

    for (let i = 0;i < listeners.length;i += 2) {
      const [key, listener] = listeners[i];
      targetDom.addEventListener(key, listener);
    }

    return () => {
      for (let i = 0; i < listeners.length; i += 2) {
        const [key, listener] = listeners[i];
        targetDom.removeEventListener(key, listener);
      }
    }
  }, [tRef.current, listeners]);
}
