import { useRef, memo, useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useFadeIn } from '../../libs/hooks';
import { NavigationBar } from './cpts';
import { commonStyles, useAnimationClassSelector } from '@/scss/common';
import { Guards } from '@/guards';
import { classnames, useMaintenanceStack, useResizeObserver, useShallowReactive, useZustandHijack } from '@rapid/libs-web';
import { useThemeStore } from '@/features';
import { menus } from '@/menus';
import { isUndefined } from '@rapid/libs';

import Header from '@/components/Header';
import AutoMenu from '@/components/AutoMenu';
import IconFont from '@/components/IconFont';
import Logo from '@/components/Logo';
import Widget from '@/components/Widget';
import WindowsCloseWindowWidget from '@/plats/components/WindowsCloseWindowWidget';
import WindowsDebugWidget from '@/plats/components/WindowsDebugWidget';
import WindowsMinWindowWidget from '@/plats/components/WindowsMinWindowWidget';
import WindowsReductionWindowWidget from '@/plats/components/WindowsReductionWindowWidget';

/**
 * 左侧收纳的文件菜单
 * @returns
 */
const MaintenanceMenus = memo(() => {
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

  useEffect(() => {

    return () => {
      resizeObserver.disconnect();
    }
  }, []);

  // 计算元素宽度 以及 它距离最作放的距离
  useEffect(() => {
    if (!menusContainerRef.current) return;

    let columnGap = parseInt(getComputedStyle(menusContainerRef.current).columnGap);
    if (Number.isNaN(columnGap)) columnGap = 0;

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

      const tOther = otherStack[i], ptOther = otherStack[i - 1];
      if (isUndefined(tOther)) continue;
      if (isUndefined(ptOther)) continue;

      tOther.calcWidth = ptOther.calcWidth + columnGap + tOther.sourceWidth;
    }

    statusState.isCalcDone = true;

    return () => {
      otherStack.fill(void 0);
      statusState.isCalcDone = false;
    }
  }, []);

  return (
    <div
      ref={menusContainerRef}
      className={classnames(
        'py-0.5 h-full w-full flex items-center justify-start',
        !statusState.isCalcDone && 'opacity-0'
      )}
    >
      {maintenanceStack.map((menu, index) => {
        return (
          <AutoMenu
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
        )
      })}
      {storageStack.length > 0 && (
        <AutoMenu
          menu={storageStack.map(menu => {
            return {
              key: menu.key,
              label: (
                <AutoMenu.SubMenu
                  icon={menu.icon}
                  label={menu.label}
                />
              ),
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
      )}
    </div>
  )
})

/**
 * 工作区视图隔离
 */
const WorkbenchesView = memo(() => {
  const location = useLocation();
  const nodeRef = useRef<HTMLDivElement>(null);

  const switchAnimation = useAnimationClassSelector(animations => animations.workbenchesRouteSwitch);

  return (
    <SwitchTransition mode='out-in'>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames={switchAnimation}
        appear={true}
        unmountOnExit={false}
      >
        <div
          className='w-full h-full'
          ref={nodeRef}
        >
          <Outlet />
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
})

/**
 * 工作区的布局组件, 该组件提供了整个 App 最核心的布局容器, 拥有 react-transition-group 为工作区提供切换动画的显示
 * 该工作区需要用户登录后才可以正常使用, 因此使用 Guards.AuthAuthorized 来校验用户是否已经获得了授权
 */
const WorkspaceLayout = Guards.AuthAuthorized(memo(() => {
  useFadeIn(async () => {
    await Promise.allSettled([
      ipcActions.windowResizeAble({ resizeAble: true }),
      ipcActions.windowResetCustomSize({ type: 'mainWindow' })
    ]);
  });

  const mainSidebarStatus = useThemeStore(store => store.layout.mainSidebar);

  useLayoutEffect(() => {
    rApp.metadata.defineMetadata('ui.layout.header.icon', Logo);

    rApp.metadata.defineMetadata('ui.layout.header.controller.widgets.min', WindowsMinWindowWidget);
    rApp.metadata.defineMetadata('ui.layout.header.controller.widgets.reduction', WindowsReductionWindowWidget);
    rApp.metadata.defineMetadata('ui.layout.header.controller.widgets.close', WindowsCloseWindowWidget);


    rApp.metadata.defineMetadataInVector('ui.layout.header.controller.widgets.others', WindowsDebugWidget);

    rApp.metadata.defineMetadataInVector('ui.layout.header.menu.content', MaintenanceMenus);

    return () => {
      rApp.metadata.delMetadata('ui.layout.header.icon');

      rApp.metadata.delMetadata('ui.layout.header.controller.widgets.min');
      rApp.metadata.delMetadata('ui.layout.header.controller.widgets.reduction');
      rApp.metadata.delMetadata('ui.layout.header.controller.widgets.close');


      rApp.metadata.delMetadataInVector('ui.layout.header.controller.widgets.others', WindowsDebugWidget);


      rApp.metadata.delMetadataInVector('ui.layout.header.menu.content', MaintenanceMenus);
    }
  }, []);

  return (
    <div className='w-full h-full'>
      <Header />

      <div
        className={classnames(
          'flex justify-between flex-nowrap items-center w-full h-full',
          mainSidebarStatus === 'right' && 'flex-row-reverse'
        )}
        style={{
          height: `calc(100% - ${cssVars.captionBarHeight})`,
        }}
      >
        {mainSidebarStatus !== 'none' && <NavigationBar />}

        <main
          className={classnames(
            'w-full h-full pl-1 py-1 rounded-md overflow-x-hidden overflow-y-auto',
            commonStyles.beautifulBar
          )}
        >
          <WorkbenchesView />
        </main>
      </div>
    </div>
  )
}));

export default WorkspaceLayout;
