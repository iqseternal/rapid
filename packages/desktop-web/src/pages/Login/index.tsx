import { useAppSelector } from '@/features';
import { IS_PROD } from '@rapid/config/constants';
import { FullSize } from '@rapid/libs-web/styled';
import { combinationCName } from '@rapid/libs-web/common';
import { useFadeIn, useFadeOut } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { windowResizeAble, windowSetPosition, windowSetSize } from '@/actions';
import { useReactive } from '@rapid/libs-web/hooks';
import { Button } from 'antd';
import { toPicket } from '@rapid/libs/common';
import { useMenuSelector } from '@/menus';
import { userLogin } from '@/features/zustand';
import { registerReq } from '@/api';
import { reserveRoutes, retrieveRoutes } from '@/router/retrieve';

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
    const [loginErr] = await toPicket(userLogin({
      username: 'admin',
      password: '12345678'
    }));
    if (loginErr) {
      IMessage.error(loginErr.descriptor);
      return;
    }

    await useFadeOut(async () => {
      const { workbenchesRoute } = retrieveRoutes();

      navigate(workbenchesRoute.meta.fullPath, { replace: true });
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
