import { IS_PROD } from '@rapid/config/constants';
import { FullSize } from '@rapid/libs-web/styled';
import { combinationCName } from '@rapid/libs-web/common';
import { useFadeIn, useFadeOut } from '@/hooks';
import { workspaceRoute } from '@router/modules';
import { useNavigate } from 'react-router-dom';
import { windowResizeAble, windowSetPosition, windowSetSize } from '@/actions';
import { useMount, useReactive, useZustandHijack } from '@rapid/libs-web';
import { Button } from 'antd';
import { toPicket } from '@suey/pkg-utils';
import { userLogin } from '@/features';
import { registerReq } from '@/api';
import { retrieveRoutes } from '@/router';
import { commonStyles, animationStyles, useAnimationClassSelector } from '@scss/common';
import { menus } from '@/menus';

import lockUrl from '@/assets/images/login__lock.png?raw';
import Header from '@components/Header';
import IMessage from '@components/IMessage';
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
  });

  const navigate = useNavigate();
  const headerFileMenu = useZustandHijack(menus.headerFileMenu);

  const [state] = useReactive({
    step: Step.Login
  })

  const login = async () => {
    const [loginErr] = await toPicket(userLogin({
      username: 'admin',
      password: '12345678'
    }));
    if (loginErr) {
      IMessage.error(loginErr.descriptor);
      return;
    }

    await useFadeOut(async () => {
      const { workspaceRoute } = retrieveRoutes();

      navigate(workspaceRoute.meta.fullPath, { replace: true });
    });
  }

  const register = async () => {
    const [registerErr] = await toPicket(registerReq());
    if (registerErr) {
      IMessage.error(registerErr.descriptor);
      return;
    }
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
        <Button
          onClick={register}
        >
          注册
        </Button>
      </FullSize>
    </Subfield>
  </FullSize>
}
