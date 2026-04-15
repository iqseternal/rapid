import { classnames } from '@rapid/libs-web/common';
import { FC, useCallback, useEffect, useState, memo } from 'react';
import { fadeOut } from '@/libs/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { retrieveRoutes, useRetrieveRoute } from '@/router';
import type { WidgetProps } from '@/components/Widget';
import { LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/features';
import { commonStyles } from 'rd/code/browser/scss/common';

import Widget from '@/components/Widget';
import AutoMenu from '@/components/AutoMenu';

interface SideBarItemProps extends WidgetProps {
  readonly activeFullPath?: string;
}

/**
 * 该组件为 NavigationBar 提供服务, 作用为创建工作区的左侧导航条中某个导航项内容的展示
 */
const SideBarItem = memo<SideBarItemProps>((props) => {
  const {
    className,
    tipAttrs = {},
    activeFullPath,
    children,
    ...attrs
  } = props;

  const location = useLocation();

  return (
    <div
      className={classnames(
        commonStyles.appRegionNo,
        'cursor-default h-max'
      )}
    >
      <Widget
        {...attrs}
        className={classnames(
          'aspect-square',
          className,
          {
            ['bg-blue-50']: !!activeFullPath && (location.pathname === activeFullPath)
          }
        )}
        tipAttrs={{
          ...tipAttrs,
          placement: 'right',
          trigger: 'hover',
          mouseEnterDelay: 1
        }}
      />

      <div
        className='w-full h-max text-center'
      >
        {children}
      </div>
    </div>
  )
})

export interface NavigationBarProps {

}

/**
 * 该组件为 WorkspaceLayout 提供服务, 作用为创建工作区的左侧导航条
 */
export const NavigationBar = memo<NavigationBarProps>(() => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const workbenchesRoute = useRetrieveRoute(routes => routes.workbenchesRoute);

  const userinfo = useUserStore(store => store.userinfo);

  return (
    <div
      className={classnames(
        'h-full gap-1 flex-auto flex flex-col justify-between items-center',
        'w-16',
        'bg-white',
        'shadow-sm',
        'pt-2 pb-4',
        commonStyles.appRegion,
      )}
    >
      <div
        className='h-max flex justify-center flex-col w-full items-center gap-y-2'
      >
        {workbenchesRoute.children?.filter(routeItem => !routeItem.meta?.more?.hiddenInMenu).map(routeItem => {
          return (
            <SideBarItem
              key={routeItem.meta.fullPath}
              activeFullPath={routeItem.meta.fullPath}
              icon={routeItem.meta.icon}
              size='large'
              hasHoverStyle={true}
              tipText={routeItem.meta.title}
              onClick={() => {
                navigate(routeItem.meta.fullPath);
              }}
            />
          )
        })}
      </div>

      <div
        className='flex flex-col justify-center w-full items-center'
      >
        <div />

        <AutoMenu
          dropdownAttrs={{
            trigger: ['click'],
            placement: 'topRight',
            autoAdjustOverflow: true,
            getPopupContainer: () => document.body,
          }}
          menuAttrs={{
            getPopupContainer: () => document.body,
          }}
          menu={[
            {
              key: 'setting-1',
              type: 'item',
              icon: 'CloseCircleFilled',
              label: '设置'
            }
          ]}
        >
          <SideBarItem
            icon='SettingOutlined'
            size='large'
            tipText={t('ui.layout.workspace.navigation.bar.settings', '设置')}
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
