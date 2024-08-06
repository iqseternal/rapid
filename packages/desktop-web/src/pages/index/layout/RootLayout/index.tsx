
import { useEffect, useLayoutEffect, useRef, useState, useCallback, useContext, useMemo, forwardRef, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useOutlet, useLocation, useOutletContext } from 'react-router-dom';
import { CSSTransition, Transition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import { MaxScreen, MaxScreenWidth, Flex, MaxScreenHeight, MaxViewHeight, combinationStyled, FullSizeWidth, FullSize } from '@rapid/libs-web/styled';
import { windowResizeAble, windowResetCustomSize, windowShow, windowRelaunch, WindowPopup } from '@/actions';
import { useFadeIn } from '@/hooks';
import { commonStyles, useAnimationClassSelector } from '@scss/common';
import { useAppSelector } from '@/features';

import Header from '@components/Header';

const MainRootContainer = combinationStyled('div', FullSize);
const MainContainer = combinationStyled('main', FullSize);

const RootLayout = () => {
  return <FullSize>
    <Outlet />
  </FullSize>
}

export default RootLayout;
