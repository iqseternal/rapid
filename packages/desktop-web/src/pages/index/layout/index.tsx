import {useEffect, useLayoutEffect, useRef, useState, useCallback, useContext, useMemo, forwardRef, FC} from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useOutlet, useLocation, useOutletContext } from 'react-router-dom';
import { CSSTransition, Transition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import { MaxScreen, MaxScreenWidth, AppAdapter, MaxScreenHeight, MaxViewHeight, combinationStyled, FullSizeWidth, FullSize } from '@rapid/libs-web/styled';
import { windowResizeAble, windowResetCustomSize, windowShow, windowRelaunch, WindowPopup } from '@/actions';
import { useFadeIn } from '@/hooks';
import { NavigationBar } from './cpts';
import { commonStyles, useAnimationClassSelector } from '@scss/common';

import Header from '@components/Header';
import styles from './index.module.scss';

const MainRootContainer = combinationStyled('div', FullSize);
const MainContainer = combinationStyled('main', FullSize);

export const RootLayout = () => {
  const location = useLocation();

  const nodeRef = useRef<HTMLDivElement>(null);

  const currentOutlet = useOutlet();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  });

  return <FullSize className={styles.rootLayout}>
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      timeout={500}
      appear={true}
      unmountOnExit={false}
    >
      <FullSize ref={nodeRef}>{currentOutlet}</FullSize>
    </CSSTransition>
  </FullSize>
}

export const RapidLayout = () => {
  useFadeIn(async () => {
    await windowResizeAble({ able: true });
    await windowResetCustomSize({ type: 'mainWindow' });
  });

  const location = useLocation();
  const currentOutlet = useOutlet();

  const nodeRef = useRef<HTMLDivElement>(null);

  const switchAnimation = useAnimationClassSelector(animations => animations.workbenchesRouteSwitch, []);

  return <FullSize
    className={styles.rapidLayout}
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
            timeout={500}
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
}
