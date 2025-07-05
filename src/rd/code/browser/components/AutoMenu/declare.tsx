import type {
  MenuItemType as AntdMenuItemType,
  SubMenuType as AntdSubMenuType,
  MenuDividerType as AntdMenuDividerType,
  MenuItemGroupType as AntdMenuItemGroupType,
  ItemType as AntdItemType
} from 'antd/lib/menu/interface';
import type { FC, Key, ReactElement, ReactNode } from 'react';
import { MenuItem, SubMenu } from './cpts';
import { IconKey, IconRealKey } from '../IconFont';

const state = {
  /**
   * 叠加 key, 转换菜单的同时自动读取生成唯一菜单项的 key
   */
  stackingKey: 0
}

/**
 * 生成一个叠加的菜单 key
 */
const generatorStackingKey = () => `rapid-stacking-${state.stackingKey++}`;

/**
 * 自定义菜单项的类型, 继承自 AntdMenuItemType, 但同时具有自定义扩展的类型
 */
export type MenuItemType = Omit<AntdMenuItemType, 'disabled' | 'icon' | 'key'> & {
  /**
   * 当前菜单项是否隐藏
   */
  hidden?: boolean;

  /**
   * 当前菜单项是否禁用
   */
  disabled?: boolean;

  /**
   * icon 的选择 key
   */
  icon?: IconKey;

  /**
   * 快捷方式
   */
  shortcut?: | string | string[] | readonly string[];

  /**
   * 当前项的类型
   */
  type: 'item';

  /**
   * 菜单项展示的主体
   */
  label?: ReactNode | FC | (() => JSX.Element);
};
export { AntdMenuItemType };

/**
 * 转换菜单项, 将某一个自定义菜单项转换为 antd menu 组件可以使用的菜单项
 */
export function convertMenuItem<Item extends MenuItemType>(item: Item): AntdMenuItemType {
  const { hidden, disabled, icon, shortcut, label, ...realItem } = item;

  return {
    ...realItem,
    key: generatorStackingKey(),
    disabled: disabled as unknown as boolean,
    label: (
      <MenuItem
        icon={icon}
        label={label}
        shortcut={shortcut}
      />
    )
  }
}

/**
 * 定义子菜单的类型, 继承自 AntdSubMenuType, 但同时具有自定义扩展的类型
 */
export type SubMenuType<T extends ItemType = ItemType> = Omit<AntdSubMenuType, 'children' | 'icon' | 'key'> & {
  type: 'submenu' | string;
  icon?: IconKey;
  label?: ReactNode | FC | (() => JSX.Element);
  children?:
    | (T | SubMenuType | MenuDividerType)[]
    | readonly (T | SubMenuType | MenuDividerType)[];
};
export { AntdSubMenuType };

/**
 * 转换子菜单项, 将某一个自定义菜单项转换为 antd menu 组件可以使用的子菜单项
 */
export function convertSubMenu<SubMenu extends SubMenuType>(subMenu: SubMenu): AntdSubMenuType {
  const { icon, label, type, children, ...realSubMenu } = subMenu;

  const antdSubMenuChildren = children?.map(item => {
    if (!item) return void 0;

    if (item.type === 'item') return convertMenuItem(item as MenuItemType);
    if (item.type === 'divider') return convertMenuDivider(item as MenuDividerType);
    if (item.type === 'submenu') return convertSubMenu(item as SubMenuType);
    if (item.type === 'group') return convertMenuItemGroupType(item as MenuItemGroupType);

    console.warn(`菜单项中含有未定义type的项, 该项会被忽略`);
    return void 0;
  }).filter(e => e) as AntdItemType[];

  return {
    ...realSubMenu,
    key: generatorStackingKey(),
    children: antdSubMenuChildren,
    type,
    label: (
      <SubMenu
        icon={icon}
        label={label}
      />
    )
  };
}

/**
 * 定义分割线的类型
 */
export type MenuDividerType = AntdMenuDividerType & {
  type: 'divider' | string;
};

export { AntdMenuDividerType };

/**
 * 转换分割线子项
 */
export function convertMenuDivider<MenuDivider extends MenuDividerType>(divider: MenuDivider): AntdMenuDividerType {
  return divider;
}

/**
 * 定义菜单项组的类型
 */
export type MenuItemGroupType<T extends ItemType = ItemType> = Omit<AntdMenuItemGroupType, 'children'> & {
  children?: T[];
  type: 'group' | string;
};

export { AntdMenuItemGroupType };

/**
 * 转换菜单组到 antd 可以使用的对象
 */
export function convertMenuItemGroupType<MenuItemGroup extends MenuItemGroupType>(group: MenuItemGroup) {
  const children = group.children?.map(item => {
    if (!item) return void 0;

    if (item.type === 'item') return convertMenuItem(item as MenuItemType);
    if (item.type === 'divider') return convertMenuDivider(item as MenuDividerType);
    if (item.type === 'submenu') return convertSubMenu(item as SubMenuType);
    if (item.type === 'group') return convertMenuItemGroupType(item as MenuItemGroupType);

    console.warn(`菜单项中含有未定义type的项, 该项会被忽略`);
    return void 0;
  }).filter(e => e) as AntdItemType[];

  return {
    ...group,
    children
  }
}

export type ItemType<T extends MenuItemType = MenuItemType> = T | SubMenuType<T> | MenuDividerType | MenuItemGroupType<T> | null;

export { AntdItemType };

/**
 * 定义一个菜单实例对象的类型, 通过菜单实例和组件 AutoMenu 来生成一个上下文菜单
 */
export type MenuInstanceType = {
  readonly label: ReactNode;
  readonly trigger?: ('click' | 'hover' | 'contextMenu')[];
  readonly icon?: IconKey;
  children: ItemType[] | readonly ItemType[];
}

export type AntdMenuInstanceType = Omit<MenuInstanceType, 'children'> & {
  key: string;
  icon?: IconKey;
  label?: ReactNode;
  children: AntdItemType[]
};

/**
 * 转换菜单实例
 */
export function convertMenuInstance<Menu extends MenuInstanceType>(menuInstance: Menu): AntdMenuInstanceType {
  const { label, trigger, icon, children } = menuInstance;

  const antdMenuInstanceChildren = children.map(item => {
    if (!item) return void 0;
    if (item.type === 'item') return convertMenuItem(item as MenuItemType);
    if (item.type === 'divider') return convertMenuDivider(item as MenuDividerType);
    if (item.type === 'submenu') return convertSubMenu(item as SubMenuType);
    if (item.type === 'group') return convertMenuItemGroupType(item as MenuItemGroupType);

    console.warn(`菜单项中含有未定义type的项, 该项会被忽略`);
    return void 0;
  }).filter(e => e) as AntdItemType[];

  return {
    key: generatorStackingKey(),
    label,
    icon,
    trigger,
    children: antdMenuInstanceChildren
  }
}
