import { IconKey } from '@components/IconFont';
import type {
  MenuItemType as AntdMenuItemType,
  SubMenuType as AntdSubMenuType,
  MenuDividerType as AntdMenuDividerType,
  MenuItemGroupType as AntdMenuItemGroupType,
  ItemType as AntdItemType
} from 'antd/lib/menu/interface';
import type { ReactNode } from 'react';

export type MenuItemType = Omit<AntdMenuItemType, 'disabled'> & {
  hidden?: boolean | (() => boolean);
  disabled?: boolean | (() => boolean);

  iconKey?: IconKey;

  content?: ReactNode;

  shortcut?: string | string[];
};

export type SubMenuType<T extends MenuItemType = MenuItemType> = Omit<AntdSubMenuType, 'children'> & {

  children?: T[];
};

export type MenuDividerType = Omit<AntdMenuDividerType, ''> & {

};

export type MenuItemGroupType<T extends MenuItemType = MenuItemType> = Omit<AntdMenuItemGroupType, 'children'> & {

  children?: T[];
};

export type ItemType<T extends MenuItemType = MenuItemType> = T | SubMenuType<T> | MenuDividerType | MenuItemGroupType<T> | null;

export function makeMenuItem<Item extends MenuItemType>(item: Item) {
  const {
    hidden,
    disabled,
    iconKey,
    content,
    shortcut
  } = item;

  const disable = item.disabled;
  if (typeof disable === 'function') item.disabled = disable();


}
