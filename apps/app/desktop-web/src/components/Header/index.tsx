import { classnames, isReactFC } from '@rapid/libs-web/common';
import { Subfield } from '@rapid/libs-web/components';
import { ReactNode, useEffect, useRef, memo, useState, useMemo, CSSProperties, isValidElement, type ReactElement } from 'react';
import { menus } from '@/menus';
import { FlexRowStart, useAsyncLayoutEffect, useMaintenanceStack, useRefresh, useResizeObserver, useShallowReactive, useWindowInnerSize, useZustandHijack } from '@rapid/libs-web';
import { isFunction, isUndefined, toNil } from '@rapid/libs';
import { commonStyles } from '@scss/common';

import Widget from '@components/Widget';
import AutoMenu from '../AutoMenu';
import IconFont from '@components/IconFont';
import Logo from '@components/Logo';
import { cssVars } from '../../skin';

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
    otherStack: [] as ({ sourceWidth: number; calcWidth: number; } | undefined)[],
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
    pushMaintenanceStack((_, other) => {
      if (!other) return false;
      return menusContainer.clientWidth >= other.calcWidth;
    });

    popMaintenanceStack((_, other) => {
      if (!other) return false;
      return menusContainer.clientWidth < other.calcWidth;
    });
  }, []);

  // 计算元素宽度 以及 它距离最作放的距离
  useEffect(() => {
    if (!menusContainerRef.current) return;

    let columnGap = parseInt(getComputedStyle(menusContainerRef.current).columnGap);
    if (isNaN(columnGap)) columnGap = 0;

    for (let i = 0; i < maintenanceStack.length && i < menusContainerRef.current.children.length; i++) {
      const child = menusContainerRef.current.children[i];
      if (!(child instanceof HTMLElement)) continue;
      if (!otherStack[i]) otherStack[i] = { sourceWidth: child.clientWidth, calcWidth: 0 };
    }
    if (otherStack.length) {
      if (otherStack[0]) otherStack[0].calcWidth = otherStack[0].sourceWidth + 50;
    }

    for (let i = 1; i < maintenanceStack.length && i < menusContainerRef.current.children.length; i++) {
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
    if (isDialog || isPane) {
      resizeObserver.disconnect();
    }
  }, [isDialog, isPane]);

  return (
    <FlexRowStart
      ref={menusContainerRef}
      className={classnames(
        'py-0.5 h-full',
        !statusState.isCalcDone && 'opacity-0'
      )}
    >
      {!isDialog && !isPane && maintenanceStack.map((menu, index) => {
        return <AutoMenu
          key={`menu.key ${index}`}
          menu={menu.children}
          dropdownAttrs={{
            className: 'h-full'
          }}
        >
          <div
            className={classnames(
              commonStyles.appRegionNo,
              'px-2 h-full rounded-md overflow-hidden hover:bg-gray-200 flex items-center'
            )}
          >
            {menu.label}
          </div>
        </AutoMenu>
      })}
      {storageStack.length > 0 &&
        <AutoMenu
          menu={storageStack.map(menu => {
            return {
              key: menu.key,
              label: <AutoMenu.SubMenu
                icon={menu.icon}
                label={menu.label}
              />,
              children: menu.children
            }
          })}
          dropdownAttrs={{
            className: 'h-full'
          }}
        >
          <div
            className={classnames(
              commonStyles.appRegionNo,
              'px-2 h-full rounded-md overflow-hidden hover:bg-gray-200 flex items-center'
            )}
          >
            <IconFont
              icon='MenuOutlined'
              className={classnames(
                commonStyles.appRegionNo
              )}
            />
          </div>
        </AutoMenu>
      }
    </FlexRowStart>
  )
})

export interface ControlProps {
  // 是否是一个面板
  isPane?: boolean;

  // 是否是一个弹窗
  isDialog?: boolean;
}

