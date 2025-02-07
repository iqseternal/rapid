import { IS_PROD } from '@rapid/config/constants';
import { FullSize } from '@rapid/libs-web/styled';
import { classnames } from '@rapid/libs-web/common';
import { useFadeIn, useFadeOut } from '@/libs/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAsyncEffect, useMount, useReactive, useShallowReactive, useZustandHijack, useTransition } from '@rapid/libs-web';
import { App, Button } from 'antd';
import { toNil } from '@rapid/libs';
import { setAccessToken, userActions } from '@/features';
import { rApi } from '@/api';
import { retrieveRoutes, useRetrieveRoute } from '@/router';
import { commonStyles, animationStyles, useAnimationClassSelector } from '@scss/common';
import { menus } from '@/menus';
import { useCallback, useEffect, memo } from 'react';
import { Subfield } from '@rapid/libs-web/components';
import { ThemeExtension } from '@/plugins';

import lockUrl from '@/assets/images/login__lock.png?raw';
import Header from '@components/Header';
import Logo from '@components/Logo';

enum Step {
  Login,
  Register
}

export const Login = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const workbenchesRoute = useRetrieveRoute(routes => routes.workbenchesRoute);

  const { message } = App.useApp();

  const [shallowState] = useShallowReactive({
    step: Step.Login
  })

  const [loginPending, login] = useTransition(async () => {
    const [loginErr] = await toNil(userActions.userLogin({
      username: 'admin',
      password: '12345678'
    }));

    if (loginErr) {
      message.error(loginErr.reason.descriptor);
      return;
    }

    await useFadeOut(async () => {
      navigate(workbenchesRoute.meta.fullPath, { replace: true });
    });
  }, []);

  const [registerPending, register] = useTransition(async () => {
    const [registerErr] = await toNil(rApi.registerApi({}));
    if (registerErr) {
      message.error(registerErr.reason.descriptor);
      return;
    }
  }, []);

  useFadeIn(async () => {
    await ipcActions.windowSetSize({ width: 850, height: 550 });
    await ipcActions.windowResizeAble({ resizeAble: false });
    if (IS_PROD) await ipcActions.windowSetPosition({ x: 'center', y: 'center' });
  });

  return <FullSize>
    <Header isPane />

    <Subfield
      className='flex space-around'
      style={{
        height: `calc(100% - ${cssVars.captionBarHeight})`
      }}
    >
      <Subfield
        className={classnames(commonStyles.flexRowCenter)}
        style={{

        }}
      >
        <Logo
          src={lockUrl}
        />
      </Subfield>

      <Subfield
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
      </Subfield>
    </Subfield>
  </FullSize>
});

export default Login;
