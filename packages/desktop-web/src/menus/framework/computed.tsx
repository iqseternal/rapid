import { useUserStore, UserStore, useDocStore } from '@/features';
import { useDependenciesListHook } from '@rapid/libs-web/hooks';
import type { AppendDepFn, RemoveDepFn } from '@rapid/libs-web/hooks';

// 创建一个状态管理的副本, 并且跟随 redux 改变
export const targetStore = {
  user: useUserStore.getState(),
  doc: useDocStore.getState()
};

export type AppStoreType = typeof targetStore;

const {
  dependenciesList: subscribes,
  appendDep: appendSubscribe,
  removeDep: removeSubscribe
} = useDependenciesListHook<() => void>();

const userCallback = () => { targetStore.user = useUserStore.getState() };
useUserStore.subscribe(() => subscribes.forEach(callback => callback()));
appendSubscribe(userCallback);

const docCallback = () => { targetStore.doc = useDocStore.getState() };
useDocStore.subscribe(() => subscribes.forEach(callback => callback()));
appendSubscribe(docCallback);

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
export const computedSelector = <TResult,>(getter: (state: AppStoreType) => TResult): ComputedSelectorObj<TResult> => {
  const { dependenciesList, appendDep, removeDep } = useDependenciesListHook<() => void>();

  const target: ComputedSelectorObj<TResult> = {
    __TAG__: computedSelectorSymbol,
    value: getter(targetStore),
    effectCallbacks: dependenciesList,
    appendCallback: appendDep,
    removeCallback: removeDep
  }

  appendSubscribe(() => {
    target.value = getter(targetStore);
    // 执行所有的副作用, 因为这个值可能影响着另外一个值的变化
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
