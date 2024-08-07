import { combinationCName } from '@rapid/libs-web/common';
import { useEventListener, useReactive, useThrottleHook } from '@rapid/libs-web/hooks';
import { getFirstScrollContainer } from '@rapid/libs-web/common';
import { Dropdown, Menu } from 'antd';
import type { DropDownProps } from 'antd';
import {createContext, useContext, ReactNode} from 'react';
import type { MenuInstance } from '@/menus/framework';
import { MaxContent } from '@rapid/libs-web/styled';

import commonStyles from '@scss/common/index.module.scss';
import type { AntdMenuInstance, AntdItemType } from '@/menus/framework';
import styles from './index.module.scss';

const OpenContext = createContext(false);

interface PropMenu {
  menus: AntdItemType[];
}
const PropMenu = (props: PropMenu) => {
  const {
    menus
  } = props;

  const open = useContext(OpenContext);

  return <Menu
    subMenuOpenDelay={0}
    subMenuCloseDelay={0}
    selectable={false}
    triggerSubMenuAction={'click'}
    rootClassName={combinationCName(
      styles.dropdownMenuRootWrapper,
      {
        [commonStyles.hidden]: !open
      }
    )}
    getPopupContainer={(triggerNode) => {
      return document.body;
    }}
    defaultOpenKeys={[]}
    onOpenChange={(openKeys) => {

    }}
    onClick={(info) => {

    }}
    onDoubleClick={(e) => {
      e.preventDefault();
    }}
    onDoubleClickCapture={(e) => {
      e.preventDefault();
    }}
    onBlurCapture={() => {

    }}
    onSelect={(info) => {

    }}
    items={menus.concat()}
  />
}

export interface AutoDropdownMenuProps  {
  menu: AntdMenuInstance;
  attrs?: DropDownProps;

  slots?: {
    menu?: ReactNode;
  }
}
export default function AutoDropdownMenu(props: AutoDropdownMenuProps) {
  const {
    menu,
    slots = {},

    attrs = {}
  } = props;

  const [state] = useReactive({
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
      open={state.open}
      arrow={false}
      trigger={attrs.trigger ?? ['click']}
      rootClassName={combinationCName(
        styles.dropdownMenuRootWrapper
      )}
      autoAdjustOverflow
      mouseEnterDelay={0}
      mouseLeaveDelay={0}
      destroyPopupOnHide={false}
      getPopupContainer={(triggerNode) => getFirstScrollContainer(triggerNode) || document.body}
      onOpenChange={(value, info) => {
        state.open = value;
      }}
      dropdownRender={(originNode) => <PropMenu menus={menu.children} />}
      {...attrs}
    >
      {slots.menu
        ? slots.menu
        : <MaxContent
            className={combinationCName(styles.menuItem)}
          >
            {menu.label}
          </MaxContent>
      }
    </Dropdown>
  </OpenContext.Provider>
}
