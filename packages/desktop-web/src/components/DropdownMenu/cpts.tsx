import type { IconKey } from '@components/IconFont';
import { combinationCName } from '@rapid/libs-web/common';
import { useEventListener, useReactive, useShallowReactive, useThrottleHook } from '@rapid/libs-web/hooks';
import type { DropDownProps, SubMenuProps, MenuItemProps, DividerProps, MenuProps } from 'antd';
import type { MenuItemType, SubMenuType, MenuDividerType, MenuItemGroupType, ItemType } from 'antd/lib/menu/interface';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactElement, Key, ReactNode } from 'react';
import Subfield from '@rapid/libs-web/components/Subfield';
import IconFont from '@components/IconFont';

export type { MenuItemType, SubMenuType, MenuItemGroupType, MenuDividerType, ItemType } from 'antd/lib/menu/interface';

export interface ContextMenuItem extends Omit<MenuItemType, 'disabled'> {
  hidden?: boolean | (() => boolean);
  disabled?: boolean | (() => boolean);

  iconKey?: IconKey;
  icon?: ReactNode;

  /** 展示内容 */
  content: ReactElement;

  /** 快捷键 */
  shortcut?: string | string[];
}w

export interface ContextMenuDivider extends MenuDividerType {

}

export interface ContextMenuItemGroup<T extends ContextMenuItem = ContextMenuItem> extends Omit<MenuItemGroupType, 'children'> {
  children?: ContextItemType<T>[];
}

export interface ContextSubMenu<T extends ContextMenuItem = ContextMenuItem> extends Omit<SubMenuType, 'children'> {
  children?: ContextItemType<T>[];
}

export type ContextItemType<T extends ContextMenuItem = ContextMenuItem> = T | ContextSubMenu<T> | ContextMenuItemGroup<T> | ContextMenuDivider | null;

export interface ContextMenu extends Omit<MenuProps, 'items'> {
  items: ContextItemType[];
  effect: () => void;
}
