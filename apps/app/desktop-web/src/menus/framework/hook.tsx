import { useRefresh } from '@rapid/libs-web/hooks';
import { useEffect, useCallback } from 'react';
import type { menus } from '../index';

export type AppMenuType = typeof menus;
export type AppMenuSelectKey = keyof AppMenuType;

export type AppSelector<SelectKey extends AppMenuSelectKey,> = (menus: AppMenuType) => AppMenuType[SelectKey];
export type AppSelectorHook = {
  <SelectKey extends AppMenuSelectKey>(selector: AppSelector<SelectKey>): AppMenuType[SelectKey]['target'];

  <Selectors extends AppSelector<any>[], TResult extends any>(
    selector: Selectors,
    selectorContain: (
      ...args: {
        [Index in keyof Selectors]: Selectors[Index] extends (...args: any[]) => infer R ? (R extends AppMenuType[AppMenuSelectKey] ? R['target'] : never) : never;
      }
    ) => TResult
  ): TResult;
}

const runtimeContext = { menus: [] as any };
/**
 * 其实可以直接把 hook 和菜单定义放到一起的, 但是为了实现和使用分离, 就分开写了
 * @param runtimeMenus
 */
export const registerMenus = (runtimeMenus: AppMenuType) => (runtimeContext.menus = runtimeMenus);

/**
 * 使用当前函数可以在非组件环境中获取当前的菜单项, 并且更改当前的菜单项对应的组件展示也会随之刷新
 * @example
 * const headerMenu = useMenuSelectorHook(state => state.headerMenu);
 *
 * headerMenu.push({
 *   key: '1-35',
 *   label: '新建的菜单项',
 *   children: []
 * })
 *
 */
export const useMenuSelectorHook: AppSelectorHook = <
  SelectKey extends AppMenuSelectKey,
  Selectors extends AppSelector<SelectKey>[],
  TResult extends unknown
>(
  selectors: Selectors | Selectors[number],
  callback?: (...args: {
    [Index in keyof Selectors]: Selectors[Index] extends (...args: any[]) => infer R ? (R extends AppMenuType[AppMenuSelectKey] ? R['target'] : never) : never;
  }) => TResult
) => {
  if (Array.isArray(selectors) && callback) {
    const selectedMenus = (selectors as AppSelector<SelectKey>[]).map(getter => getter(runtimeContext.menus as AppMenuType));

    const selectedTargets = selectedMenus.map(menu => menu.target) as any;

    return callback(...selectedTargets);
  }

  const selector = selectors as Selectors[0];

  const menu = selector(runtimeContext.menus);
  return menu.target;
};

/**
 * 组件 hook, 作用是从 menus 中取出想要的菜单项
 * @example
 *
 * const headerMenu = useMenuSelector(menus => menus.headerMenu);
 *
 * const menus = useMenuSelector([menus => menus.headerMenu, menus => menus.editMenus] as const, (headerMenu, editMenu) => {
 *
 * })
 *
 * // 以下使用为旧方式
 * <DropdownMenu
 *   menus={headerMenu}
 * >
 *   <Button
 *     onContextMenu={e => {
 *
 *     }}
 *   >
 *     右击
 *   </Button>
 * </DropdownMenu>
 *
 * @param selectorsArr
 * @param tResultCallback
 */
export const useMenuSelector: AppSelectorHook = <
  SelectKey extends AppMenuSelectKey,
  Selectors extends AppSelector<SelectKey>[],
  TResult extends unknown
>(
  selectorsArr: Selectors | Selectors[0],
  tResultCallback?: (...args: {
    [Index in keyof Selectors]: Selectors[Index] extends (...args: any[]) => infer R ? (R extends AppMenuType[AppMenuSelectKey] ? R['target'] : never) : never;
  }) => TResult
) => {
  const refresh = useRefresh();

  // 统一参数
  const getCollection = useCallback((): { selectors: Selectors, callback: (...args: any[]) => any } => {
    if (Array.isArray(selectorsArr) && tResultCallback) {
      return {
        selectors: selectorsArr as Selectors,
        callback: tResultCallback
      }
    }

    if (!Array.isArray(selectorsArr) && !tResultCallback) {
      return {
        selectors: [selectorsArr] as Selectors,
        callback: (e: any, ...args: unknown[]) => e
      }
    }

    return {
      selectors: [] as unknown as Selectors,
      callback: (...args: unknown[]) => (void 0 as TResult)
    }
  }, []);

  // 获得 selector 与 callback
  const { selectors, callback } = getCollection();

  const menus = selectors.map(selector => selector(runtimeContext.menus));

  // 添加副作用
  useEffect(() => {
    // menu 可能包含多个

    menus.forEach(menu => {

      // menu 发生变化需要 refresh
      menu.appendEffectCallback(refresh);

      // menu 可能包含多个 computedObj, computedObj 发生变化需要添加副作用
      menu.computedCallbacks.forEach(computedObj => {

        // 当 computedObj 发生变化时候的回调
        computedObj.target.appendCallback(...computedObj.effectCallbacks);
      })
    });

    return () => {
      menus.forEach(menu => {
        menu.removeEffectCallback(refresh);
        menu.computedCallbacks.forEach(computedObj => {
          computedObj.target.removeCallback(...computedObj.effectCallbacks);
        })
      })
    }
  }, []);

  // 调用 callback 获取目标值
  return callback(...menus).target;
}

