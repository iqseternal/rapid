import { useDependenciesListHook, useRefresh } from '../hooks';
import { isFunction, isObject } from '@suey/pkg-utils';
import { isValidElement, Ref, useEffect } from 'react';
import type { StoreApi, UseBoundStore } from 'zustand';

const ZustandSelectorTargetSymbol = Symbol(`ZustandSelectorObjSymbol`);

export namespace ZustandHijack {
  /**
   * zustand store 添加的订阅副作用
   */
  export interface ZustandStoreEffect {
    /** 副作用列表 */
    effects: ((state: any, prevState: any) => void)[];

    /** 添加副作用 */
    appendEffect: (effect: (state: any, prevState: any) => void) => void;
    /** 移除副作用 */
    removeEffect: (effect: (state: any, prevState: any) => void) => void;

    /** 开始订阅 */
    subscribe: () => void;
    /** 停止订阅 */
    unsubscribe: () => void;
  }

  /**
   * 创建的选择器对象
   */
  export interface ZustandSelectorTarget<Value> {
    /** 标志位, 通过访问标志位判断是否是 选择器对象 */
    __TAG__: typeof ZustandSelectorTargetSymbol;
    /** 维护值 */
    value: Value;

    /** 副作用列表, 当 value 值发生变化, 从而执行副作用 */
    effects: (() => void)[];

    /** 添加副作用 */
    appendEffect: (effect: () => void) => void;
    /** 移除副作用 */
    removeEffect: (effect: () => void) => void;
  }

  /**
   * 创建的 ZustandHijack 对象
   */
  export type ZustandHijackTarget<Target extends {}> = {
    [Key in keyof Target]:
      Target[Key] extends ZustandSelectorTarget<any>
        ? Target[Key]['value']
        : (Target[Key] extends {} ? ZustandHijackTarget<Target[Key]> : Target[Key]);
  }

  /**
   * 创建的 ZustandHijack 对象的副作用对象, 当属性值发生变化, 触发副作用
   */
  export interface ZustandHijackTargetEffect {
    /** ZustandHijack 对象中包含 选择器返回对象, 此对象发生变化那么本对象也会发生变化, 这是记录的选择器对象的列表, 非特殊不要调用 */
    selectorEffects: {
      appendEffects: () => void;
      removeEffects: () => void;
    }[];

    /** 副作用列表 */
    effects: ((state: any, prevState: any) => void)[];
    /** 添加副作用 */
    appendEffect: (effect: () => void) => void;
    /** 移除副作用 */
    removeEffect: (effect: () => void) => void;
  }
}

/** zustand store map, 拿到对应的存储副作用的对象 */
const zustandStoreMap = new WeakMap<UseBoundStore<StoreApi<any>>, ZustandHijack.ZustandStoreEffect>();

/** 建立 map 关系 */
const setupZustandStoreMap = <TStore extends UseBoundStore<StoreApi<any>>>(store: TStore) => {
  if (zustandStoreMap.has(store)) return zustandStoreMap.get(store);

  const { dependenciesList, appendDep, removeDep } = useDependenciesListHook<((state: any, prevState: any) => void)>();

  const target: ZustandHijack.ZustandStoreEffect = {
    effects: dependenciesList,
    appendEffect: appendDep,
    removeEffect: removeDep,
    // 启用同步
    subscribe: () => {
      const unsubscribe = store.subscribe((state, prevState) => {
        // 执行副作用
        target.effects.forEach(effect => effect(state, prevState));
      })

      target.unsubscribe = unsubscribe;
    },
    // 移除、停止同步
    unsubscribe: () => {}
  }

  target.subscribe();

  zustandStoreMap.set(store, target);
  return target;
}

/** zustand 属性选择器 */
const zustandSelector = <TStore extends UseBoundStore<StoreApi<any>>, TState extends ReturnType<TStore['getState']>, TResult,>(store: TStore, selector: (state: TState) => TResult): ZustandHijack.ZustandSelectorTarget<TResult> => {
  const { appendEffect } = setupZustandStoreMap(store)!;

  const { dependenciesList, appendDep, removeDep } = useDependenciesListHook<() => void>();

  const target: ZustandHijack.ZustandSelectorTarget<TResult> = {
    __TAG__: ZustandSelectorTargetSymbol,
    value: selector(store.getState()),

    effects: dependenciesList,
    appendEffect: appendDep,
    removeEffect: removeDep
  }

  // zustand 发生变化时, 更新自身的值
  appendEffect((state, prevState) => {
    const targetValue = selector(state);
    const oldValue = target.value;

    target.value = targetValue;
    // 触发副作用
    if (oldValue !== targetValue) dependenciesList.forEach(effect => effect());
  });

  return target;
}

