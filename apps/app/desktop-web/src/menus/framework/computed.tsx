import { useUserStore, UserStore, useDocStore } from '@/features';
import { useDependenciesListHook } from '@rapid/libs-web/hooks';
import type { AppendDepFn, RemoveDepFn } from '@rapid/libs-web/hooks';
import type { UseBoundStore, useStore, StoreApi } from 'zustand';

// 创建一个状态管理的副本, 并且跟随 redux 改变
export const targetStore = {
  user: useUserStore.getState(),
  doc: useDocStore.getState()
};

const runtimeContext: Record<string, {
  store: UseBoundStore<StoreApi<any>>
  effectCallbacks: (() => void)[];
  appendCallback: (callback: () => void) => void;
  removeCallback: (callback: () => void) => void;
}> = {

}

export type AppStoreType = typeof targetStore;

// computed 对象的标志
export const computedSelectorSymbol = Symbol('computedSymbol');

/**
 * 一个 computed 对象的类型
 * @private
 */
export type ComputedSelectorObj<Value extends any = any> = {
  // 标志, 标志当前对象是一个 computed
  __TAG__: typeof computedSelectorSymbol;
  // computed 的维护值, 会跟随 redux 变化
  value: Value;
  // 副作用数组
  effectCallbacks: (() => void)[];
  // 添加一个副作用到数组中
  appendCallback: AppendDepFn<() => void>;
  // 从副作用数组中删除一个副作用
  removeCallback: RemoveDepFn<() => void>;
}

/**
 * 尝试从 redux 中获取一个变量从而决定当前的值, 但是只在 makeMenu 函数中生效
 * 并且要求在使用的组件中使用 useMenuSelector 函数来获取值
 *
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
 *
 * @param getter
 */
export const computedSelector = <TStore extends UseBoundStore<StoreApi<any>>, TResult,>(store: TStore, getter: (state: ReturnType<TStore['getState']>) => TResult) => {
  if (!runtimeContext[store.name]) {
    const {
      dependenciesList: subscribes,
      appendDep: appendSubscribe,
      removeDep: removeSubscribe
    } = useDependenciesListHook<() => void>();

    runtimeContext[store.name] = {
      store,
      effectCallbacks: subscribes,
      appendCallback: appendSubscribe,
      removeCallback: removeSubscribe
    }

    runtimeContext[store.name].store.subscribe(() => {
      runtimeContext[store.name].effectCallbacks.forEach(callback => callback());
    })
  }

  const { dependenciesList, appendDep, removeDep } = useDependenciesListHook<() => void>();

  const instance = runtimeContext[store.name]!;

  const target: ComputedSelectorObj<TResult> = {
    __TAG__: computedSelectorSymbol,
    value: getter(instance.store.getState()),
    effectCallbacks: dependenciesList,
    appendCallback: appendDep,
    removeCallback: removeDep
  }

  instance.appendCallback(() => {
    target.value = getter(instance.store.getState());
    target.effectCallbacks.forEach(callback => callback());
  });

  return target;
}

/**
 * 判断 target 是否一个特定的 computed 对象, 这个只会在内部用到
 * @param target
 * @private
 */
export const isComputedSelectorObj = <T extends ComputedSelectorObj,>(target: any): target is T => {
  if (!target) return false;
  if (typeof target !== 'object') return false;
  return target.__TAG__ === computedSelectorSymbol;
}
