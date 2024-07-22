import { useEffect } from 'react';
import { useRefresh } from '@rapid/libs-web/hooks';
import type { menus } from '../index';

const runtimeContext = {
  menus: [] as any
}

/**
 * 其实可以直接把 hook 和菜单定义放到一起的, 但是为了实现和使用分离, 就分开写了
 * @param runtimeMenus
 */
export const registerMenus = (runtimeMenus: typeof menus) => {
  runtimeContext.menus = runtimeMenus;
}

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
 * @param getter
 */
export const useMenuSelectorHook = <TKey extends keyof typeof menus, TResult extends typeof menus,>(getter: (_menus: typeof menus) => TResult[TKey]) => {
  const menu = getter(runtimeContext.menus);
  return menu.target;
}


/**
 * 组件 hook, 作用是从 menus 中取出想要的菜单项
 * @example
 *
 * const headerMenu = useMenuSelector(menus => menus.headerMenu);
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
 * @param getter
 */
export const useMenuSelector =  <TKey extends keyof typeof menus, TResult extends typeof menus,>(getter: (_menus: typeof menus) => TResult[TKey]) => {
  const refresh = useRefresh();

  const {
    target,
    computedCallbacks,
    appendEffectCallback, removeEffectCallback
  } = getter(runtimeContext.menus);

  useEffect(() => {
    // 菜单变化刷新当前组件
    appendEffectCallback(refresh);

    // 当 computed 子项发生改变, 执行回调, 实现菜单项与 computed 数据同步
    computedCallbacks.forEach(computedObj => {
      computedObj.effectCallbacks.forEach(callback => {
        computedObj.target.appendCallback(callback);
      });
    });

    return () => {
      // 删除副作用
      removeEffectCallback(refresh);

      // 删除 computed 的副作用
      computedCallbacks.forEach(computedObj => {
        computedObj.effectCallbacks.forEach(callback => {
          computedObj.target.removeCallback(callback);
        });
      });
    }
  }, []);

  return target;
}
