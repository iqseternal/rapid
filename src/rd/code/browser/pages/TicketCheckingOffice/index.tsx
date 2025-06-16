import { classnames } from '@rapid/libs-web/common';
import { useFadeInEffect, fadeOut } from '@/libs/hooks';
import { useNavigate } from 'react-router-dom';
import { useAsyncEffect, useShallowReactive, useTransition } from '@rapid/libs-web';
import { App, Button, Card, Checkbox, Divider, Form, Input, Space, Tabs, Typography } from 'antd';
import { toNil } from '@rapid/libs';
import { authHasAuthorizedSync, useUserStore, userActions } from '@/features';
import { registerApi, loginApi } from '@/api';
import { useRetrieveRoute } from '@/router';
import { commonStyles } from '@/scss/common';
import { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import { toBizErrorMsg } from 'rd/base/common/constants';
import { GithubOutlined, GoogleOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { uiLoginLockImgUrl } from 'rd/assets';

import Header from '@/components/Header';
import Logo from '@/components/Logo';
import Widget from '@/components/Widget';
import toast from 'react-hot-toast';
import WindowsMinWindowWidget from '@/plats/components/WindowsMinWindowWidget';
import WindowsCloseWindowWidget from '@/plats/components/WindowsCloseWindowWidget';
import i18n from '@/i18n';

type ActiveMode = 'login' | 'register';

const enum TicketActiveMode {
  Login = 'login',
  Register = 'register',
}

interface LoginForm {
  username?: string;
  password?: string;
}

interface LoginProps {
  changeTicket: (activeMode: TicketActiveMode) => void;
}

const Login = memo<LoginProps>((props) => {
  const { changeTicket } = props;
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

  return (
    <div>
      <Form
        layout='vertical'
        form={loginForm}
        className='max-w-md mx-auto w-full'
      >
        <Form.Item
          label={t('ticket.login.form.username', '用户名')}
          name='username'
          rules={[
            {
              required: true,
              message: '请输入用户名'
            }
          ]}
        >
          <Input
            placeholder='请输入用户名'
            size='large'
            prefix={<UserOutlined className='text-gray-300' />}
          />
        </Form.Item>

        <Form.Item
          label='密码'
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            placeholder='请输入密码'
            size='large'
            prefix={<LockOutlined className='text-gray-300' />}
          />
        </Form.Item>

        <div className='flex justify-between mb-6 items-center'>
          <Checkbox>
            记住我
          </Checkbox>
          <Button type='link' className='p-0'>
            忘记密码?
          </Button>
        </div>

        <Form.Item>
          <Button
            type='primary'
            block
            size='large'
            onClick={login}
            loading={loginPending.pending}
          >
            登录账户
          </Button>
        </Form.Item>

        <Divider plain>
          或使用以下方式登录
        </Divider>

        <div className='flex justify-center space-x-4'>
          <Button
            shape='circle'
            icon={<GoogleOutlined />}
            size='large'
          />
          <Button
            shape='circle'
            icon={<GithubOutlined />}
            size='large'
          />
        </div>
      </Form>
    </div>
  )
})

interface RegisterForm {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface RegisterProps {
  changeTicket: (activeMode: TicketActiveMode) => void;
}

const Register = memo<RegisterProps>((props) => {
  const { changeTicket } = props;
  const { t } = useTranslation();
  const { message, notification } = App.useApp();

  const [registerForm] = Form.useForm<RegisterForm>();


  const [registerPending, register] = useTransition(async () => {
    const [registerErr] = await toNil(registerApi({}));
    if (registerErr) {
      message.error(toBizErrorMsg(registerErr.reason, '注册失败'));
      return;
    }
  }, []);


  return (



    <div>
      <Form
        layout='vertical'
        form={registerForm}
        className='max-w-md mx-auto w-full'
      >
        <Form.Item
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            placeholder='请输入用户名'
            size='large'
            prefix={<UserOutlined className='text-gray-300' />}
          />
        </Form.Item>

        <Form.Item
          label='电子邮箱'
          name='email'
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式不正确' }
          ]}
        >
          <Input
            placeholder='请输入邮箱'
            size='large'
            prefix={<MailOutlined className='text-gray-300' />}
          />
        </Form.Item>

        <Form.Item
          label='密码'
          name='password'
          rules={[
            {
              required: true,
              message: '请输入密码',
              validator: async (_, value) => {

              }
            },
          ]}
        >
          <Input.Password
            placeholder='至少6位字符'
            size='large'
            prefix={<LockOutlined className='text-gray-300' />}
          />
        </Form.Item>

        <Form.Item
          label='确认密码'
          name='confirmPassword'
          dependencies={['password']}
          rules={[
            { required: true, message: '请再次输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入的密码不一致');
              },
            }),
          ]}
        >
          <Input.Password
            placeholder='请再次输入密码'
            size='large'
            prefix={<LockOutlined className='text-gray-300' />}
          />
        </Form.Item>

        <Form.Item className='mb-6'>
          <Checkbox>
            我同意<a href='#' className='text-blue-600'>服务条款</a>和<a href='#' className='text-blue-600'>隐私政策</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            block
            size='large'
            onClick={register}
            loading={registerPending.pending}
          >
            注册账户
          </Button>
        </Form.Item>

        <Typography.Text className='text-gray-500 text-center block mt-4'>
          已有账户?
          <Button
            type='link'
            className='p-0 ml-1'
            onClick={() => {
              changeTicket(TicketActiveMode.Login);
            }}
          >
            立即登录
          </Button>
        </Typography.Text>
      </Form>

    </div>
  )
})


