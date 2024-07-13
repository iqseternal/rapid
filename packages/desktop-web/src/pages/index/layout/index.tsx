import { isDef, isUnDef } from '@suey/pkg-utils';
import type { FC, EffectCallback, DependencyList } from 'react';
import { useEffect, useLayoutEffect, useRef, useState, useCallback, useContext, useMemo, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useOutlet, useLocation, useOutletContext } from 'react-router-dom';
import { FloatButton } from 'antd';
import { Provider } from 'react-redux';
import { CSSTransition, Transition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import { MaxScreen, MaxScreenWidth, AppAdapter, MaxScreenHeight, MaxViewHeight, combinationStyled, FullSizeWidth, FullSize } from '@/styled';
import { windowResizeAble, windowResetCustomSize, windowShow, windowRelaunch, WindowPopup } from '@/actions';
import { IS_WEB, CONFIG } from '@rapid/config/constants';
import { useFadeIn } from '@/hooks';
import { makeVar, themeCssVarsSheet } from '@/themes';
import { combinationCName } from '@rapid/libs-web/common';

import Header from '@components/Header';
import styles from './index.module.scss';

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
      classNames={'fade'}
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

  return <FullSize
    className={styles.rapidLayout}
  >
    <Header />

    <MainContainer className={styles.mainContainer}>
      <SwitchTransition>
        <CSSTransition
          key={'G'}
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
          classNames={'fade'}
        >
          <Outlet />
        </CSSTransition>
      </SwitchTransition>
    </MainContainer>
  </FullSize>
}
