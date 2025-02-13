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
import { UserAddOutlined } from '@ant-design/icons';
import { ThemeExtension } from '@/plugins';
import { defineMessages, useTranslation } from '@rapid/i18n';

import lockUrl from '@/assets/images/login__lock.png?raw';
import Header from '@components/Header';
import Logo from '@components/Logo';
import Widget from '@components/Widget';

const messages = defineMessages({
  loginText: {
    'ch-ZN': "登录",
    'en-US': 'login',
  },
  registerText: {
    'ch-ZN': "注册",
    'en-US': 'register',
  },
})

export const Login = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const workbenchesRoute = useRetrieveRoute(routes => routes.workbenchesRoute);

  const { message } = App.useApp();
  const { t } = useTranslation();

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
            {t(messages.loginText)}
          </Button>
          <Button
            onClick={register}
            loading={registerPending.isPending}
          >
            {t(messages.registerText)}
          </Button>
          <Widget
            tipText='切换语言包'
            icon={'UserAddOutlined'}
            onClick={() => {
              const lang = window.i18n.getLanguage();
              if (lang === 'en-US') window.i18n.changeLanguage('ch-ZN');
              else window.i18n.changeLanguage('en-US');
            }}
          />
        </Subfield>
      </Subfield>
    </FullSize>
  )
});

export default Login;
