import { useRef, memo, useLayoutEffect, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useFadeInEffect } from '@/libs/hooks';
import { NavigationBar } from './plats/NavigationBar';
import { commonStyles } from '@/scss/common';
import { classnames } from '@rapid/libs-web';
import { SidebarStatus, useThemeStore } from '@/features';
import { MaintenanceMenus } from './plats/MaintenanceMenus';
import { workbenchesRouteSwitchTransitionClassNames } from './definition';

import Header from '@/components/Header';
import Logo from '@/components/Logo';
import WindowsCloseWindowWidget from '@/plats/components/WindowsCloseWindowWidget';
import WindowsDebugWidget from '@/plats/components/WindowsDebugWidget';
import WindowsMinWindowWidget from '@/plats/components/WindowsMinWindowWidget';
import WindowsReductionWindowWidget from '@/plats/components/WindowsReductionWindowWidget';

/**
 * 工作区视图隔离
 */
const WorkbenchesView = memo(() => {
  const location = useLocation();
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <SwitchTransition mode='out-in'>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames={workbenchesRouteSwitchTransitionClassNames}
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
 */
const WorkspaceLayout = memo(() => {
  const mainSidebarStatus = useThemeStore(store => store.layout.mainSidebar);

  const NavigationBarLatestContent = rApp.metadata.useLatestMetadataInVector('ui.layout.navigation.bar.content');

  return (
    <div className='w-full h-full'>
      <Header />

      <div
        className={classnames(
          'flex justify-between flex-nowrap items-center w-full h-full',
          mainSidebarStatus === SidebarStatus.Right && 'flex-row-reverse'
        )}
        style={{
          height: `calc(100% - ${cssVars.uiCaptionBarHeight})`,
        }}
      >
        {mainSidebarStatus !== SidebarStatus.None && (NavigationBarLatestContent && <NavigationBarLatestContent />)}

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
})

const WorkspaceLayoutWrapper = memo(() => {

  useFadeInEffect(async () => {
    await Promise.allSettled([
      ipcActions.windowResizeAble({ resizeAble: true }),
      ipcActions.windowResetCustomSize({ type: 'mainWindow' })
    ]);
  }, []);

  useLayoutEffect(() => {
    const dmCallbacks = [
      rApp.metadata.defineMetadataInVector('ui.layout.header.icon', Logo),

      rApp.metadata.defineMetadataInVector('ui.layout.header.controller.widgets.min', WindowsMinWindowWidget),
      rApp.metadata.defineMetadataInVector('ui.layout.header.controller.widgets.reduction', WindowsReductionWindowWidget),
      rApp.metadata.defineMetadataInVector('ui.layout.header.controller.widgets.close', WindowsCloseWindowWidget),

      rApp.metadata.defineMetadataInVector('ui.layout.header.controller.widgets.others', WindowsDebugWidget),
      rApp.metadata.defineMetadataInVector('ui.layout.header.menu.content', MaintenanceMenus),

      rApp.metadata.defineMetadataInVector('ui.layout.navigation.bar.content', NavigationBar),
    ];

    return () => {
      dmCallbacks.forEach(callback => callback());
    }
  }, []);

  return (
    <WorkspaceLayout />
  )
})

export default WorkspaceLayoutWrapper;
