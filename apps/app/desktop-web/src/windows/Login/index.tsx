import { IS_PROD } from '@rapid/config/constants';
import { FullSize } from '@rapid/libs-web/styled';
import { classnames } from '@rapid/libs-web/common';
import { useFadeIn, useFadeOut } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { windowResizeAble, windowSetPosition, windowSetSize } from '@/actions';
import { useAsyncEffect, useMount, useReactive, useShallowReactive, useZustandHijack } from '@rapid/libs-web';
import { App, Button } from 'antd';
import { toPicket } from '@rapid/libs';
import { setAccessToken, userLogin } from '@/features';
import { registerReq } from '@/api';
import { retrieveRoutes } from '@/router';
import { commonStyles, animationStyles, useAnimationClassSelector } from '@scss/common';
import { menus } from '@/menus';
import { useCallback, useEffect } from 'react';

import lockUrl from '@/assets/images/login__lock.png?raw';
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
    if (IS_PROD) await windowSetPosition({ x: 'center', y: 'center' });
    await useFadeOut(async () => {
      setAccessToken('1111');
      const { workbenchesRoute } = retrieveRoutes();
      console.log('核心功能开发, 从登录界面自动跳转到工作区', workbenchesRoute.meta.fullPath);

      navigate(workbenchesRoute.meta.fullPath, { replace: true });
    });
  });

  const { message } = App.useApp();

  const navigate = useNavigate();
  const headerFileMenu = useZustandHijack(menus.headerFileMenu);

  const [state] = useShallowReactive({
    step: Step.Login
  })

  const login = useCallback(async () => {
    const [loginErr] = await toPicket(userLogin({
      username: 'admin',
      password: '12345678'
    }));
    if (loginErr) {
      message.error(loginErr.descriptor);
      return;
    }

    await useFadeOut(async () => {
      const { workbenchesRoute } = retrieveRoutes();
      navigate(workbenchesRoute.meta.fullPath, { replace: true });
    });
  }, []);
  const register = useCallback(async () => {
    const [registerErr] = await toPicket(registerReq());
    if (registerErr) {
      message.error(registerErr.descriptor);
      return;
    }
  }, []);

  return <FullSize className={styles.login}>
    <Header isPane />

    <Subfield
      className={classnames(styles.didContent)}
    >
      <FullSize
        className={classnames(commonStyles.flexRowCenter)}
      >
        <Logo
          src={lockUrl}
        />
      </FullSize>

      <FullSize
        className={classnames(commonStyles.flexRowCenter)}
      >
        <Button
          onClick={login}
        >
          登录
        </Button>
        <Button
          onClick={register}
        >
          注册
        </Button>
      </FullSize>
    </Subfield>
  </FullSize>
}
