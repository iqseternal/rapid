import { useAppSelector } from '@/features';
import { IS_PROD } from '@rapid/config/constants';
import { FullSize, FlexRowCenter } from '@rapid/libs-web/styled';
import { combinationCName } from '@rapid/libs-web/common';
import { useWindowScreenSize, useWindowInnerSize } from '@rapid/libs-web/hooks';
import { NumberFilters } from '@rapid/libs/formatter';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useFadeIn, useFadeOut } from '@/hooks';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { windowDevtool, windowResizeAble, windowSetPosition, windowSetSize } from '@/actions';
import { useAsyncEffect, useReactive } from '@rapid/libs-web/hooks';
import { workbenchesRoute } from '@pages/index/router';
import { Button } from 'antd';
import { Transition, CSSTransition } from 'react-transition-group';
import { toPicket } from '@rapid/libs/common';

import lockUrl from '@/assets/images/login__lock.png?url';
import Header from '@components/Header';
import Subfield from '@rapid/libs-web/components/Subfield';
import Logo from '@components/Logo';

import commonStyles from '@scss/common/index.module.scss';
import styles from './index.module.scss';

enum Step {
  Login, Register
}

export default function Login() {
  useFadeIn(async () => {
    await windowSetSize({ width: 850, height: 550 });
    await windowResizeAble({ able: false });
    if (IS_PROD) await windowSetPosition({ x: 'center', y: 'center' });
  });

  const navigate = useNavigate();
  const userStore = useAppSelector(store => store.user);

  const [state] = useReactive({
    step: Step.Login
  })

  return <FullSize className={styles.login}>
    <Header isPane />

    <Subfield
      className={combinationCName(styles.didContent)}
    >
      <FullSize
        className={combinationCName(commonStyles.flexCenter)}
      >
        <Logo
          src={lockUrl}
        />
      </FullSize>

      <FullSize
        className={combinationCName(commonStyles.flexCenter)}
      >
        <Button
          onClick={async () => {
            await useFadeOut(() => {
              navigate(workbenchesRoute.meta.fullPath, { replace: true });
            });
          }}
        >
          登录
        </Button>
      </FullSize>
    </Subfield>
  </FullSize>
}