export const TicketCheckingOffice = memo(() => {
  const { t } = useTranslation();
  const { message, notification } = App.useApp();

  const [shallowState] = useShallowReactive(() => ({
    activeMode: 'login' as TicketActiveMode,
  }))

  const changeTicket = useCallback((activeMode: TicketActiveMode) => {
    shallowState.activeMode = activeMode;
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
    <div className='w-full h-full relative flex flex-col'>
      <Header className='flex-none bg-transparent shadow-none' />

      <div
        className={classnames(
          'flex-1 flex w-full h-full items-center justify-center overflow-auto select-none',
          commonStyles.beautifulBar
        )}
      >
        <div className='w-full h-full max-w-4xl shadow-xl overflow-hidden'>
          <div className='h-full flex flex-col md:flex-row'>
            <div className='w-full flex-auto bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 md:w-2/5 flex flex-col justify-center items-center'>
              <div className='mb-8'>
                <img
                  src={uiLoginLockImgUrl}
                  className='drop-shadow-lg w-24 h-24'
                  alt='logo'
                />
              </div>

              <Typography.Title
                level={2}
                className='mb-4 text-6xl md:text-8xl font-extrabold tracking-tighter transform skew-x-[-20deg] duration-500'
                style={{
                  color: cssVars.colorTextInverse
                }}
              >
                RAPID
              </Typography.Title>

              <Typography.Text className='text-blue-100 text-center'>
                USE
              </Typography.Text>

              <div className='mt-10 flex space-x-4'>
                <Button
                  shape='round'
                  type='default'
                  ghost
                  icon={<GoogleOutlined />}
                >
                  Google
                </Button>

                <Button
                  shape='round'
                  type='default'
                  ghost
                  icon={<GithubOutlined />}
                >
                  GitHub
                </Button>
              </div>
            </div>

            <div
              className='p-8 md:w-[40%] flex flex-col justify-center'
            >
              <Tabs
                activeKey={shallowState.activeMode}
                onChange={(tab) => {
                  shallowState.activeMode = tab as TicketActiveMode;
                }}
                centered
                className='mb-6'
                items={[
                  {
                    key: 'login',
                    tabKey: 'login',
                    label: t('ticket.tabs.login', '登录')
                  },
                  {
                    key: 'register',
                    tabKey: 'register',
                    label: t('ticket.tabs.register', '注册')
                  }
                ]}
              />

              <AnimatePresence mode='wait'>
                {shallowState.activeMode === 'login' ? (
                  <motion.div
                    key='login-form'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Login
                      changeTicket={changeTicket}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key='register-form'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Register
                      changeTicket={changeTicket}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

export default TicketCheckingOffice;
