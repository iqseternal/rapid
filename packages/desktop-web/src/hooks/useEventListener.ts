
import { IS_PROD } from '@rapid/config/constants';
import { isDef, isString, isUnDef } from '@suey/pkg-utils';
import type { Ref } from 'vue';

import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue';
import { useSurvivalCycle } from './useSurvivalCycle';

/** 为某个元素添加单个监听事件 */
export function useEventListenerForElement<K extends keyof HTMLElementEventMap>(dom: HTMLElement | Window, evtKey: K, listener: (ev: HTMLElementEventMap[K]) => any): void;
/** 为某个元素添加一组监听事件 */
export function useEventListenerForElement<K extends keyof HTMLElementEventMap>(dom: HTMLElement | Window, props: Record<K, (ev: HTMLElementEventMap[K]) => any>): void;
export function useEventListenerForElement<K extends keyof HTMLElementEventMap>(dom: HTMLElement | Window, props: K | Record<K, (ev: Event) => any>, listener?: (this: HTMLElement, ev: Event) => any) {
  const fullprops = isString(props) && listener ? { [props]: listener } : props;

  Object.keys(fullprops).forEach(evtKey => {
    dom.addEventListener(evtKey, fullprops[evtKey]);
  });

  onBeforeUnmount(() => {
    Object.keys(fullprops).forEach(evtKey => {
      dom.removeEventListener(evtKey, fullprops[evtKey]);
    });
  })
}

/** 为某个Ref dom元素添加单个监听事件 */
export function useEventListener<K extends keyof HTMLElementEventMap>(dom: Ref<HTMLElement | Window | undefined>, evtKey: K, listener: (ev: HTMLElementEventMap[K]) => any): void;
/** 为某个Ref dom元素添加一组监听事件 */
export function useEventListener<K extends keyof HTMLElementEventMap>(dom: Ref<HTMLElement | Window | undefined>, props: Record<K, (ev: HTMLElementEventMap[K]) => any>): void;
export function useEventListener<K extends keyof HTMLElementEventMap>(dom: Ref<HTMLElement | Window | undefined>, props: K | Record<K, (ev: Event) => any>, listener?: (this: HTMLElement, ev: Event) => any) {
  onMounted(() => {
    if (isUnDef(dom) || !isDef(dom.value)) return;

    useEventListenerForElement(dom.value, props as any, listener as any);
  })
}
