import { classnames } from '@rapid/libs-web/common';
import { useFadeInEffect, fadeOut } from '@/libs/hooks';
import { useNavigate } from 'react-router-dom';
import { useAsyncEffect, useShallowReactive, useTransition } from '@rapid/libs-web';
import { App, Button, Card, Checkbox, Divider, Form, Input, Space, Tabs, Typography } from 'antd';
import { isString, isUndefined, toNil } from '@rapid/libs';
import { authHasAuthorizedSync, useUserStore, userActions } from '@/features';
import { registerApi, loginApi } from '@/api';
import { useRetrieveRoute } from '@/router';
import { commonStyles } from '@/scss/common';
import { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import { toBizErrorMsg } from 'rd/base/common/constants';
import { LockOutlined, MailOutlined, UserOutlined, RocketOutlined, ThunderboltOutlined, SafetyOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { uiTicketPanelBackImgUrl } from 'rd/assets';

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
  rememberMe: boolean;
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
    const [validateErr] = await toNil(loginForm.validateFields());
    if (validateErr) return;

    const data = loginForm.getFieldsValue();

    if (isUndefined(data.username) || isUndefined(data.password)) return;

    const [loginErr] = await toNil(userActions.userLogin({
      username: data.username,
      password: data.password
    }));

    if (loginErr) {
      message.error(toBizErrorMsg(loginErr.reason, '登录失败'));
      return;
    }

    await fadeOut(async () => navigate(workbenchesRoute.meta.fullPath, { replace: true }));
  }, []);

  useEffect(() => {

    loginForm.setFieldsValue({
      username: 'admin',
      password: '12345678'
    })

  }, []);

  return (
    <div className='w-full'>
      <div className='text-center mb-4'>
        <Typography.Title level={4} className='text-gray-800 font-bold mb-1'>
          欢迎回来
        </Typography.Title>
        <Typography.Text className='text-gray-500 text-xs'>
          请登录您的账户以继续使用
        </Typography.Text>
      </div>

      <Form
        layout='vertical'
        form={loginForm}
        className='w-full space-y-3'
        size='middle'
      >
        <Form.Item
          label={<span className='text-gray-700 font-medium text-sm'>用户名</span>}
          name='username'
          rules={[{
            validator: async (_, value) => {
              if (isUndefined(value)) return Promise.reject(`请输出用户名`);
              if (!isString(value) || value.trim() === '') return Promise.reject(`请输入用户名`);
            }
          }]}
          className='mb-0'
          required
        >
          <Input
            placeholder='请输入用户名'
            size='middle'
            prefix={<UserOutlined className='text-gray-400' />}
            className='h-9 rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-all duration-200 shadow-sm focus:shadow-md'
          />
        </Form.Item>

        <Form.Item
          label={(
            <span className='text-gray-700 font-medium text-sm'>
              密码
            </span>
          )}
          name='password'
          rules={[{
            validator: async (_, value) => {
              if (isUndefined(value)) return Promise.reject('请输入密码');
              if (!isString(value) || value.trim() === '') return Promise.reject('请输入密码');
            }
          }]}
          className='mb-0'
          required
        >
          <Input.Password
            placeholder='请输入密码'
            size='middle'
            prefix={<LockOutlined className='text-gray-400' />}
            className='h-9 rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-all duration-200 shadow-sm focus:shadow-md'
          />
        </Form.Item>

        <Form.Item>
          <div className='flex justify-between items-center'>
            <Form.Item
              noStyle
            >
              <Checkbox
                className='text-gray-600 hover:text-blue-600 transition-colors'
                checked
              >
                <span className='text-xs'>
                  记住我
                </span>
              </Checkbox>
            </Form.Item>

            <Button
              type='link'
              className='p-0 text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors'
            >
              忘记密码?
            </Button>
          </div>
        </Form.Item>

        <Form.Item className='mb-0'>
          <Button
            type='primary'
            block
            size='middle'
            onClick={login}
            loading={loginPending.pending}
            className='h-9 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 shadow-md hover:shadow-lg transition-all duration-300 font-medium text-sm'
          >
            {loginPending.pending ? '登录中...' : '登录账户'}
          </Button>
        </Form.Item>
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
    <div className='w-full'>
      <div className='text-center mb-4'>
        <Typography.Title level={4} className='text-gray-800 font-bold mb-1'>
          创建账户
        </Typography.Title>
        <Typography.Text className='text-gray-500 text-xs'>
          填写以下信息完成注册
        </Typography.Text>
      </div>

      <Form
        layout='vertical'
        form={registerForm}
        className='w-full space-y-3'
        size='middle'
      >
        <Form.Item
          label={<span className='text-gray-700 font-medium text-sm'>用户名</span>}
          name='username'
          rules={[{ required: true, message: '请输入用户名' }]}
          className='mb-0'
        >
          <Input
            placeholder='请输入用户名'
            size='middle'
            prefix={<UserOutlined className='text-gray-400' />}
            className='h-9 rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-all duration-200 shadow-sm focus:shadow-md'
          />
        </Form.Item>

        <Form.Item
          label={<span className='text-gray-700 font-medium text-sm'>电子邮箱</span>}
          name='email'
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式不正确' }
          ]}
          className='mb-0'
        >
          <Input
            placeholder='请输入邮箱'
            size='middle'
            prefix={<MailOutlined className='text-gray-400' />}
            className='h-9 rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-all duration-200 shadow-sm focus:shadow-md'
          />
        </Form.Item>

        <Form.Item
          label={<span className='text-gray-700 font-medium text-sm'>密码</span>}
          name='password'
          rules={[
            {
              required: true,
              message: '请输入密码',
              validator: async (_, value) => {

              }
            },
          ]}
          className='mb-0'
        >
          <Input.Password
            placeholder='至少6位字符'
            size='middle'
            prefix={<LockOutlined className='text-gray-400' />}
            className='h-9 rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-all duration-200 shadow-sm focus:shadow-md'
          />
        </Form.Item>

        <Form.Item
          label={<span className='text-gray-700 font-medium text-sm'>确认密码</span>}
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
          className='mb-0'
        >
          <Input.Password
            placeholder='请再次输入密码'
            size='middle'
            prefix={<LockOutlined className='text-gray-400' />}
            className='h-9 rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-all duration-200 shadow-sm focus:shadow-md'
          />
        </Form.Item>

        <Form.Item className='mb-0'>
          <Checkbox className='text-gray-600 hover:text-blue-600 transition-colors'>
            <span className='text-xs'>
              我同意
              <a href='#' className='text-blue-600 hover:text-blue-700 mx-1 transition-colors'>服务条款</a>
              和
              <a href='#' className='text-blue-600 hover:text-blue-700 mx-1 transition-colors'>隐私政策</a>
            </span>
          </Checkbox>
        </Form.Item>

        <Form.Item className='mb-0'>
          <Button
            type='primary'
            block
            size='middle'
            onClick={register}
            loading={registerPending.pending}
            className='h-9 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 shadow-md hover:shadow-lg transition-all duration-300 font-medium text-sm'
          >
            {registerPending.pending ? '注册中...' : '注册账户'}
          </Button>
        </Form.Item>
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
    <div className='w-full h-full relative flex flex-col bg-gradient-to-br from-blue-600 to-indigo-700'>
      <Header className='flex-none bg-transparent shadow-none' />

      <div
        className={classnames(
          'flex-1 flex w-full h-full items-center justify-center overflow-auto select-none',
          commonStyles.beautifulBar
        )}
      >
        <div className='w-full h-full max-w-4xl shadow-2xl overflow-hidden rounded-xl'>
          <div className='h-full flex flex-col md:flex-row flex-[7]'>
            <div className='w-full flex-auto bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-6 md:w-1/2 flex flex-col justify-center items-center relative overflow-hidden'>
              <div className='absolute top-0 left-0 w-full h-full opacity-15'>
                <div className='absolute top-8 left-8 w-24 h-24 bg-white rounded-full blur-lg animate-pulse'></div>
                <div className='absolute bottom-12 right-8 w-20 h-20 bg-blue-300 rounded-full blur-lg animate-pulse delay-1000'></div>
                <div className='absolute top-1/2 left-1/4 w-12 h-12 bg-indigo-300 rounded-full blur-md animate-pulse delay-500'></div>
                <div className='absolute top-1/3 right-1/3 w-16 h-16 bg-purple-300 rounded-full blur-lg animate-pulse delay-1500'></div>
                <div className='absolute bottom-1/4 left-1/3 w-8 h-8 bg-yellow-300 rounded-full blur-md animate-pulse delay-2000'></div>
              </div>

              <div className='absolute inset-0 opacity-5'>
                <div
                  className='w-full h-full'
                  style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />
              </div>

              <div className='relative z-10'>
                <div className='relative group'>
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500'></div>
                  <img
                    src={uiTicketPanelBackImgUrl}
                    className='drop-shadow-2xl w-24 h-24 animate-pulse relative z-10 group-hover:scale-110 transition-transform duration-500'
                    alt='logo'
                  />
                  <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce'>
                    <RocketOutlined className='text-blue-800 text-sm' />
                  </div>
                </div>
              </div>

              <div className='relative z-10 text-center '>
                <div className='relative'>
                  <Typography.Title
                    level={1}
                    className='mb-3 text-6xl md:text-7xl font-black tracking-tighter transform skew-x-[-12deg] duration-700 hover:skew-x-0 transition-all hover:scale-105'
                    style={{
                      color: '#ffffff',
                      textShadow: '0 4px 8px rgba(0,0,0,0.3), 0 0 20px rgba(59,130,246,0.5)'
                    }}
                  >
                    RAPID
                  </Typography.Title>
                  <div className='absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500'></div>
                </div>
              </div>


              <div className='relative z-10 mb-6 w-full max-w-sm'>
                <div className='space-y-4'>
                  <div className='group flex items-center space-x-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                    <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                      <RocketOutlined className='text-white text-base' />
                    </div>
                    <div className='flex-1'>
                      <div className='text-white font-bold text-base group-hover:text-blue-100 transition-colors'>插件化架构</div>
                      <div className='text-blue-200 text-sm group-hover:text-blue-100 transition-colors'>自主创建安装插件包</div>
                    </div>
                    <div className='w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  </div>

                  <div className='group flex items-center space-x-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                    <div className='w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                      <ThunderboltOutlined className='text-white text-base' />
                    </div>
                    <div className='flex-1'>
                      <div className='text-white font-bold text-base group-hover:text-indigo-100 transition-colors'>多元素绘图</div>
                      <div className='text-blue-200 text-sm group-hover:text-indigo-100 transition-colors'>丰富的绘图功能</div>
                    </div>
                    <div className='w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  </div>

                  <div className='group flex items-center space-x-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                    <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                      <SafetyOutlined className='text-white text-base' />
                    </div>
                    <div className='flex-1'>
                      <div className='text-white font-bold text-base group-hover:text-purple-100 transition-colors'>主题自定义</div>
                      <div className='text-blue-200 text-sm group-hover:text-purple-100 transition-colors'>完备的主题方案</div>
                    </div>
                    <div className='w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  </div>
                </div>
              </div>


              <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2'>
                <div className='flex items-center space-x-2'>
                  <div className='w-1 h-1 bg-blue-300 rounded-full animate-pulse'></div>
                  <Typography.Text className='text-blue-300 text-xs opacity-80 font-medium'>
                    © 2025 RAPID Platform
                  </Typography.Text>
                  <div className='w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-500'></div>
                </div>
              </div>
            </div>

            <div
              className='p-6 md:w-1/2 flex flex-col justify-center bg-white flex-[6] shadow-inner'
            >
              <AnimatePresence mode='wait'>
                {shallowState.activeMode === 'login' ? (
                  <motion.div
                    key='login-form'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <Login
                      changeTicket={changeTicket}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key='register-form'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
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
