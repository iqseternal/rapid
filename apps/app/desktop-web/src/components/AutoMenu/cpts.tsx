import type { IconKey } from '@components/IconFont';
import { classnames, isReactFC } from '@rapid/libs-web/common';
import type { FC } from 'react';
import type { MenuInstanceType, MenuItemType, SubMenuType } from './declare';
import { isValidElement, useMemo, memo } from 'react';
import { isString } from '@rapid/libs';
import { commonStyles } from '@scss/common';

import IconFont from '@components/IconFont';

export interface MenuItemProps extends BaseProps {
  /**
   * 该菜单项的 icon name
   * */
  icon: MenuItemType['icon'];

  /**
   * 展示的 label 内容
   * */
  label: MenuItemType['label'];

  /**
   * 快捷键列表
   * */
  shortcut: MenuItemType['shortcut'];
}

/**
 * MenuItem 组件, 为 AutoMenu 服务, 作用为渲染自定义的 item 配置, 因为 item 中包含了某些额外的自定义属性
 */
export const MenuItem: FC<MenuItemProps> = memo((props) => {
  const { icon, label: Label, shortcut } = props;

  const shortcutKeys = useMemo(() => {
    if (!shortcut) return [];
    if (shortcut && isString(shortcut)) return [shortcut];
    return shortcut;
  }, [shortcut]);

  const content = useMemo(() => {
    if (!isReactFC(Label)) return Label;
    return <Label />;
  }, [Label]);

  return <div
    className='px-2 py-1 text-sm text-center rounded hover:bg-gray-100 flex items-center gap-x-2'
  >
    <div
      className='min-w-[14px] inline-block flex-none'
    >
      {icon && <>
        <IconFont
          icon={icon}
          className='drop-shadow-lg'
        />
      </>}
    </div>
    <div
      className='flex-auto mr-2 flex justify-start items-center'
    >
      {content}
    </div>
    <span
      className='flex-none text-gray-500'
    >
      {shortcutKeys.length > 0 && shortcutKeys[0]}
    </span>
  </div>
})

export interface SubMenuProps extends BaseProps {
  icon: SubMenuType['icon'];
  label: SubMenuType['label'];
}

/**
 * SubMenu 组件, 为 AutoMenu 服务, 作用为渲染自定义的 SubMenu 配置, 因为 SubMenu 中包含了某些额外的自定义属性
 */
export const SubMenu: FC<SubMenuProps> = memo((props) => {
  const { icon, label: Label } = props;

  const content = useMemo(() => {
    if (!isReactFC(Label)) return Label;
    return <Label />;
  }, [Label]);

  return <div
    className='px-2 py-1 text-sm text-center rounded hover:bg-gray-100 flex items-center gap-x-2'
  >
    <div
      className='min-w-[14px] inline-block flex-none'
    >
      {icon && <>
        <IconFont
          icon={icon}
          className='drop-shadow-lg'
        />
      </>}
    </div>
    <div
      className='flex-auto mr-2 flex justify-start items-center'
    >
      {content}
    </div>
    <span
      className='flex-none text-gray-500'
    />
  </div>
})