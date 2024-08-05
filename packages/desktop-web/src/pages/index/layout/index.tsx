import { useEffect, useLayoutEffect, useRef, useState, useCallback, useContext, useMemo, forwardRef, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useOutlet, useLocation, useOutletContext } from 'react-router-dom';
import { CSSTransition, Transition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import { MaxScreen, MaxScreenWidth, Flex, MaxScreenHeight, MaxViewHeight, combinationStyled, FullSizeWidth, FullSize } from '@rapid/libs-web/styled';
import { windowResizeAble, windowResetCustomSize, windowShow, windowRelaunch, WindowPopup } from '@/actions';
import { useFadeIn } from '@/hooks';
import { NavigationBar } from './cpts';
import { commonStyles, useAnimationClassSelector } from '@scss/common';
import { Guards } from '../router/guards';
import { useAppSelector } from '@/features';

import Header from '@components/Header';
import styles from './index.module.scss';

const MainRootContainer = combinationStyled('div', FullSize);
const MainContainer = combinationStyled('main', FullSize);

export const RootLayout = () => {
  return <FullSize className={styles.rootLayout}>
    <Outlet />
  </FullSize>
}

export const WorkbenchesLayout = Guards.AuthAuthorized((props: BaseProps) => {
  useFadeIn(async () => Promise.allSettled([
    windowResizeAble({ able: true }),
    windowResetCustomSize({ type: 'mainWindow' })
  ]));

  const location = useLocation();
  const currentOutlet = useOutlet();

  const nodeRef = useRef<HTMLDivElement>(null);

  const switchAnimation = useAnimationClassSelector(animations => animations.workbenchesRouteSwitch);

  const them = useAppSelector(state => state.theme.workbenches);

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
