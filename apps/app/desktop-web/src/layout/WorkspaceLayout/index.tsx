import { useEffect, useLayoutEffect, useRef, useState, useCallback, useContext, useMemo, forwardRef, FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useOutlet, useLocation, useOutletContext } from 'react-router-dom';
import { CSSTransition, Transition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import { MaxScreen, MaxScreenWidth, Flex, MaxScreenHeight, MaxViewHeight, combinationStyled, FullSizeWidth, FullSize } from '@rapid/libs-web/styled';
import { useFadeIn } from '../../libs/hooks';
import { NavigationBar } from './cpts';
import { commonStyles, useAnimationClassSelector } from '@scss/common';
import { Guards } from '@router/guards';
import { classnames } from '@rapid/libs-web';
import { useThemeStore } from '@/features';

import Header from '@components/Header';
import styles from './index.module.scss';
import IconFont from '@components/IconFont';

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
      window.ipcActions.windowResizeAble({ resizeAble: true }),
      window.ipcActions.windowResetCustomSize({ type: 'mainWindow' })
    ]);
  });

  const mainSidebarStatus = useThemeStore(store => store.layout.mainSidebar);

  return <FullSize
    className={classnames(
      styles.workbenchesLayout
    )}
  >
    <Header />

    <FullSize
      className={classnames(
        styles.mainRootContainer,
        mainSidebarStatus === 'right' && commonStyles.flexRowReverse
      )}
    >
      {mainSidebarStatus !== 'none' && <NavigationBar />}

      <main
        className={classnames(
          styles.mainContainer,
        )}
      >
        <WorkbenchesView />
      </main>
    </FullSize>
  </FullSize>
}));

export default WorkspaceLayout;
