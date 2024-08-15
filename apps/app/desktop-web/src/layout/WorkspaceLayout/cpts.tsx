import { combinationCName } from '@rapid/libs-web/common';
import { FullSizeWidth } from '@rapid/libs-web/styled';
import { toPicket } from '@suey/pkg-utils';
import { FC, useState } from 'react';
import { useFadeOut } from '@/hooks';
import { logoutReq } from '@/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { retrieveRoutes } from '@router/retrieve';

import IMessage from '@rapid/libs-web/components/IMessage';
import Widget, { type WidgetProps } from '@components/Widget';

import styles from './cpts.module.scss';

interface SideBarItemProps extends WidgetProps {

}


/**
 * 该组件为 NavigationBar 提供服务, 作用为创建工作区的左侧导航条中某个导航项内容的展示
 */
const SideBarItem: FC<SideBarItemProps> = (props) => {
  const {
    className,
    tipAttrs = {}
  } = props;

  return <Widget
    {...props}
    className={combinationCName(className, styles.sideBarItem)}
    tipAttrs={{
      ...tipAttrs,
      placement: 'right',
      mouseEnterDelay: 0.5
    }}
  />;
}

/**
 * 该组件为 WorkspaceLayout 提供服务, 作用为创建工作区的左侧导航条
 */
export const NavigationBar: FC<Omit<BaseProps, 'children'>> = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [workspaceRoute] = useState(retrieveRoutes().workspaceRoute);

  // if (!shouldShowNavBar) return <div className={styles.mainNavigationContainerPlaceholder} />;

  const logout = async () => {
    const [logoutErr, logoutRes] = await toPicket(logoutReq());
    if (logoutErr) {
      IMessage.error(logoutErr.descriptor);
      return;
    }
    await useFadeOut(async () => {
      const { loginRoute } = retrieveRoutes();

      navigate(loginRoute.meta.fullPath);
    })
  }

  return <div
    className={combinationCName(
      styles.mainNavigationContainer,
      className
    )}
  >
    <FullSizeWidth
      className={styles.topContainer}
    >
      <SideBarItem
        icon='LogoutOutlined'
        tipText='退出登录'
        onClick={logout}
      />
    </FullSizeWidth>

    <FullSizeWidth
      className={styles.middleContainer}
    >
      {
        workspaceRoute.children?.map(routeItem => {
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
    </FullSizeWidth>
  </div>
}
