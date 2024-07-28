import { useAppSelector } from '@/features';
import { IS_PROD } from '@rapid/config/constants';
import { FullSize, FlexRowCenter } from '@rapid/libs-web/styled';
import { combinationCName } from '@rapid/libs-web/common';
import { useWindowScreenSize, useWindowInnerSize, useRefresh, useAutoState } from '@rapid/libs-web/hooks';
import { NumberFilters } from '@rapid/libs/formatter';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useFadeIn, useFadeOut } from '@/hooks';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { windowDevtool, windowResizeAble, windowSetPosition, windowSetSize } from '@/actions';
import { useAsyncEffect, useReactive } from '@rapid/libs-web/hooks';
import { workbenchesRoute } from '@pages/index/router';
import { Button } from 'antd';
import { Transition, CSSTransition } from 'react-transition-group';
import { toPicket } from '@rapid/libs/common';
import { loginReq } from '@/api';
import { useMenuSelector } from '@/menus';

import lockUrl from '@/assets/images/login__lock.png?url';
import Header from '@components/Header';
import IMessage from '@rapid/libs-web/components/IMessage';
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
  const headerFileMenu = useMenuSelector(menus => menus.headerFileMenu);

  const [state] = useReactive({
    step: Step.Login
  })

  const login = async () => {
    const [loginErr, loginRes] = await toPicket(loginReq({
      username: 'zms',
      password: '123'
    }));
    if (loginErr) {
      IMessage.error(loginErr.descriptor);
      // return;
    }

    await useFadeOut(() => {
      navigate(workbenchesRoute.meta.fullPath, { replace: true });
    });
  }

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
          onClick={login}
        >
          登录
        </Button>
      </FullSize>
    </Subfield>
  </FullSize>
}
