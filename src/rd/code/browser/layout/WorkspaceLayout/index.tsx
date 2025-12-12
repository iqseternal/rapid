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

  const NavigationBarLatestContent = native.metadata.useLatestMetadataInVector('ui.layout.navigation.bar.content');

  return (
    <div className='w-full h-full'>
      <Header />

      <div
        className={classnames(
          'flex justify-between flex-nowrap items-center w-full h-full',
          mainSidebarStatus === SidebarStatus.Right && 'flex-row-reverse'
        )}
        style={{
          height: `calc(100% - ${cssVars.uiCaptionBarHeight})`
        }}
      >
        {mainSidebarStatus !== SidebarStatus.None && (NavigationBarLatestContent && <NavigationBarLatestContent />)}

        <main
          className={classnames(
            'w-full h-full px-1 py-1 rounded-md overflow-x-hidden overflow-y-auto',
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
  native.metadata.useFollowMetadataInVector('ui.layout.header.icon', Logo);
  native.metadata.useFollowMetadataInVector('ui.layout.header.controller.widgets.min', WindowsMinWindowWidget);
  native.metadata.useFollowMetadataInVector('ui.layout.header.controller.widgets.reduction', WindowsReductionWindowWidget);
  native.metadata.useFollowMetadataInVector('ui.layout.header.controller.widgets.close', WindowsCloseWindowWidget);
  native.metadata.useFollowMetadataInVector('ui.layout.header.controller.widgets.others', WindowsDebugWidget);
  native.metadata.useFollowMetadataInVector('ui.layout.header.menu.content', MaintenanceMenus);
  native.metadata.useFollowMetadataInVector('ui.layout.navigation.bar.content', NavigationBar);

  useFadeInEffect(async () => {
    await Promise.allSettled([
      ipcActions.windowResizeAble({ resizeAble: true }),
      ipcActions.windowResetCustomSize({ type: 'mainWindow' })
    ]);
  }, []);

  return (
    <WorkspaceLayout />
  )
})

export default WorkspaceLayoutWrapper;
