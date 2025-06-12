import { classnames } from '@rapid/libs-web/common';
import { useFadeInEffect, fadeOut } from '@/libs/hooks';
import { useNavigate } from 'react-router-dom';
import { useAsyncEffect, useTransition } from '@rapid/libs-web';
import { App, Button, Checkbox, Form, Input, Space } from 'antd';
import { toNil } from '@rapid/libs';
import { authHasAuthorizedSync, useUserStore, userActions } from '@/features';
import { registerApi, loginApi } from '@/api';
import { useRetrieveRoute } from '@/router';
import { commonStyles } from '@/scss/common';
import { memo, useEffect, useLayoutEffect } from 'react';
import { toBizErrorMsg } from 'rd/base/common/constants';
import { useTranslation } from 'react-i18next';

import lockUrl from '@/assets/images/login__lock.png?url';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import Widget from '@/components/Widget';
import toast from 'react-hot-toast';
import WindowsMinWindowWidget from '@/plats/components/WindowsMinWindowWidget';
import WindowsCloseWindowWidget from '@/plats/components/WindowsCloseWindowWidget';
import i18n from '@/i18n';

interface LoginForm {
  username?: string;
  password?: string;
}

export const Login = memo(() => {
  const { t } = useTranslation();
  const { message, notification } = App.useApp();

  const [loginForm] = Form.useForm<LoginForm>();

  const navigate = useNavigate();
  const workbenchesRoute = useRetrieveRoute(routes => routes.workbenchesRoute);

  const [loginPending, login] = useTransition(async () => {
    const [loginErr] = await toNil(userActions.userLogin({
      username: 'admin',
      password: '12345678'
    }));

    if (loginErr) {
      message.error(toBizErrorMsg(loginErr.reason, '登录失败'));
      return;
    }

    await fadeOut(async () => navigate(workbenchesRoute.meta.fullPath, { replace: true }));
  }, []);

  const [registerPending, register] = useTransition(async () => {
    const [registerErr] = await toNil(registerApi({}));
    if (registerErr) {
      message.error(toBizErrorMsg(registerErr.reason, '注册失败'));
      return;
    }
  }, []);

  useFadeInEffect(async () => {
    await ipcActions.windowSetSize({ width: 850, height: 550 });
    await ipcActions.windowResizeAble({ resizeAble: false });
  }, []);

  useLayoutEffect(() => {
    rApp.metadata.defineMetadata('ui.layout.header.controller.widgets.close', WindowsCloseWindowWidget);
    rApp.metadata.defineMetadata('ui.layout.header.controller.widgets.min', WindowsMinWindowWidget);

    return () => {

      rApp.metadata.delMetadata('ui.layout.header.controller.widgets.close');
      rApp.metadata.delMetadata('ui.layout.header.controller.widgets.min');
    }
  }, []);

  return (
    <div className='w-full h-full relative'>
      <Header className='flex-none' />

      <div className='flex space-around flex-1 items-center'>
        <div className='flex-1 max-w-[50%]'>
          <Logo
            src={lockUrl}
            className='drop-shadow-md'
          />
        </div>

        <div className='flex-none flex justify-center'>
          <Form
            layout='horizontal'
            form={loginForm}
          >
            <Form.Item
              label='用户名'
              name='username'
            >
              <Input
                placeholder='请输入用户名'
              />
            </Form.Item>

            <Form.Item
              label='密码'
              name='password'
            >
              <Input
                placeholder='请输入密码'
                type='password'
              />
            </Form.Item>

            <Form.Item
              label={null}
            >
              <Space>
                <Checkbox>
                  Remember Me
                </Checkbox>
              </Space>
            </Form.Item>

            <Form.Item
              label={null}
            >
              <Space>
                <Button
                  onClick={login}
                  loading={loginPending.pending}
                >
                  {t('login.login', '登录')}
                </Button>

                <Button
                  onClick={register}
                  loading={registerPending.pending}
                >
                  {t('login.register', '注册')}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
});

export default Login;
