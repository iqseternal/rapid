import { isDef, isUnDef } from '@suey/pkg-utils';
import type { FC, EffectCallback, DependencyList } from 'react';
import { useEffect, useLayoutEffect, useRef, useState, useCallback, useContext, useMemo, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useOutlet, useLocation } from 'react-router-dom';
import { FloatButton } from 'antd';
import { Provider } from 'react-redux';
import { CSSTransition, Transition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import { MaxScreen, MaxScreenWidth, AppAdapter, MaxScreenHeight, MaxViewHeight, combinationStyled, FullSizeWidth } from '@/styled';
import { windowResizeAble, windowResetCustomSize, windowShow, windowRelaunch, WindowPopup } from '@/actions';
import { IS_WEB, CONFIG } from '@rapid/config/constants';
import { useFadeIn } from '@hooks/index';
import Header from '@components/Header';

const ReceptionMainContainer = combinationStyled('section', FullSizeWidth);
const ReceptionSubMainContainer = combinationStyled('main', FullSizeWidth);

export default function Layout() {
  useFadeIn(async () => {
    await windowResizeAble({ able: true });
    await windowResetCustomSize({ type: 'mainWindow' });
  });

  return <FullSizeWidth>
    <Header />


    <ReceptionMainContainer>

      <Outlet />

    </ReceptionMainContainer>
  </FullSizeWidth>
}
