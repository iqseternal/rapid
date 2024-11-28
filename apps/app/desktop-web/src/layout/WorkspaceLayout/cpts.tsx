import { classnames, toWaitPromise } from '@rapid/libs-web/common';
import { FullSizeWidth } from '@rapid/libs-web/styled';
import { toPicket } from '@rapid/libs';
import { FC, useCallback, useEffect, useState, memo } from 'react';
import { useFadeOut } from '../../libs/hooks';
import { logoutReq } from '@/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { retrieveRoutes, useRetrieveRoute } from '@/router';
import { useTransition } from '@rapid/libs-web';
import type { WidgetProps } from '@components/Widget';

import IMessage from '@components/IMessage';
import Widget from '@components/Widget';

import styles from './cpts.module.scss';

interface SideBarItemProps extends WidgetProps {

}

/**
 * 该组件为 NavigationBar 提供服务, 作用为创建工作区的左侧导航条中某个导航项内容的展示
 */
const SideBarItem: FC<SideBarItemProps> = memo((props) => {
  const {
    className,
    tipAttrs = {}
  } = props;

  return <Widget
    {...props}
    className={classnames(className, styles.sideBarItem)}
    tipAttrs={{
      ...tipAttrs,
      placement: 'right',
      mouseEnterDelay: 0.5
    }}
  />;
})

/**
 * 该组件为 WorkspaceLayout 提供服务, 作用为创建工作区的左侧导航条
 */
export const NavigationBar: FC<Omit<BaseProps, 'children'>> = memo(({ className }) => {
  const navigate = useNavigate();
  const workbenchesRoute = useRetrieveRoute(routes => routes.workbenchesRoute);
  const loginRoute = useRetrieveRoute(routes => routes.loginRoute);

  const [logoutPending, logout] = useTransition(async () => {
    // const [logoutErr] = await toPicket(logoutReq());
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
      styles.mainNavigationContainer,
      className
    )}
  >
    <FullSizeWidth
      className={styles.topContainer}
    >
      {
        workbenchesRoute.children?.filter(routeItem => {
          return !routeItem.meta.hiddenInMenu;
        }).map(routeItem => {
          return <SideBarItem
            key={routeItem.meta.fullPath}
            icon={routeItem.meta.icon}
            tipText={routeItem.meta.title}
            onClick={() => {
              navigate(routeItem.meta.fullPath);
            }}
          >
          </SideBarItem>;
        })
      }


    </FullSizeWidth>

    <FullSizeWidth
      className={styles.bottomContainer}
    >

      <SideBarItem
        icon='ProfileOutlined'
        tipText='个人信息'
      />

      <SideBarItem
        icon='SettingOutlined'
        tipText='设置'
      />

      <SideBarItem
        icon='LogoutOutlined'
        tipText='退出登录'
        onClick={logout}
      />
    </FullSizeWidth>
  </div>
})
