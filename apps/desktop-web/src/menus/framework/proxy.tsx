import { useDependenciesListHook } from '@rapid/libs-web/hooks';
import { isArray, isFunction, isObject } from '@suey/pkg-utils';
import { isValidElement } from 'react';
import type { ComputedSelectorObj } from './computed';
import { isComputedSelectorObj } from './computed';
import type { MenuInstance } from './declare';
import { convertMenu } from './declare';

export const proxySymbol = Symbol('proxySymbol');

/**
 * 判断当前是否是一个被特定 proxy 的对象
 * @private
 * @param target
 */
const isProxyObj = <T extends any,>(target: T): boolean => {
  if (!target) return true;
  if (typeof target !== 'object') return true;
  return (target as any).__TAG__ === proxySymbol;
}

/**
 * 制作一个菜单对象
 * @example
 * const headerMenu = makeMenu([
 *   {
 *     key: '1',
 *     label: <>1</>,
 *     children: [
 *       {
 *         key: '1-1',
 *         label: <>1-1</>,
 *         disabled: computed(() => !target.store.doc.isWork)
 *       }
 *     ]
 *   }
 * ]);
 * @param menuInstance
 */
export const makeMenu = <Instance extends MenuInstance,>(menuInstance: Instance) => {
  const target = convertMenu(menuInstance);

  // 菜单内容发生变化时, 外部可以添加依赖执行
  const {
    dependenciesList: effectCallbacks,
    appendDep: appendEffectCallback,
    removeDep: removeEffectCallback
  } = useDependenciesListHook<() => void>();

  // computed 的副作用, 副作用是在组件中被调用
  const computedCallbacks: {
    target: ComputedSelectorObj;
    effectCallbacks: (() => void)[];
  }[] = [];

  /**
   * 制造一个 proxy 对象
   * @returns
   */
  function makeProxy<Target extends {}>(target: Target): Target {
    if (isProxyObj(target)) return target;

    if (isFunction(target)) return target;
    if (!isObject(target) && !isArray(target)) return target;
    if (isValidElement(target)) return target;

    for (const key in target) {
      const subTarget = Reflect.get(target, key);
      if (!subTarget) continue;
      if (isComputedSelectorObj(subTarget)) {
        // sync 同步, 当 subTarget 是一个 computed, 那么向其添加一个副作用, 当他的值发生改变, 那么改变当前值
        const sync = () => {
          Reflect.set(target, key, makeProxy(subTarget.value));
          // 菜单内容发生改变, 执行副作用 :: Reflect.set 不会触发后面的 proxy set
          effectCallbacks.forEach(callback => callback());
        }
        sync();
        computedCallbacks.push({
          target: subTarget,
          effectCallbacks: [sync]
        })
        continue;
      }

      Reflect.set(target, key, makeProxy(subTarget as Target));
    }

    return new Proxy(target, {
      get(target, p, receiver) {
        if (p === '__TAG__') return proxySymbol;

        return Reflect.get(target, p, receiver);
      },
      set(target, p, newValue, receiver) {
        const oldValue = Reflect.get(target, p, receiver);

        // 执行副作用
        if (oldValue !== newValue) effectCallbacks.forEach(callback => callback());
        return Reflect.set(target, p, makeProxy(newValue), receiver);
      },
      defineProperty(target, property, attributes) {
        return Reflect.defineProperty(target, property, attributes);
      },
      deleteProperty(target, p) {

        return Reflect.deleteProperty(target, p);
      },
    });
  }

  return {
    effectCallbacks,
    appendEffectCallback,
    removeEffectCallback,

    computedCallbacks,
    target: makeProxy(target)
  }
}
