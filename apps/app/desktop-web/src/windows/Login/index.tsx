import { IS_PROD } from '@rapid/config/constants';
import { FullSize } from '@rapid/libs-web/styled';
import { classnames } from '@rapid/libs-web/common';
import { useFadeIn, useFadeOut } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { windowResizeAble, windowSetPosition, windowSetSize } from '@/actions';
import { useAsyncEffect, useMount, useReactive, useShallowReactive, useZustandHijack, useTransition } from '@rapid/libs-web';
import { App, Button } from 'antd';
import { toPicket } from '@rapid/libs';
import { setAccessToken, userActions } from '@/features';
import { registerReq } from '@/api';
import { retrieveRoutes, useRetrieveRoute } from '@/router';
import { commonStyles, animationStyles, useAnimationClassSelector } from '@scss/common';
import { menus } from '@/menus';
import { useCallback, useEffect, memo } from 'react';
import { Subfield } from '@rapid/libs-web/components';

import lockUrl from '@/assets/images/login__lock.png?raw';
import Header from '@components/Header';
import Logo from '@components/Logo';

import styles from './index.module.scss';

enum Step {
  Login, Register
}

export const Login = memo(() => {
  const navigate = useNavigate();
  const headerFileMenu = useZustandHijack(menus.headerFileMenu);
  const workbenchesRoute = useRetrieveRoute(routes => routes.workbenchesRoute);

  const { message } = App.useApp();

  const [state] = useShallowReactive({
    step: Step.Login
  })

  const [loginPending, login] = useTransition(async () => {
    const [loginErr] = await toPicket(userActions.userLogin({
      username: 'admin',
      password: '12345678'
    }));
    if (loginErr) {
      message.error(loginErr.descriptor);
      return;
    }

    await useFadeOut(async () => {
      navigate(workbenchesRoute.meta.fullPath, { replace: true });
    });
  }, []);

  const [registerPending, register] = useTransition(async () => {
    const [registerErr] = await toPicket(registerReq());
    if (registerErr) {
      message.error(registerErr.descriptor);
      return;
    }
  }, []);


  useFadeIn(async () => {
    await windowSetSize({ width: 850, height: 550 });
    await windowResizeAble({ resizeAble: false });
    if (IS_PROD) await windowSetPosition({ x: 'center', y: 'center' });
    await useFadeOut(async () => {
      setAccessToken('1111');
      const { workbenchesRoute } = retrieveRoutes();
      navigate(workbenchesRoute.meta.fullPath, { replace: true });
    });
  });

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
          loading={loginPending.isPending}
        >
          登录
        </Button>
        <Button
          onClick={register}
          loading={registerPending.isPending}
        >
          注册
        </Button>
      </FullSize>
    </Subfield>
  </FullSize>
});

export default Login;
