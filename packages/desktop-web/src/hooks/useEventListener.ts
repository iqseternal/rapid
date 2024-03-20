
import { IS_PROD } from '@rapid/config/constants';
import { isDef, isUnDef } from '@suey/pkg-utils';
import type { Ref } from 'vue';

import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue';

/** 为某个元素添加单个监听事件 */
export function useEventListenerForElement<K extends keyof HTMLElementEventMap>(dom: HTMLElement | Window, evtKey: K, listener: (ev: HTMLElementEventMap[K]) => any): void;
/** 为某个元素添加一组监听事件 */
export function useEventListenerForElement<K extends keyof HTMLElementEventMap>(dom: HTMLElement | Window, props: Record<K, (ev: HTMLElementEventMap[K]) => any>): void;
export function useEventListenerForElement<K extends keyof HTMLElementEventMap>(dom: HTMLElement | Window, props: K | Record<K, (ev: Event) => any>, listener?: (this: HTMLElement, ev: Event) => any) {
  if (typeof props === 'string') {
    if (listener) {
      dom.addEventListener(props, listener);

      onBeforeUnmount(() => {
        dom.removeEventListener(props, listener);
      })
    }
    return;
  }

  Object.keys(props).forEach(evtKey => {
    dom.addEventListener(evtKey, props[evtKey as K]);
  });

  onBeforeUnmount(() => {
    Object.keys(props).forEach(evtKey => {
      dom.removeEventListener(evtKey, props[evtKey as K]);
    });
  });
}

/** 为某个Ref dom元素添加单个监听事件 */
export function useEventListener<K extends keyof HTMLElementEventMap>(dom: Ref<HTMLElement | Window | undefined>, evtKey: K, listener: (ev: HTMLElementEventMap[K]) => any): void;
/** 为某个Ref dom元素添加一组监听事件 */
export function useEventListener<K extends keyof HTMLElementEventMap>(dom: Ref<HTMLElement | Window | undefined>, props: Record<K, (ev: HTMLElementEventMap[K]) => any>): void;
export function useEventListener<K extends keyof HTMLElementEventMap>(dom: Ref<HTMLElement | Window | undefined>, props: K | Record<K, (ev: Event) => any>, listener?: (this: HTMLElement, ev: Event) => any) {
  if (isUnDef(dom)) return;

  if (typeof props === 'string') {
    if (listener) {
      onMounted(() => {
        dom.value?.addEventListener(props, listener);
      });
      onBeforeUnmount(() => {
        dom.value?.removeEventListener(props, listener);
      })
    }
    return;
  }

  onMounted(() => {
    Object.keys(props).forEach(evtKey => {
      dom.value?.addEventListener(evtKey, props[evtKey as K]);
    });
  });

  onBeforeUnmount(() => {
    Object.keys(props).forEach(evtKey => {
      dom.value?.removeEventListener(evtKey, props[evtKey as K]);
    });
  });
}
