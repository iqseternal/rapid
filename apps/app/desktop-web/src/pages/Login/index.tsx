import { IS_PROD } from '@rapid/config/constants';
import { FullSize } from '@rapid/libs-web/styled';
import { classnames } from '@rapid/libs-web/common';
import { useFadeIn, useFadeOut } from '@/libs/hooks';
import { useNavigate } from 'react-router-dom';
import { useAsyncEffect, useTransition } from '@rapid/libs-web';
import { App, Button } from 'antd';
import { toNil } from '@rapid/libs';
import { authHasAuthorizedSync, useUserStore, userActions } from '@/features';
import { rApi } from '@/api';
import { useRetrieveRoute } from '@/router';
import { commonStyles } from '@scss/common';
import { memo, useEffect } from 'react';
import { Subfield } from '@rapid/libs-web/components';

import lockUrl from '@/assets/images/login__lock.png?raw';
import Header from '@components/Header';
import Logo from '@components/Logo';
import Widget from '@components/Widget';

export const Login = memo(() => {
  const navigate = useNavigate();

  const workbenchesRoute = useRetrieveRoute(routes => routes.workbenchesRoute);

  const { message } = App.useApp();

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
  });

  return (
    <FullSize>
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
          <Widget
            tipText='切换语言包'
            icon={'UserAddOutlined'}
          />
        </Subfield>
      </Subfield>
    </FullSize>
  )
});

export default Login;
