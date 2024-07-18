import { useAppSelector } from '@/features';
import { FullSize, FlexRowCenter } from '@/styled';
import {combinationCName} from '@rapid/libs-web/common';
import {useWindowScreenSize, useWindowInnerSize} from '@rapid/libs-web/hooks';
import {NumberFilters} from '@rapid/libs/formatter';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useFadeIn, useFadeOut } from '@/hooks';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { windowDevtool, windowResizeAble, windowSetPosition, windowSetSize } from '@/actions';
import { useAsyncEffect, useReactive } from '@rapid/libs-web/hooks';
import { rapidRoute } from '@pages/index/router';
import { Button } from 'antd';
import { Transition, CSSTransition } from 'react-transition-group';
import { toPicket } from '@rapid/libs/common';

import lockUrl from '@/assets/images/login__lock.png?url';
import Header from '@components/Header';
import Subfield from '@rapid/libs-web/components/Subfield';
import Logo from '@components/Logo';
import styles from './index.module.scss';

enum Step {
  Login, Register
}

export default function Login() {
  useFadeIn(async () => {
    await windowSetSize({ width: 850, height: 550 });
    await windowResizeAble({ able: false });
    // await windowSetPosition({ x: 'center', y: 'center' });
  });

  const navigate = useNavigate();
  const userStore = useAppSelector(store => store.user);

  const [state] = useReactive({
    step: Step.Login
  })

  return <FullSize className={styles.login}>
    <Header isPane />

    <Subfield className={styles.didContent}>
      {state.step === Step.Login
        ?
          <>
            <FlexRowCenter>
              <CSSTransition classNames={'fade'} in={true} timeout={150}>
                <Logo src={lockUrl} />
              </CSSTransition>
            </FlexRowCenter>

            <FlexRowCenter>
              3
              <Button onClick={() => useFadeOut(() => navigate(rapidRoute.meta.fullPath, { replace: true }))}>登录</Button>
            </FlexRowCenter>
          </>
        :
          <>
            <FlexRowCenter>
              <Logo src={lockUrl} />
            </FlexRowCenter>

            <FlexRowCenter>
              2
            </FlexRowCenter>
          </>
      }
    </Subfield>
  </FullSize>
}
