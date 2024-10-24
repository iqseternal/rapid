import { classnames } from '@rapid/libs-web/common';
import { windowClose, windowDevtool, windowMin, windowOpen, windowReduction, windowRelaunch } from '@/actions';
import { Subfield, SubfieldFixed } from '@rapid/libs-web/components/Subfield';
import { IS_BROWSER, IS_DEV } from '@rapid/config/constants';
import { useMemo, ReactNode, useEffect, useRef, useCallback, memo } from 'react';
import { menus } from '@/menus';
import { FlexRowStart, FullSizeWidth, MaxContent, useEventListener, useMaintenanceStack, useReactive, useResizeObserver, useShallowReactive, useZustandHijack } from '@rapid/libs-web';
import { isDef, isUnDef, isUndefined, randomRegionForInt } from '@suey/pkg-utils';
import { Menu, Input } from 'antd';
import type { AntdItemType, AntdMenuInstance, AntdSubMenuType } from '@components/AutoDropdownMenu';
import { retrieveRoutes } from '@/router';

import Widget from '@components/Widget';
import AutoDropdownMenu from '@components/AutoDropdownMenu';
import IconFont from '@components/IconFont';
import Logo from '@components/Logo';

import commonStyles from '@scss/common/index.module.scss';
import styles from './index.module.scss';

export interface MaintenanceMenusProps {
  isDialog: boolean;
  isPane: boolean;
}

/**
 * 左侧收纳的文件菜单
 * @returns
 */
export const MaintenanceMenus = memo((props: MaintenanceMenusProps) => {
  const { isDialog = false, isPane = false } = props;

  const headerFileMenu = useZustandHijack(menus.headerFileMenu);
  const headerEditMenu = useZustandHijack(menus.headerEditMenu);
  const headerViewMenu = useZustandHijack(menus.headerViewMenu);
  const headerHelpMenu = useZustandHijack(menus.headerHelpMenu);

  // 菜单
  const { maintenanceStack, storageStack, otherStack, pushMaintenanceStack, popMaintenanceStack } = useMaintenanceStack({
    maintenanceStack: [
      headerFileMenu, headerEditMenu, headerViewMenu, headerHelpMenu
    ],
    otherStack: [] as ({ sourceWidth: number;calcWidth: number; } | undefined)[],
  });
  // 菜单容器
  const menusContainerRef = useRef<HTMLDivElement>(null);

  //
  const [statusState] = useShallowReactive({
    isCalcDone: false
  })

  // resizeObserver
  const [resizeObserver] = useResizeObserver(menusContainerRef, () => {
    if (isDialog || isPane) return;

    const menusContainer = menusContainerRef.current;
    if (!menusContainer) return;

    // 什么条件添加到展示栈中
    pushMaintenanceStack((menu, other, index) => {
      if (!other) return false;
      return menusContainer.clientWidth >= other.calcWidth;
    });

    popMaintenanceStack((menu, other, index) => {
      if (!other) return false;
      return menusContainer.clientWidth < other.calcWidth;
    });
  });

  // 计算元素宽度 以及 它距离最作放的距离
  useEffect(() => {
    if (!menusContainerRef.current) return;

    let columnGap = parseInt(getComputedStyle(menusContainerRef.current).columnGap);
    if (isNaN(columnGap)) columnGap = 0;

    for (let i = 0;i < maintenanceStack.length && i < menusContainerRef.current.children.length;i ++) {
      const child = menusContainerRef.current.children[i];
      if (!(child instanceof HTMLElement)) continue;
      if (!otherStack[i]) otherStack[i] = { sourceWidth: child.clientWidth, calcWidth: 0 };
    }
    if (otherStack.length) {
      if (otherStack[0]) otherStack[0].calcWidth = otherStack[0].sourceWidth + 50;
    }

    for (let i = 1;i < maintenanceStack.length && i < menusContainerRef.current.children.length;i ++) {
      if (otherStack.length === 0) continue;

      if (isUndefined(otherStack)) continue;
      if (isUndefined(otherStack?.[i])) continue;
      if (isUndefined(otherStack?.[i - 1])) continue;

      otherStack[i]!.calcWidth = otherStack[i - 1]!.calcWidth + columnGap + otherStack[i]!.sourceWidth;
    }

    statusState.isCalcDone = true;

    return () => {
      otherStack.fill(void 0);
      statusState.isCalcDone = false;
    }
  }, [isDialog, isPane]);

  // 如果变成弹窗直接关闭所有监听
  useEffect(() => {
    if (isDialog || isPane) resizeObserver.disconnect();
  }, [isDialog, isPane]);

  return <FlexRowStart
    ref={menusContainerRef}
    className={classnames(
      {
        [commonStyles.transparent]: !statusState.isCalcDone
      }
    )}
  >
    {!isDialog && !isPane && maintenanceStack.map(menu => {
      return <AutoDropdownMenu
        key={`menu.key ${randomRegionForInt(0, 1112023)}`}
        menu={menu}
        className={commonStyles.appRegionNo}
      />
    })}
    {storageStack.length > 0 &&
      <AutoDropdownMenu
        menu={{ label: 'header-storage-stack', key: 'header-storage-stack', children: storageStack }}
        className={commonStyles.appRegionNo}
      >
        <IconFont icon='MenuOutlined' />
      </AutoDropdownMenu>
    }
  </FlexRowStart>
})

