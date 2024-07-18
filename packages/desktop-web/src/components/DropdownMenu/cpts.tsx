
import type { IconKey } from '@components/IconFont';
import { combinationCName } from '@rapid/libs-web/common';
import { useEventListener, useReactive, useShallowReactive, useThrottleHook } from '@rapid/libs-web/hooks';
import { Dropdown, Menu, Divider } from 'antd';
import type { DropDownProps, SubMenuProps, MenuItemProps, DividerProps } from 'antd';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import Subfield from '@rapid/libs-web/components/Subfield';
import IconFont from '@components/IconFont';



export const DropdownMenuStateContext = createContext({
  open: false
});

export interface MenuDividerProps extends DividerProps {

}
export function MenuDivider(props: MenuDividerProps) {
  const {
    className,
    ...realProps
  } = props;

  return <Divider
    {...realProps}
    className={combinationCName(className)}
  />
}

export interface DropdownMenuItemProps extends MenuItemProps {
  key: string;
  mark?: IconKey;
  shortcut?: string;
  slots?: {
    icon: () => ReactElement;
  }
}
export function DropdownMenuItem(props: DropdownMenuItemProps) {
  const {
    key,
    mark = 'GithubOutlined',
    shortcut = '',
    slots,

    className,
    children,

    onClick,
    onClickCapture,

    onDoubleClick,
    onDoubleClickCapture,

    onAuxClick,
    onAuxClickCapture,
    ...realProps
  } = props;
  const state = useContext(DropdownMenuStateContext);

  return <Menu.Item
    {...realProps}
    key={key}
    className={combinationCName(className)}
    onClick={(...args) => {
      if (state.open === true) state.open = false;
      onClick && onClick(...args);
    }}
    onDoubleClick={(...args) => {
      if (state.open === true) state.open = false;
      onDoubleClick && onDoubleClick(...args);
    }}
    onAuxClick={(...args) => {
      if (state.open === true) state.open = false;
      onAuxClick && onAuxClick(...args);
    }}
    onClickCapture={(...args) => {
      if (state.open === true) state.open = false;
      onClickCapture && onClickCapture(...args);
    }}
    onAuxClickCapture={(...args) => {
      if (state.open === true) state.open = false;
      onAuxClickCapture && onAuxClickCapture(...args);
    }}
    onDoubleClickCapture={(...args) => {
      if (state.open === true) state.open = false;
      onDoubleClickCapture && onDoubleClickCapture(...args);
    }}
    icon={
      slots?.icon
        ? slots.icon()
        : <IconFont icon={mark} />
    }
  >
    <Subfield gap={15}>
      <div>
        {children}
      </div>
      <span>
        {shortcut}
      </span>
    </Subfield>
  </Menu.Item>
}

export interface DropdownSubMenuProps extends SubMenuProps {
  key: string;
  mark?: IconKey;

  slots?: {
    icon: () => ReactElement;
  }
}
export function DropdownSubMenu(props: DropdownSubMenuProps) {
  const {
    key = '1',
    mark = 'GithubOutlined',
    slots,


    className,
    children,
    ...realProps
  } = props;

  console.log('???');


  return <Menu.SubMenu
    {...realProps}
    key={key}
    className={combinationCName(className)}
    icon={
      slots?.icon
        ? slots.icon()
        : <IconFont icon={mark} />
    }
  >
    {children}
  </Menu.SubMenu>
}