export const Control = memo((props: ControlProps) => {
  const { isDialog = false, isPane = false, } = props;

  const refresh = useRefresh();

  const [windowInnerSize] = useWindowInnerSize();
  const [normalState] = useState({
    workAreaSize: {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  })

  const isFullSize = windowInnerSize.innerWidth === normalState.workAreaSize.width && windowInnerSize.innerHeight === normalState.workAreaSize.height;

  useAsyncLayoutEffect(async () => {
    const [err, res] = await toNil(window.ipcActions.windowWorkAreaSize());
    if (err) return;

    normalState.workAreaSize = res;
    refresh();
  }, []);

  return (
    <Subfield.SubfieldFixed
      className={commonStyles.appRegionNo}
      gap={[3]}
    >
      <Widget
        icon='BugOutlined'
        tipText='开发者工具'
        onClick={() => ipcActions.windowDevtool(true, { mode: 'detach' })}
      />

      <Widget
        icon='LineOutlined'
        tipText='最小化'
        onClick={() => ipcActions.windowMin()}
      />

      {(!isDialog && !isPane) && <>
        <Widget
          icon={isFullSize ? 'SwitcherOutlined' : 'BorderOutlined'}
          tipText='还原'
          onClick={() => ipcActions.windowReduction()}
        />

      </>}

      <Widget
        icon='CloseOutlined'
        tipText='关闭'
        tipAttrs={{
          placement: 'leftBottom'
        }}
        onClick={() => ipcActions.windowClose()}
      />
    </Subfield.SubfieldFixed>
  )
})

export interface HeadSlotRenderTypeProps {
  isPane?: boolean;
  isDialog?: boolean;
}

export type HeadSlotRenderType = (props: HeadSlotRenderTypeProps) => ReactNode;

export interface HeaderProps {
  /**
   * 是否是一个面板, 例如设置 (不可全屏
   */
  isPane?: boolean;

  /**
   * 是否是一个弹窗, like window.alert
   */
  isDialog?: boolean;


  logoRender?: ReactNode | HeadSlotRenderType;

  menuRender?: ReactNode | HeadSlotRenderType;

  titleRender?: ReactNode | HeadSlotRenderType;

  functionalRender?: ReactNode | HeadSlotRenderType;

  className?: string;
  style?: CSSProperties;
}

/**
 * 标题栏
 */
export const Header = memo((props: HeaderProps) => {
  const {
    isDialog = false,
    isPane = false,

    className,
    style,

    logoRender,
    menuRender,
    functionalRender
  } = props;

  const LogoNode = ((): ReactNode => {
    if (logoRender) {
      if (isFunction(logoRender)) {
        const LogRender = logoRender;
        return (
          <LogRender
            isDialog={isDialog}
            isPane={isPane}
          />
        )
      }

      return logoRender;
    }

    return (
      <Logo
        className='flex-none h-full'
        style={{
          width: cssVars.navigationBarWidth,
          margin: `0 calc(${cssVars.navigationBarWidth} * 0.1)`
        }}
      />
    )
  })();

  const menuNode = ((): ReactNode => {
    if (isPane || isDialog) return <></>;
    if (menuRender) {
      if (isFunction(menuRender)) {
        const MenuRender = menuRender;
        return (
          <MenuRender
            isDialog={isDialog}
            isPane={isPane}
          />
        )
      }

      return menuRender;
    }

    return (
      <MaintenanceMenus
        isDialog={isDialog}
        isPane={isPane}
      />
    )
  })();

  const functionalNode = ((): ReactNode => {
    if (functionalRender) {
      if (isFunction(functionalRender)) {
        const FunctionalRender = functionalRender;
        return (
          <FunctionalRender
            isDialog={isDialog}
            isPane={isPane}
          />
        )
      }

      return functionalRender;
    }

    return (
      <>
        <div />
        <div />
        <Control
          isPane={isPane}
          isDialog={isDialog}
        />
      </>
    )
  })();

  return <Subfield
    className={classnames('w-full text-sm', commonStyles.appRegion, className)}
    // style={style}
    style={{
      backgroundColor: cssVars.captionBarBackgroundColor
    }}
  >
    <Subfield
      className='w-full h-full z-50'
    >
      {LogoNode}

      <div
        className={'cursor-default w-max h-full flex-auto max-w-full overflow-hidden select-none'}
      >
        {menuNode}
      </div>

      <Subfield.Auto />
    </Subfield>

    <div />

    <Subfield
      className='mr-1 flex-auto min-w-max'
    >
      {functionalNode}
    </Subfield>
  </Subfield>
});

export default Header;
