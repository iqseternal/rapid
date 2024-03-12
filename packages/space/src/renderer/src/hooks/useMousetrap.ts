
import type { Ref } from 'vue';
import { onBeforeMount, onBeforeUnmount, onMounted, ref, isRef, computed, watchEffect, watch } from 'vue';
import { isFunction } from '@suey/pkg-utils';
import type { MousetrapInstance } from 'mousetrap';
import Mousetrap, { bind } from 'mousetrap';

export type MousetrapAction = 'keyup' | 'keydown';

export type MousetrapBindFn = (e: Mousetrap.ExtendedKeyboardEvent, combo: string) => void;

export type MousetrapBinds = [(string | string[] | (() => (string | string[]))), MousetrapBindFn, MousetrapAction?][];

// 为某个元素注册一个快捷方式
export function useMousetrap<T extends HTMLElement>(el: T | Ref<T>, keys: MousetrapBinds[number][0], callback: MousetrapBindFn, action?: MousetrapAction): Ref<MousetrapInstance>;

// 为某个元素注册一组快捷方式
export function useMousetrap<T extends HTMLElement>(el: T | Ref<T>, binds?: MousetrapBinds): Ref<MousetrapInstance>;

// 全局注册的单个事件
export function useMousetrap(keys: string | string[], callback: MousetrapBindFn, action?: MousetrapAction): Ref<MousetrapInstance>;

// 全局注册的一组事件
export function useMousetrap(binds: MousetrapBinds): Ref<MousetrapInstance>;

export function useMousetrap<T extends HTMLElement>(
  _1: T | Ref<T> | string | string[] | MousetrapBinds,
  _2?: string | string[] | MousetrapBinds | (MousetrapBindFn),
  _3?: (MousetrapBindFn) | MousetrapAction,
  _4?: MousetrapAction
): Ref<MousetrapInstance> {
  let dom = ref(void 0) as unknown as Ref<HTMLElement>;

  if (isRef(_1)) dom = _1;
  else if (_1 instanceof HTMLElement) dom = ref(_1);

  let binds: MousetrapBinds = [];

  // 第四个重载
  if (Array.isArray(_1) && (_1 as []).every(e => Array.isArray(e))) binds = _1 as MousetrapBinds;
  // 第三个重载
  else if (((Array.isArray(_1) && (_1 as string[]).every(e => typeof e === 'string')) || typeof _1 === 'string') && typeof _2 === 'function' && (typeof _3 === 'string' || _3 === void 0)) binds = [[_1 as (string | string[]), _2, _3]];
  // 第二个重载
  else if ((_1 instanceof HTMLElement || isRef(_1)) && (Array.isArray(_2) && (_2 as string[]).every(e => e.length >= 2))) binds = _2 as MousetrapBinds;
  // 第一个重载
  else if ((_1 instanceof HTMLElement || isRef(_1)) && Array.isArray(_2) && (_2 as string[]).every(e => typeof e === 'string') && typeof _3 === 'function' && (typeof _4 === 'string' || _4 === void 0)) binds = [[_2 as (string | string[]), _3, _4]];

  const mousetrap = ref() as Ref<MousetrapInstance>;

  onMounted(() => {
    mousetrap.value = (dom.value instanceof HTMLElement) ? new Mousetrap(dom.value) : new Mousetrap();
    mousetrap.value.reset();

    binds.forEach(bind => {

      if (isFunction(bind[0])) {
        const keys = computed(bind[0]);

        mousetrap.value.bind(keys.value, bind[1], bind[2]);
        watch(() => keys.value, (newKeys, oldKeys) => {
          mousetrap.value.unbind(oldKeys, bind[2]);
          mousetrap.value.bind(newKeys, bind[1], bind[2]);
        })
        return;
      }

      mousetrap.value.bind(bind[0], bind[1], bind[2])
    });
  });

  onBeforeUnmount(() => {
    if (mousetrap.value) mousetrap.value.reset();
  });

  return mousetrap;
}
