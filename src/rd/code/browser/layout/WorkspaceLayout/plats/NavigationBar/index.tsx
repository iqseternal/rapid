import { classnames } from '@rapid/libs-web/common';
import { toNil } from '@rapid/libs';
import { FC, useCallback, useEffect, useState, memo } from 'react';
import { fadeOut } from '@/libs/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { retrieveRoutes, useRetrieveRoute } from '@/router';
import { useTransition } from '@rapid/libs-web';
import type { WidgetProps } from '@/components/Widget';
import { LogoutOutlined } from '@ant-design/icons';
import { useUserStore } from '@/features';

import Widget from '@/components/Widget';
import AutoMenu from '@/components/AutoMenu';

interface SideBarItemProps extends WidgetProps {

}

/**
 * 该组件为 NavigationBar 提供服务, 作用为创建工作区的左侧导航条中某个导航项内容的展示
 */
const SideBarItem = memo<SideBarItemProps>((props) => {
  const { className, tipAttrs = {} } = props;

  return (
    <Widget
      {...props}
      className={classnames('text-base h-[unset] aspect-square', className)}
      tipAttrs={{
        ...tipAttrs,
        placement: 'right',
        trigger: 'hover',
        mouseEnterDelay: 1
      }}
    />
  )
})

export interface NavigationBarProps {

}

/**
 * 该组件为 WorkspaceLayout 提供服务, 作用为创建工作区的左侧导航条
 */
export const NavigationBar = memo<NavigationBarProps>(() => {
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
    await fadeOut(async () => {
      navigate(loginRoute.meta.fullPath);
    })
  }, []);

  return (
    <div
      className='h-full gap-1 flex-auto flex flex-col justify-between items-center'
      style={{
        width: cssVars.uiNavigationBarWidth,
        minWidth: cssVars.uiNavigationBarWidth,
        maxWidth: cssVars.uiNavigationBarWidth,
        backgroundColor: cssVars.uiNavigationBarBackground,
        boxShadow: cssVars.shadowSm
      }}
    >
      <div
        className='mt-[2px] h-max flex justify-center flex-col w-full items-center'
      >
        {workbenchesRoute.children?.filter(routeItem => !routeItem.meta.hiddenInMenu).map(routeItem => {
          return (
            <SideBarItem
              key={routeItem.meta.fullPath}
              icon={routeItem.meta.icon}
              tipText={routeItem.meta.title}
              onClick={() => {
                navigate(routeItem.meta.fullPath);
              }}
            />
          )
        })}
      </div>

      <div
        className='mb-8 flex justify-center w-full items-center'
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
      </div>
    </div>
  )
})
