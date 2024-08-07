import { useEffect, useLayoutEffect, useRef, useState, useCallback, useContext, useMemo, forwardRef, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useOutlet, useLocation, useOutletContext } from 'react-router-dom';
import { CSSTransition, Transition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import { MaxScreen, MaxScreenWidth, Flex, MaxScreenHeight, MaxViewHeight, combinationStyled, FullSizeWidth, FullSize } from '@rapid/libs-web/styled';
import { windowResizeAble, windowResetCustomSize, windowShow, windowRelaunch, WindowPopup } from '@/actions';
import { useFadeIn } from '@/hooks';
import { NavigationBar } from './cpts.tsx';
import { commonStyles, useAnimationClassSelector } from '@scss/common';
import { Guards } from '@router/guards';

import Header from '@components/Header';
import styles from './index.module.scss';

const MainRootContainer = combinationStyled('div', FullSize);
const MainContainer = combinationStyled('main', FullSize);

/**
 * 工作区的布局组件, 该组件提供了整个 App 最核心的布局容器, 拥有 react-transition-group 为工作区提供切换动画的显示
 * 该工作区需要用户登录后才可以正常使用, 因此使用 Guards.AuthAuthorized 来校验用户是否已经获得了授权
 */
const WorkspaceLayout = Guards.AuthAuthorized(() => {
  useFadeIn(async () => Promise.allSettled([
    windowResizeAble({ able: true }),
    windowResetCustomSize({ type: 'mainWindow' })
  ]));

  const location = useLocation();
  const currentOutlet = useOutlet();

  const nodeRef = useRef<HTMLDivElement>(null);

  const switchAnimation = useAnimationClassSelector(animations => animations.workbenchesRouteSwitch);

  return <FullSize
    className={styles.workbenchesLayout}
  >
    <Header />

    <MainRootContainer
      className={styles.mainRootContainer}
    >
      <NavigationBar />

      <MainContainer
        className={styles.mainContainer}
      >
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
              {currentOutlet}
            </FullSize>
          </CSSTransition>
        </SwitchTransition>
      </MainContainer>
    </MainRootContainer>
  </FullSize>
});


export default WorkspaceLayout;
