import { combinationCName , getFirstScrollContainer } from '@rapid/libs-web/common';
import { useEventListener, useReactive, useThrottleHook } from '@rapid/libs-web/hooks';

import { Dropdown, Menu } from 'antd';
import type { DropDownProps } from 'antd';
import { createContext, useContext, ReactNode } from 'react';
import { MaxContent } from '@rapid/libs-web/styled';
import type { MenuInstance, AntdMenuInstance, AntdItemType } from './declare';

import commonStyles from '@scss/common/index.module.scss';
import styles from './index.module.scss';

export * from './cpts';
export * from './declare';

const OpenContext = createContext(false);

interface PropMenuProps {
  menus: AntdItemType[];
}

/**
 * 弹出的浮动菜单的列表渲染, 服务于 AutoDropdownMenu 组件
 */
const PropMenu = (props: PropMenuProps) => {
  const {
    menus
  } = props;

  // 这里使用上下文的原因为 ant, Dropdown 组件的 dropdownRender 函数只会调用一次
  // 如果希望能够自定义打开和关闭的状态, 那么就需要利用上下文的强制重新渲染特性
  const open = useContext(OpenContext);

  return <Menu
    subMenuOpenDelay={0}
    subMenuCloseDelay={0}
    selectable={false}
    triggerSubMenuAction={'click'}
    rootClassName={combinationCName(
      styles.dropdownMenuRootWrapper,
      {
        // 处理菜单在某些时刻不隐藏的 BUG, 此 BUG 出自 Antd
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

export interface AutoDropdownMenuProps extends BaseProps {
  /** 渲染的菜单实例 */
  menu: AntdMenuInstance;
  /** 给 dropdown 附加的属性参数 */
  attrs?: DropDownProps;
}

/**
 * 自动渲染菜单的组件, 该菜单为 contextMenu 或者文件菜单
 *
 */
export default function AutoDropdownMenu(props: AutoDropdownMenuProps) {
  const {
    menu,
    attrs = {},

    className,
    children
  } = props;

  const [state] = useReactive({
    open: false
  });

  // 当窗口发生大小或者滚动事件的时候, 关闭菜单的显示
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
        styles.dropdownMenuRootWrapper,
        className
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
      {children
        ? children
        : <MaxContent
            className={styles.menuItem}
          >
            {menu.label}
          </MaxContent>
      }
    </Dropdown>
  </OpenContext.Provider>
}

