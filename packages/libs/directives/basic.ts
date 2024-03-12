import type { ComponentInternalInstance } from 'vue';

export interface SpaceHTMLElement extends HTMLElement {
  __space__?: {
    __directives_custom_evts__?: (() => void)[]
  }
}

/**
 * 在对象式指令中注册一个需要移除的事件回调
 * @param el
 * @param fn
 */
export const registerUnmountEvt = (el: SpaceHTMLElement, fn: () => void) => {
  if (!el.__space__) el.__space__ = { }
  if (!el.__space__.__directives_custom_evts__) el.__space__.__directives_custom_evts__ = [];

  el.__space__.__directives_custom_evts__.push(fn);
}

/**
 * 移除所有事件回调
 * @param el
 */
export const unmountAllEvts = (el: SpaceHTMLElement) => {
  el.__space__?.__directives_custom_evts__?.forEach(fn => {
    fn();
  })
}
