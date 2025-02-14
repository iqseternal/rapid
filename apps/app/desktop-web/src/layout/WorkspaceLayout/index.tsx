import { useRef, memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { FullSize } from '@rapid/libs-web/styled';
import { useFadeIn } from '../../libs/hooks';
import { NavigationBar } from './cpts';
import { useAnimationClassSelector } from '@scss/common';
import { Guards } from '@/guards';
import { classnames } from '@rapid/libs-web';
import { useThemeStore } from '@/features';

import Header from '@components/Header';

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
        <FullSize ref={nodeRef}>
          <Outlet />
        </FullSize>
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

  return (
    <FullSize>
      <Header />

      <FullSize
        className={classnames(
          'flex justify-between flex-nowrap items-center',
          mainSidebarStatus === 'right' && 'flex-row-reverse'
        )}
        style={{
          height: `calc(100% - ${cssVars.captionBarHeight})`,
        }}
      >
        {mainSidebarStatus !== 'none' && <NavigationBar />}

        <main
          className='w-full h-full px-1 py-1 rounded-md overflow-x-hidden overflow-y-auto'
        >
          <WorkbenchesView />
        </main>
      </FullSize>
    </FullSize>
  )
}));

export default WorkspaceLayout;
