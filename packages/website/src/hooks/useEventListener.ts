import type { RefObject, DependencyList } from 'react';
import { useEffect } from 'react';

/**
 * 为 Ref 添加某个事件的监听
 * @param target
 * @param type
 * @param callback
 * @param dep
 */
export function useEventListener<T extends HTMLElement | Window, Key extends keyof HTMLElementEventMap>(target: RefObject<T> | T | null, type: Key, callback: EventListenerOrEventListenerObject, dep?: DependencyList): void;

/**
 * 为某个 Ref 添加多个事件监听
 * @param target
 * @param evtMap
 * @param dep
 */
export function useEventListener<T extends HTMLElement | Window, Key extends keyof HTMLElementEventMap>(target: RefObject<T> | T | null, evtMap: Record<Key, EventListenerOrEventListenerObject>, dep?: DependencyList): void;

export function useEventListener<T extends HTMLElement | Window, Key extends keyof HTMLElementEventMap>(
  targetRef: RefObject<T>,
  type: Key | Record<Key, EventListenerOrEventListenerObject>,
  callback?: EventListenerOrEventListenerObject | DependencyList,
  deps?: DependencyList
) {
  useEffect(() => {
    if (targetRef === null) return;
    const targetDom = (targetRef instanceof HTMLElement) ? targetRef : targetRef.current;

    if (!(targetDom instanceof HTMLElement)) return;

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
  }, (Array.isArray(callback) ? [targetRef, ...callback] : [targetRef, ...(deps ?? [])]));
}
