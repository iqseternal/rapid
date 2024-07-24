import IconFont, {IconKey, IconRealKey} from '@components/IconFont';
import Subfield from '@rapid/libs-web/components/Subfield';
import {FullSizeWidth} from '@rapid/libs-web/styled';
import type {
  MenuItemType as AntdMenuItemType,
  SubMenuType as AntdSubMenuType,
  MenuDividerType as AntdMenuDividerType,
  MenuItemGroupType as AntdMenuItemGroupType,
  ItemType as AntdItemType
} from 'antd/lib/menu/interface';
import type { Key, ReactNode } from 'react';
import { ComputedSelectorObj, computedSelector } from '@/menus/framework/computed';
import { MenuItem, SubMenu } from '@components/AutoDropdownMenu/cpts';

export type MenuItemType = Omit<AntdMenuItemType, 'disabled'> & {
  hidden?: boolean | ComputedSelectorObj<boolean>;
  disabled?: boolean | ComputedSelectorObj<boolean>;

  iconKey?: IconKey;

  content?: ReactNode;

  shortcut?: string | string[];
};
export { AntdMenuItemType };
export function convertMenuItem<Item extends MenuItemType>(item: Item): AntdMenuItemType {
  const {
    hidden,
    disabled,
    iconKey,
    content,
    shortcut,
    label,
    ...realItem
  } = item;

  if (content) {
    console.warn(`content是无效的属性, 请使用label`);
  }

  return {
    ...realItem,
    disabled: disabled as unknown as boolean,
    label: <MenuItem key={realItem.key} iconKey={iconKey} label={label} shortcut={shortcut} />
  }
}

export type SubMenuType<T extends ItemType = ItemType> = Omit<AntdSubMenuType, 'children'> & {
  key: string;
  iconKey?: IconRealKey;
  children?: T[];
};
export { AntdSubMenuType };
export function convertSubMenu<SubMenu extends SubMenuType>(subMenu: SubMenu): AntdSubMenuType {
  const children = subMenu.children?.map(item => {
    if (!item) return;

    if (item.type === 'item') return convertMenuItem(item as MenuItemType);
    if (item.type === 'divider') return convertMenuDivider(item as MenuDividerType);
    if (item.type === 'submenu') return convertSubMenu(item as SubMenuType);
    if (item.type === 'group') return convertMenuItemGroupType(item as MenuItemGroupType);

    if (!item.type) {
      console.warn(`菜单项中含有未定义type的项, 该项会被忽略`);
      return;
    }

    return;
  }).filter(e => e) as AntdItemType[];

  const targetMenu = subMenu as AntdSubMenuType;

  targetMenu.children = children;

  const {
    iconKey,
    label,
    ...realSubMenu
  } = subMenu;

  return {
    ...realSubMenu,
    children,
    label: <SubMenu key={realSubMenu.key} icon={iconKey} label={label} />
  };
}

export type MenuDividerType = AntdMenuDividerType;
export { AntdMenuDividerType };
export function convertMenuDivider<MenuDivider extends MenuDividerType>(divider: MenuDivider): AntdMenuDividerType {
  return divider;
}

export type MenuItemGroupType<T extends ItemType = ItemType> = Omit<AntdMenuItemGroupType, 'children'> & {

  children?: T[];
};
export { AntdMenuItemGroupType };
export function convertMenuItemGroupType<MenuItemGroup extends MenuItemGroupType>(group: MenuItemGroup) {
  const children = group.children?.map(item => {
    if (!item) return;

    if (item.type === 'item') return convertMenuItem(item as MenuItemType);
    if (item.type === 'divider') return convertMenuDivider(item as MenuDividerType);
    if (item.type === 'submenu') return convertSubMenu(item as SubMenuType);
    if (item.type === 'group') return convertMenuItemGroupType(item as MenuItemGroupType);

    if (!item.type) {
      console.warn(`菜单项中含有未定义type的项, 该项会被忽略`);
      return;
    }
    return;
  }).filter(e => e) as AntdItemType[];

  return {
    ...group,
    children
  }
}

export type ItemType<T extends MenuItemType = MenuItemType> = T | SubMenuType<T> | MenuDividerType | MenuItemGroupType<T> | null;
export { AntdItemType };

export type MenuInstance = {
  key: Key;
  label: ReactNode;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  iconKey?: IconKey;
  children: ItemType[];
}
export type AntdMenuInstance = Omit<MenuInstance, 'children'> & { children: AntdItemType[] };

export function convertMenu<Menu extends MenuInstance>(menu: Menu): AntdMenuInstance {
  const children = menu.children.map(item => {
    if (!item) return;

    if (item.type === 'item') return convertMenuItem(item as MenuItemType);
    if (item.type === 'divider') return convertMenuDivider(item as MenuDividerType);
    if (item.type === 'submenu') return convertSubMenu(item as SubMenuType);
    if (item.type === 'group') return convertMenuItemGroupType(item as MenuItemGroupType);

    if (!item.type) {
      console.warn(`菜单项中含有未定义type的项, 该项会被忽略`);
      return;
    }

    return;
  }).filter(e => e) as AntdItemType[];

  const targetMenu = menu as AntdMenuInstance;

  targetMenu.children = children;

  console.log(targetMenu);

  return targetMenu;
}
