import { lazy } from 'react';
import { makeRoute } from '@rapid/libs-web/router';
import type { CompleteRouteConfig } from '@rapid/libs-web/router';
import { loginRoute, registerRoute, notFoundRoute, notRoleRoute } from './basic';

import RootLayout from '@/layout/RootLayout';
import WorkspaceLayoutWrapper from '@/layout/WorkspaceLayout';

export * from './basic';

export const workbenchesToolRoute = makeRoute({
  name: 'WorkbenchesTool',
  path: '/workbenchesTool',
  redirect: 'toolbar',
  children: [
    {
      name: 'WorkbenchesToolbar',
      path: '/workbenchesTool/toolbar',
      component: lazy(() => import('@/pages/Workbenches/Toolbar'))
    }
  ]
})
export const [
  workbenchesToolbarRoute
] = (workbenchesToolRoute as Required<CompleteRouteConfig>).children;

export const workbenchesRoute = makeRoute({
  name: `Workbenches`,
  path: `/workspace`,
  redirect: '/workspace/workstation',
  component: <WorkspaceLayoutWrapper />,
  hasErrorBoundary: true,
  errorElement: (
    <div>

    </div>
  ),
  ErrorBoundary: () => {

    return (
      <div>
        工作区出现错误
      </div>
    )
  },
  children: [
    {
      name:  'WorkspaceWorkstation',
      path: '/workspace/workstation',
      meta: {
        title: '工作区',
        icon: 'FileWordOutlined'
      },
      component: lazy(() => import('../../pages/Workspace/Wrokstation'))
    },
    {
      name: 'WorkspaceHome',
      path: '/workspace/home',
      meta: {
        title: '首页',
        icon: 'HomeOutlined',
      },
      component: lazy(() => import('@/pages/Workspace/Home'))
    },

    {
      name: 'WorkspaceSkin',
      path: '/workspace/skin',
      meta: {
        title: '皮肤',
        icon: 'SkinOutlined',
        hiddenInMenu: false
      },
      component: lazy(() => import('@/pages/Workspace/Skin'))
    }
  ]
} as const);

export const [
  workbenchesHomeRoute,
  workbenchesWorkstationRoute,
  WorkbenchesSkinRoute
] = (workbenchesRoute as Required<CompleteRouteConfig>).children;

export const rootRoute = makeRoute({
  name: 'Root',
  path: '/',
  redirect: workbenchesRoute.meta.fullPath,
  component: <RootLayout />,
  children: [
    loginRoute,
    registerRoute,
    notFoundRoute,
    notRoleRoute,
    workbenchesRoute,
    workbenchesToolRoute
  ]
});