/** 判断目标是否是创建出来的 ZustandSelectorTarget 选择器对象 */
const isZustandSelectorObj = <Target extends ZustandHijack.ZustandSelectorTarget<any>>(target: Target | any): target is ZustandHijack.ZustandSelectorTarget<any> => (
  (typeof target === 'object') &&
  target.__TAG__ === ZustandSelectorTargetSymbol
);


/** hijackObjMap */
const zustandHijackMap = new WeakMap<{}, ZustandHijack.ZustandHijackTargetEffect>();

// k:v 原对象:代理过的对象, // k:v 代理过的对象:原对象
const proxyMap = new WeakMap(), rawMap = new WeakMap();

export interface ToMakeZustandHijackOptions {
  beforeHijackCovert?: (target: any) => any;
}
export const toMakeZustandHijack = (options?: ToMakeZustandHijackOptions) => {
  const {
    beforeHijackCovert = <T>(e: T) => e
  } = options ?? {};

  const makeZustandHijack = <
    Target extends {},
    UnHijackTarget = ZustandHijack.ZustandHijackTarget<Target>
  >(toHijackSourceTarget: (selector: typeof zustandSelector) => Target): UnHijackTarget => {
    const sourceTarget = toHijackSourceTarget(zustandSelector);
    const target = beforeHijackCovert(sourceTarget);
    if (zustandHijackMap.has(target)) return target;

    const { dependenciesList: effects, appendDep: appendEffect, removeDep: removeEffect } = useDependenciesListHook<() => void>();
    const selectorEffects: ZustandHijack.ZustandHijackTargetEffect['selectorEffects'] = [];

    const toHijack = <Target extends {}>(target: Target): Target => {
      const existingProxy = proxyMap.get(target);
      if (existingProxy) return existingProxy;

      if (rawMap.has(target)) return target;

      if (isFunction(target)) return target;
      if (!isObject(target) && !Array.isArray(target)) return target;
      if (isValidElement(target)) return target;

      for (const key in target) {
        const subTarget = Reflect.get(target, key);
        if (!subTarget) continue;

        if (isZustandSelectorObj(subTarget)) {
          // sync 同步, 当 subTarget 是一个 computed, 那么向其添加一个副作用, 当他的值发生改变, 那么改变当前值
          Reflect.set(target, key, toHijack(subTarget.value));

          const sync = () => {
            Reflect.set(target, key, toHijack(subTarget.value));
            effects.forEach(effect => effect());
          }

          const { appendEffect, removeEffect } = subTarget;
          appendEffect(sync);

          selectorEffects.push({
            appendEffects: () => {
              appendEffect(sync);
            },
            removeEffects: () => {
              removeEffect(sync);
            }
          })
          continue;
        }

        Reflect.set(target, key, toHijack(subTarget as Target));
      }

      const hijackTarget = new Proxy(target, {
        get(target, p, receiver) {
          return Reflect.get(target, p, receiver);
        },
        set(target, p, newValue, receiver) {
          const oldValue = Reflect.get(target, p, receiver);

          // 执行副作用
          if (oldValue !== newValue) effects.forEach(callback => callback());
          return Reflect.set(target, p, toHijack(newValue), receiver);
        },
        defineProperty(target, property, attributes) {
          return Reflect.defineProperty(target, property, attributes);
        },
        deleteProperty(target, p) {

          return Reflect.deleteProperty(target, p);
        },
      });

      rawMap.set(zustandHijackMap, target);
      proxyMap.set(target, zustandHijackMap);

      return hijackTarget;
    }

    const hijack = toHijack(target);

    if (!zustandHijackMap.has(hijack)) {
      zustandHijackMap.set(hijack, {
        effects,
        appendEffect,
        removeEffect,
        selectorEffects
      })
    }
    return hijack;
  }

  return { makeZustandHijack }
}


/**
 * 将一个全局的代理对象 (属性由 zustand 变化而变化) 使用为一个 React 组件对象, 并且当对象属性变化时, 组件还会自动更新
 *
 *
 * @param target
 * @returns
 */
export const useZustandHijack = <Target extends {}, ZustandHijackTarget extends ZustandHijack.ZustandHijackTarget<Target>>(target: ZustandHijackTarget): ZustandHijackTarget => {
  const refresh = useRefresh();

  const { appendEffect, removeEffect } = zustandHijackMap.get(target)!;

  useEffect(() => {
    appendEffect(refresh);

    return () => {
      removeEffect(refresh);
    }
  }, []);


  return target;
}
