import type { IconKey } from '@components/IconFont';
import { combinationCName } from '@rapid/libs-web/common';
import { useEventListener, useReactive, useThrottleHook } from '@rapid/libs-web/hooks';
import type { DropDownProps, DividerProps, MenuProps } from 'antd';
import {createContext, useContext, useEffect, useRef, useState, FC} from 'react';
import type { ReactElement, Key, ReactNode } from 'react';
import Subfield from '@rapid/libs-web/components/Subfield';
import IconFont from '@components/IconFont';
import type { MenuItemType, SubMenuType } from '@/menus/framework/declare';

import commonStyles from '@scss/common/index.module.scss';
import styles from './cpts.module.scss';

export interface MenuItemProps extends BaseProps {
  iconKey: MenuItemType['iconKey'];
  label: MenuItemType['label'];
  shortcut: MenuItemType['shortcut'];
}
export const MenuItem: FC<MenuItemProps> = (props) => {
  const {
    iconKey,
    label,
    shortcut
  } = props;

  const shortcutKeys = Array.isArray(shortcut) ? shortcut : (
    shortcut ? [shortcut] : []
  );

  return <div
    className={combinationCName(
      styles.menuItem,

    )}
  >
    {iconKey ? <IconFont icon={iconKey} /> : <span className={combinationCName(styles.icon, commonStyles.flexFixed)} />}
    <div className={styles.content}>
      {label}
    </div>
    <span className={combinationCName(commonStyles.flexFixed)}>
      {shortcutKeys.length > 0 && shortcutKeys[0]}
    </span>
  </div>
}

export interface SubMenuProps extends BaseProps {
  iconKey: SubMenuType['iconKey'];
  label: SubMenuType['label'];
}
export const SubMenu: FC<SubMenuProps> = (props) => {
  const {
    iconKey,
    label
  } = props;

  return <div
    className={combinationCName(
      styles.menuItem
    )}
  >
    {iconKey ? <IconFont icon={iconKey} /> : <span className={combinationCName(styles.icon, commonStyles.flexFixed)} />}
    <div className={styles.content}>
      {label}
    </div>
    <span />
  </div>
}
