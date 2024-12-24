import { classnames, toWaitPromise } from '@rapid/libs-web/common';
import { FullSizeWidth } from '@rapid/libs-web/styled';
import { toNil } from '@rapid/libs';
import { FC, useCallback, useEffect, useState, memo } from 'react';
import { useFadeOut } from '@/libs/hooks';
import { logoutReq } from '@/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { retrieveRoutes, useRetrieveRoute } from '@/router';
import { useTransition } from '@rapid/libs-web';
import type { WidgetProps } from '@components/Widget';
import { LogoutOutlined } from '@ant-design/icons';
import { useUserStore } from '@/features';
import { commonStyles } from '@scss/common';
import { makeCssVar } from '@/themes';

import IMessage from '@components/IMessage';
import Widget from '@components/Widget';
import AutoMenu from '@/components/AutoMenu';

interface SideBarItemProps extends WidgetProps {

}

/**
 * 该组件为 NavigationBar 提供服务, 作用为创建工作区的左侧导航条中某个导航项内容的展示
 */
const SideBarItem = memo<SideBarItemProps>((props) => {
  const { className, tipAttrs = {} } = props;

  return <Widget
    {...props}
    className={classnames('text-base h-[unset] aspect-square', className)}
    tipAttrs={{
      ...tipAttrs,
      placement: 'right',
      trigger: 'hover',
      mouseEnterDelay: 1
    }}
  />;
})

export interface NavigationBarProps {
  className?: string;
}

/**
 * 该组件为 WorkspaceLayout 提供服务, 作用为创建工作区的左侧导航条
 */
export const NavigationBar = memo<NavigationBarProps>(({ className }) => {
  const navigate = useNavigate();
  const workbenchesRoute = useRetrieveRoute(routes => routes.workbenchesRoute);
  const loginRoute = useRetrieveRoute(routes => routes.loginRoute);

  const userinfo = useUserStore(store => store.userinfo);

  const [logoutPending, logout] = useTransition(async () => {
    // const [logoutErr] = await toNil(logoutReq());
    // if (logoutErr) {
    //   IMessage.error(logoutErr.descriptor);
    //   return;
    // }

    // await toWaitPromise();
    await useFadeOut(async () => {
      navigate(loginRoute.meta.fullPath);
    })
  }, []);

  return <div
    className={classnames(
      'h-full gap-1 flex-auto flex flex-col justify-between items-center',
      className
    )}
    style={{
      width: makeCssVar(vars => vars.navigationBarWidth),
      minWidth: makeCssVar(vars => vars.navigationBarWidth),
      maxWidth: makeCssVar(vars => vars.navigationBarWidth),
      backgroundColor: makeCssVar(vars => vars.navigationBarBackgroundColor)
    }}
  >
    <FullSizeWidth
      className='mt-[2px] h-max flex justify-center'
    >
      <SideBarItem
        icon='UserOutlined'
        tipText='个人信息'
        tipAttrs={{
          overlay: <>
            {userinfo?.username}
          </>
        }}
      />

      {/*{workbenchesRoute.children?.filter(routeItem => !routeItem.meta.hiddenInMenu).map(routeItem => {*/}
      {/*  return <SideBarItem*/}
      {/*    key={routeItem.meta.fullPath}*/}
      {/*    icon={routeItem.meta.icon}*/}
      {/*    tipText={routeItem.meta.title}*/}
      {/*    onClick={() => {*/}
      {/*      navigate(routeItem.meta.fullPath);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*  </SideBarItem>;*/}
      {/*})}*/}
    </FullSizeWidth>

    <FullSizeWidth
      className='mb-8 flex justify-center'
    >
      <div />

      <AutoMenu
        dropdownAttrs={{
          trigger: ['click'],
          placement: 'topRight',
          autoAdjustOverflow: true
        }}
        menu={[
          {
            key: 'setting-logout',
            label: '退出登录',
            icon: <LogoutOutlined />,
            onClick: logout
          }
        ]}
      >
        <SideBarItem
          icon='SettingOutlined'
          tipText='设置'
        />
      </AutoMenu>

      {/*<SideBarItem*/}
      {/*  icon='LogoutOutlined'*/}
      {/*  tipText='退出登录'*/}
      {/*  onClick={logout}*/}
      {/*/>*/}
    </FullSizeWidth>
  </div>
})
