
import { combinationCName } from '@rapid/libs-web/common';
import {FullSizeWidth} from '@rapid/libs-web/styled';
import { FC } from 'react';
import { useAppSelector } from '@/features';
import { useFadeOut } from '@/hooks';
import { loginRoute, workbenchesRoute } from '../router';
import { useLocation, useNavigate } from 'react-router-dom';

import Subfield from '@rapid/libs-web/components/Subfield';
import Widget, { type WidgetProps } from '@components/Widget';

import commonStyles from '@scss/common/index.module.scss';
import styles from './cpts.module.scss';

interface SideBarItemProps extends WidgetProps {

}
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

export const NavigationBar: FC<Omit<BaseProps, 'children'>> = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const shouldShowNavBar = useAppSelector(state => state.doc.isWork);

  // if (!shouldShowNavBar) return <div className={styles.mainNavigationContainerPlaceholder} />;

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
        onClick={() => useFadeOut(() => {
          navigate(loginRoute.meta.fullPath);
        })}
      />
    </FullSizeWidth>

    <FullSizeWidth
      className={styles.middleContainer}
    >
      {
        workbenchesRoute.children?.map(routeItem => {
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
