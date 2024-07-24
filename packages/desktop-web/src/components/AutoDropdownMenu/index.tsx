import { combinationCName } from '@rapid/libs-web/common';
import { useEventListener, useShallowReactive, useThrottleHook } from '@rapid/libs-web/hooks';
import { getFirstScrollContainer } from '@rapid/libs-web/common';
import { Dropdown, Menu } from 'antd';
import type { DropDownProps } from 'antd';
import { createContext, useContext } from 'react';
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
    onBlurCapture={() => {

    }}
    onSelect={(info) => {

    }}
    items={menus.concat()}
  />
}

export interface AutoDropdownMenuProps extends BaseProps {
  menu: AntdMenuInstance;
  attrs?: DropDownProps;
}
export default function AutoDropdownMenu(props: AutoDropdownMenuProps) {
  const {
    className, children,

    menu,

    attrs = {}
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
      open={state.open}
      arrow={false}
      trigger={attrs.trigger ?? ['click']}
      rootClassName={combinationCName(
        className,
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
    >
      <MaxContent>
        {children ? children : menu.label}
      </MaxContent>
    </Dropdown>
  </OpenContext.Provider>
}

