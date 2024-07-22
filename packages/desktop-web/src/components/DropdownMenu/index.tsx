import type { IconKey } from '@components/IconFont';
import { combinationCName } from '@rapid/libs-web/common';
import { useEventListener, useReactive, useRefresh, useShallowReactive, useThrottleHook } from '@rapid/libs-web/hooks';
import { getFirstScrollContainer } from '@rapid/libs-web/common';
import { Dropdown, Menu, Divider } from 'antd';
import type { DropDownProps, SubMenuProps, MenuProps, MenuItemProps, DividerProps } from 'antd';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

import Subfield from '@rapid/libs-web/components/Subfield';
import IconFont from '@components/IconFont';
import styles from './index.module.scss';

const OpenContext = createContext(false);

interface PropMenu {
  menus: any[];
}
const PropMenu = (props: PropMenu) => {
  const {
    menus
  } = props;

  const open = useContext(OpenContext);
  if (!open) return <></>;

  return <Menu
    subMenuOpenDelay={0}
    subMenuCloseDelay={0}
    selectable={false}
    triggerSubMenuAction={'click'}
    rootClassName={combinationCName(styles.dropdownMenuRootWrapper)}
    getPopupContainer={(triggerNode) => {
      return getFirstScrollContainer(triggerNode) || document.body;
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
    items={menus.concat()}
  />
}

export interface DropdownMenuProps extends BaseProps {
  menus: any[];
}
export function DropdownMenu(props: DropdownMenuProps) {
  const {
    className,
    children,

    menus,
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
      dropdownRender={(originNode) => <PropMenu menus={menus} />}
    >
      {children}
    </Dropdown>
  </OpenContext.Provider>
}

export interface AutoDropdownMenuProps {

}
export default function AutoDropdownMenu() {

}

