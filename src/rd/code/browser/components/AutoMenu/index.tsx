import { classnames, getFirstScrollContainer } from '@rapid/libs-web/common';
import { useEventListener, useReactive, useThrottleHook, useShallowReactive, useThrottle } from '@rapid/libs-web/hooks';
import { Dropdown, Menu } from 'antd';
import type { DropDownProps, MenuProps } from 'antd';
import { createContext, useContext, forwardRef, useMemo, useCallback, memo } from 'react';
import type { ReactNode, FC } from 'react';
import { FullSize, MaxContent } from '@rapid/libs-web/styled';
import { commonStyles } from '@/scss/common';
import { convertMenuDivider, convertMenuInstance, convertMenuItem, convertMenuItemGroupType, convertSubMenu } from './declare';
import type {
  AntdItemType, AntdMenuDividerType, AntdMenuInstanceType, AntdMenuItemGroupType, AntdMenuItemType, AntdSubMenuType,
  ItemType, MenuItemGroupType, MenuInstanceType, MenuDividerType, MenuItemType, SubMenuType
} from './declare';

import { MenuItem, SubMenu } from './cpts';
import type { MenuItemProps, SubMenuProps } from './cpts';
import { inject } from '@rapid/libs';

import styles from './index.module.scss';

export type {
  AntdItemType, AntdMenuDividerType, AntdMenuInstanceType, AntdMenuItemGroupType, AntdMenuItemType, AntdSubMenuType,
  ItemType, MenuItemGroupType, MenuInstanceType, MenuDividerType, MenuItemType, SubMenuType
}
export type { MenuItemProps, SubMenuProps }

const DropdownMenuOpenContext = createContext(false);

interface ContextMenuProps {
  menu: AntdItemType[];
  menuAttrs: MenuProps;
}

/**
 * 解决某些问题下展开的菜单不正常关闭问题
 */
const ContextMenu = memo<ContextMenuProps>((props) => {
  const { menu, menuAttrs } = props;

  const open = useContext(DropdownMenuOpenContext);
  if (!open) return <></>;

  return (
    <Menu
      items={menu.concat([])}
      getPopupContainer={() => document.body}
      triggerSubMenuAction={'click'}
      {...menuAttrs}
      className={classnames(menuAttrs.className)}
    />
  )
})

export interface AutoMenuProps {
  /**
   * 渲染的菜单实例
   * */
  menu: AntdItemType[];
  menuAttrs?: MenuProps;

  /**
   * 给 dropdown 附加的属性参数
   *
   */
  dropdownAttrs?: DropDownProps;

  children: ReactNode;
}

/**
 * 自动渲染菜单的组件, 该菜单为 contextMenu 或者文件菜单
 *
 */
const AutoContextMenu = memo((props: AutoMenuProps) => {
  const { menu, menuAttrs = {}, dropdownAttrs = {}, children } = props;

  const [state] = useShallowReactive({
    open: false
  });

  const close = useThrottle(() => {
    if (!state.open) return;
    state.open = false;
  }, { wait: 100 }, []);

  // 当窗口发生大小或者滚动事件的时候, 关闭菜单的显示
  useEventListener(window, {
    'resize': close,
    // 'scroll': close,
    // 'blur': close
  }, []);

  return (
    <DropdownMenuOpenContext.Provider value={state.open}>
      <Dropdown
        open={state.open}
        arrow={false}
        trigger={['click']}
        autoAdjustOverflow
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        destroyPopupOnHide={false}
        getPopupContainer={() => document.body}
        onOpenChange={(value, info) => {
          state.open = value;
        }}
        dropdownRender={() => (
          <ContextMenu
            menu={menu}
            menuAttrs={menuAttrs}
          />
        )}
        {...dropdownAttrs}
        rootClassName={classnames(
          styles.dropdownMenuRootWrapper,
          dropdownAttrs.rootClassName
        )}
      >
        <div
          className={commonStyles.appRegionNo}
        >
          {children}
        </div>
      </Dropdown>
    </DropdownMenuOpenContext.Provider>
  )
})

export type AutoMenuType = typeof AutoContextMenu & {
  readonly convertMenuDivider: typeof convertMenuDivider,
  readonly convertMenuInstance: typeof convertMenuInstance,
  readonly convertMenuItem: typeof convertMenuItem,
  readonly convertMenuItemGroupType: typeof convertMenuItemGroupType,
  readonly convertSubMenu: typeof convertSubMenu,
  /**
   * 渲染 AutoMenu 中的菜单项元素
   */
  readonly MenuItem: typeof MenuItem,
  /**
   * 渲染一个 AutoMenu 中的子菜单元素
   */
  readonly SubMenu: typeof SubMenu
}

export const AutoMenu: AutoMenuType = AutoContextMenu as AutoMenuType;

inject(AutoMenu, 'convertMenuDivider', convertMenuDivider);
inject(AutoMenu, 'convertMenuInstance', convertMenuInstance);
inject(AutoMenu, 'convertMenuItem', convertMenuItem);
inject(AutoMenu, 'convertMenuItemGroupType', convertMenuItemGroupType);
inject(AutoMenu, 'convertSubMenu', convertSubMenu);
inject(AutoMenu, 'MenuItem', MenuItem);
inject(AutoMenu, 'SubMenu', SubMenu);

export default AutoMenu;
