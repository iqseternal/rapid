import { isDef } from '@suey/pkg-utils';
import type { RefObject, DependencyList } from 'react';
import { useEffect, useMemo } from 'react';

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
export function useEventListener<T extends HTMLElement | Window, Key extends keyof HTMLElementEventMap>(target: RefObject<T> | T | null, type: Key, callback: EventListenerOrEventListenerObject, dep?: DependencyList): void;

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
export function useEventListener<T extends HTMLElement | Window, Key extends keyof HTMLElementEventMap>(target: RefObject<T> | T | null, evtMap: Record<Key, EventListenerOrEventListenerObject>, dep?: DependencyList): void;

export function useEventListener<T extends HTMLElement | Window, Key extends keyof HTMLElementEventMap>(
  targetRef: RefObject<T> | T | null,
  type: Key | Record<Key, EventListenerOrEventListenerObject>,
  callback?: EventListenerOrEventListenerObject | DependencyList,
  deps?: DependencyList
) {
  // 判断第一个参数是否是一个 Ref 对象
  const isRef = useMemo(() => {
    return (
      targetRef !== null &&
      (!(targetRef instanceof HTMLElement) && !(targetRef instanceof Window)) &&
      Reflect.has(targetRef, 'current')
    );
  }, [targetRef]);

  // 依赖项
  const dependencies = useMemo(() => {
    const dependencies: any[] = [targetRef];

    // 第一个重载
    if (!Array.isArray(callback)) {
      dependencies.push(...(deps ?? []));
    }

    // 第二个重载
    if (typeof type === 'object' && Array.isArray(callback)) {
      dependencies.push(...callback);
    }
    return dependencies;
  }, [targetRef, callback, deps]);

  useEffect(() => {
    if (!isDef(targetRef)) return () => { };

    // 获取 targetDom, 目标 Dom
    const targetDom = isRef ? targetRef?.current as T : targetRef as T;

    // 如果 targetDom 不是一个 Dom, 那么不满足添加事件的条件
    if (!(targetDom instanceof HTMLElement) && !(targetDom instanceof Window)) return () => { };

    if (typeof type === 'object') {
      (Object.keys(type) as Key[]).forEach((key) => {
        targetDom.addEventListener(key, type[key]);
      });

      return () => {
        (Object.keys(type) as Key[]).forEach((key) => {
          targetDom.removeEventListener(key, type[key]);
        });
      }
    }

    targetDom.addEventListener(type, callback as EventListenerOrEventListenerObject);

    return () => {
      targetDom.removeEventListener(type, callback as EventListenerOrEventListenerObject);
    }

  }, dependencies);
}
