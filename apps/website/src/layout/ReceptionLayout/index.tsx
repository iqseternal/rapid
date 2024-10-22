import type { FC } from 'react';
import { useEffect, useLayoutEffect, useRef, useState, useCallback, useContext, useMemo, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useOutlet, useLocation } from 'react-router-dom';
import { Subfield, SubfieldSpace, SubfieldRow } from '@/components/Subfield';
import { receptionRoutes } from '@/router/modules/reception';
import { FloatButton } from 'antd';
import { ReceptionScrollContainerContext, ReceptionHasPreposeContext, ReceptionHasPerposeHeaderClassNameContext } from '@/context';
import { classnames } from '@libs/common';
import { Provider } from 'react-redux';
import { useEventListener, useDebounceHook, useReactive, useRefresh, useOverScreenSize, useShallowReactive } from '@/hooks';
import { CSSTransition, Transition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import { MaxScreen, MaxScreenWidth, Flex, MaxScreenHeight, MaxViewHeight, combinationStyled, FullSizeWidth } from '@rapid/libs-web/styled';

import styles from './index.module.scss';
import headerStyles from './header.module.scss';

import Header from './Header';
import Footer from './Footer';

enum DIRECTION { UP, DOWN }

const ReceptionMainContainer = combinationStyled('section', FullSizeWidth, Flex);
const ReceptionSubMainContainer = combinationStyled('main', FullSizeWidth);

export default function ReceptionLayout() {
  const container = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLDivElement>(null);

  const hasPerpose = useState(false);
  const hasPerposeHeaderClassName = useState<string | undefined>(void 0);

  const [state] = useShallowReactive({
    scrollTop: 0,
    showNav: true,
    hasTransition: false,
    hasPerpose: false
  });
  const { overWidth } = useOverScreenSize();

  const cb = useCallback(useDebounceHook((curScrollTop: number) => {
    let direction: DIRECTION = DIRECTION.DOWN;
    if (state.scrollTop < curScrollTop) direction = DIRECTION.DOWN;
    else direction = DIRECTION.UP;

    if (direction === DIRECTION.UP && Math.abs(curScrollTop - state.scrollTop) >= 40) state.showNav = true;
    else if (direction === DIRECTION.DOWN && Math.abs(curScrollTop - state.scrollTop) >= 20) state.showNav = false;

    state.scrollTop = curScrollTop;
  }, 10), []);

  const containerScroll = useCallback(() => {
    if (!container.current) return;
    if (container.current.scrollTop <= 50) {
      state.showNav = true;
      state.scrollTop = container.current.scrollTop;
      return;
    }
    cb(container.current.scrollTop);
  }, []);

  useEffect(() => {
    state.scrollTop = container.current?.scrollTop ?? 0;
    // 处理 UI
    state.hasTransition = true;
  }, []);
  useEffect(() => {
    state.hasTransition = true;
  }, [state.hasPerpose]);
  useLayoutEffect(() => {
    state.hasTransition = false;

    if (overWidth) {
      state.hasPerpose = false;
      state.hasTransition = true;
      return;
    }

    if (hasPerpose[0]) state.hasPerpose = true;
    else state.hasPerpose = false;
  }, [hasPerpose[0], overWidth]);

  return <FullSizeWidth className={styles.reception} id='reception' ref={container} onScroll={containerScroll}>
    <ReceptionScrollContainerContext.Provider value={container}>
      <Header
        className={
          classnames({
            [headerStyles.receptionHeaderHidden]: !state.showNav,
            [headerStyles.receptionHeaderHasShadow]: state.scrollTop >= 50,
            [headerStyles.receptionHeaderHasTransition]: state.hasTransition,
            [headerStyles.receptionHeaderHasPerpose]: state.hasPerpose
          }, (hasPerposeHeaderClassName[0] && state.hasPerpose) ? hasPerposeHeaderClassName[0] : void 0)
        }
      />

      <ReceptionHasPreposeContext.Provider value={hasPerpose}>
        <ReceptionHasPerposeHeaderClassNameContext.Provider value={hasPerposeHeaderClassName}>
          <ReceptionMainContainer>
            <ReceptionSubMainContainer ref={main} className={
              classnames(styles.receptionBody, {
                [styles.receptionBodyHasPerpose]: state.hasPerpose
              })
            }>
              <Outlet />
            </ReceptionSubMainContainer>
          </ReceptionMainContainer>
        </ReceptionHasPerposeHeaderClassNameContext.Provider>
      </ReceptionHasPreposeContext.Provider>
      <Footer />
    </ReceptionScrollContainerContext.Provider>
  </FullSizeWidth>
}
