import type { IconKey } from '@components/IconFont';
import { classnames } from '@rapid/libs-web/common';
import type { FC } from 'react';
import type { MenuItemType, SubMenuType } from './declare';
import { isValidElement, useMemo } from 'react';
import { isObject } from '@rapid/libs';
import { isReactFC } from '@rapid/libs-web/common';

import commonStyles from '@scss/common/index.module.scss';
import styles from './cpts.module.scss';
import IconFont from '@components/IconFont';


export interface MenuItemProps extends BaseProps {
  /** 该菜单项的 icon name */
  iconKey: MenuItemType['iconKey'];
  /** 展示的 label 内容 */
  label: MenuItemType['label'];
  /** 快捷键列表 */
  shortcut: MenuItemType['shortcut'];
}

/**
 * MenuItem 组件, 为 AutoDropdownMenu 服务, 作用为渲染自定义的 item 配置, 因为 item 中包含了某些额外的自定义属性
 */
export const MenuItem: FC<MenuItemProps> = (props) => {
  const {
    iconKey,
    label,
    shortcut
  } = props;

  const shortcutKeys = useMemo(() => Array.isArray(shortcut) ? shortcut : (
    shortcut ? [shortcut] : []
  ), [shortcut]);

  const content = useMemo(() => {
    if (!isReactFC(label)) return label;

    const Label = label;
    return <Label />
  }, [label]);

  return <div
    className={classnames(
      styles.menuItem,

    )}
  >
    {iconKey ? <IconFont icon={iconKey} className={classnames(styles.icon, commonStyles.flexFixed)} /> : <span className={classnames(styles.icon, commonStyles.flexFixed)} />}
    <div className={styles.content}>
      {content}
    </div>
    <span className={classnames(commonStyles.flexFixed, styles.shortcut)}>
      {shortcutKeys.length > 0 && shortcutKeys[0]}
    </span>
  </div>
}

export interface SubMenuProps extends BaseProps {
  iconKey: SubMenuType['iconKey'];
  label: SubMenuType['label'];
}


/**
 * SubMenu 组件, 为 AutoDropdownMenu 服务, 作用为渲染自定义的 SubMenu 配置, 因为 SubMenu 中包含了某些额外的自定义属性
 */
export const SubMenu: FC<SubMenuProps> = (props) => {
  const {
    iconKey,
    label
  } = props;

  return <div
    className={classnames(
      styles.menuItem
    )}
  >
    {iconKey ? <IconFont icon={iconKey} className={classnames(styles.icon, commonStyles.flexFixed)} /> : <span className={classnames(styles.icon, commonStyles.flexFixed)} />}
    <div className={styles.content}>
      {label}
    </div>
    <span />
  </div>
}
