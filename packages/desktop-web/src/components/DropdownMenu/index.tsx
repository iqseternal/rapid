import type { IconKey } from '@components/IconFont';
import { combinationCName } from '@rapid/libs-web/common';
import { useEventListener, useReactive, useShallowReactive, useThrottleHook } from '@rapid/libs-web/hooks';
import { getFirstScrollContainer } from '@rapid/libs-web/common';
import { Dropdown, Menu, Divider } from 'antd';
import type { DropDownProps, SubMenuProps, MenuProps, MenuItemProps, DividerProps } from 'antd';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

import Subfield from '@rapid/libs-web/components/Subfield';
import IconFont from '@components/IconFont';
import styles from './index.module.scss';

const menus: MenuProps['items'] = [
  {
    key: '1',
    label: '文件',
    children: [
      {
        key: '1-1',
        label: '新建文档',
        disabled: true,
        icon: <IconFont icon='WindowsOutlined' />
      },
      {
        key: '1-2',
        label: '文档',
        type: 'group',

        children: [
          {
            key: '1-2-1',
            label: '新建文档',
            disabled: true,
            icon: <IconFont icon='WindowsOutlined' />
          },
          {
            key: '1-3',
            type: 'divider'
          },
          {
            key: '1-2-2',
            label: '新建文档',
            disabled: true,
            icon: <IconFont icon='WindowsOutlined' />
          }
        ]
      }
    ]
  }
];

const OpenContext = createContext(false);

const PropMenu = (props) => {
  const open = useContext(OpenContext);

  if (!open) return <></>;

  return <Menu
    subMenuOpenDelay={0}
    subMenuCloseDelay={0}
    selectable={false}
    triggerSubMenuAction={'click'}
    rootClassName={combinationCName(styles.dropdownMenuRootWrapper)}
    getPopupContainer={(triggerNode) => {
      return document.body;
    }}
    defaultOpenKeys={[]}
    onOpenChange={(openKeys) => {

    }}
    onClick={(info) => {

    }}
    onBlurCapture={() => {

    }}
    onSelect={(info) => {

    }}
    items={menus}
  />
}

export interface DropdownMenuProps extends DropDownProps {

}
export function DropdownMenu(props: DropdownMenuProps) {
  const {
    className,
    children,
    ...realProps
  } = props;

  const [state] = useShallowReactive({
    open: false
  });

  useEventListener(window, {
    'resize': useThrottleHook(() => {
      if (!state.open) return;
      state.open = false;
    }),
    'scroll': useThrottleHook(() => {
      if (!state.open) return;
      state.open = false;
    }),
  }, []);

  return <OpenContext.Provider value={state.open}>
    <Dropdown
      {...realProps}
      open={state.open}
      arrow={false}
      trigger={['click']}
      rootClassName={combinationCName(className, styles.dropdownMenuRootWrapper)}
      autoAdjustOverflow
      mouseEnterDelay={0}
      mouseLeaveDelay={0}
      getPopupContainer={(triggerNode) => getFirstScrollContainer(triggerNode) || document.body}
      onOpenChange={(value, info) => {
        state.open = value;
      }}
      dropdownRender={(originNode) => <PropMenu open={state.open} />}
    >
      {children}
    </Dropdown>
  </OpenContext.Provider>
}

export interface AutoDropdownMenuProps {

}
export default function AutoDropdownMenu() {

}