export interface HeaderProps extends Omit<BaseProps, 'children'> {
  // 是否是一个面板
  isPane?: boolean;
  // 是否是一个弹窗
  isDialog?: boolean;

  slots?: {
    menu?: ReactNode;
  }
}

/**
 * 标题栏
 */
export const Header = memo((props: HeaderProps) => {
  const {
    isDialog = false,
    isPane = false,

    slots = {},

    className
  } = props;


  return <Subfield
    className={classnames(
      styles.header,
      commonStyles.appRegion,
      className,
      props.className
    )}
  >

    <Subfield
      className={classnames(styles.menuContainer)}
    >
      <SubfieldFixed
        className={styles.logo}
      >
        <Logo />
      </SubfieldFixed>

      <MaxContent
        className={classnames(
          styles.menu,
          commonStyles.userSelectNone
        )}
      >
        {!(isDialog && isDialog) ? <MaintenanceMenus isDialog={isDialog} isPane={isPane} /> : <></>}
      </MaxContent>

      <SubfieldFixed
        className={classnames(
          styles.history,
          commonStyles.appRegionNo
        )}
      >
        {!(isDialog || isPane) && <Widget icon='HistoryOutlined' />}
      </SubfieldFixed>
    </Subfield>

    <Subfield
      className={classnames(
        styles.functionContainer,
        commonStyles.appRegionNo
      )}
    >
      {!(isDialog || isPane) && <>
        <Input
          className={styles.searchInput}
          placeholder='Ctrl+K'
        />
      </>}
    </Subfield>

    <Subfield
      className={styles.operatorContainer}
    >
      <div />
      <div />

      <SubfieldFixed
        className={commonStyles.appRegionNo}
        gap={1}
      >
        {!IS_BROWSER &&
          <>
            {!(isDialog && isPane) && <>
              <Widget
                icon='SettingOutlined'
                tipText='设置'
                onClick={() => {

                }}
              />
            </>}

            {!IS_BROWSER && <Widget icon='BugOutlined' tipText='开发者工具' onClick={() => windowDevtool(true, { mode: 'detach' })} />}
            <Widget icon='LineOutlined' tipText='最小化' onClick={() => windowMin()} />
            {!isDialog && !isPane && <Widget icon='BorderOutlined' tipText='还原' onClick={() => windowReduction()} />}
            <Widget
              icon='CloseOutlined'
              tipText='关闭'
              tipAttrs={{
                placement: 'leftBottom'
              }}
              onClick={() => windowClose()}
            />
          </>
        }
      </SubfieldFixed>
    </Subfield>
  </Subfield>
});

export default Header;
