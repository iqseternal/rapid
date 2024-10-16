import { lazy } from 'react';
import { makeRoute } from '@rapid/libs-web/router';
import type { RequiredRouteConfig } from '@rapid/libs-web/router';
import { loginRoute, registerRoute, notFoundRoute, notRoleRoute } from './basic';

import RootLayout from '@/layout/RootLayout';
import WorkspaceLayout from '@/layout/WorkspaceLayout';

export * from './basic';

export const workbenchesToolRoute = makeRoute({
  name: 'WorkbenchesTool',
  path: '/workbenchesTool',
  children: [
    {
      name: 'WorkbenchesToolbar',
      path: '/workbenchesTool/toolbar',
      component: lazy(() => import('@/windows/Workbenches/Toolbar'))
    }
  ]
})
export const [
  workbenchesToolbarRoute
] = (workbenchesToolRoute as Required<RequiredRouteConfig>).children;

export const workbenchesRoute = makeRoute({
  name: `Workbenches`,
  path: `/workbenches`, redirect: 'home',
  component: <WorkspaceLayout />,
  children: [
    {
      name: 'WorkbenchesHome',
      path: '/home',
      meta: { title: '首页', icon: 'HomeOutlined' },
      component: lazy(() => import('@pages/Workspace/Home'))
    },
    {
      name:  'WorkbenchesWorkstation',
      path: '/workstation',
      meta: { title: '工作区', icon: 'FileWordOutlined' },
      component: lazy(() => import('@pages/Workspace/Workbenches'))
    },
    {
      name: 'Skin',
      path: '/skin',
      meta: { title: '皮肤', icon: 'SkinOutlined' },
      component: lazy(() => import('@pages/Workspace/Skin'))
    }
  ]
} as const);

export const [
  workbenchesHomeRoute,
  workbenchesWorkstationRoute,
  WorkbenchesSkinRoute
] = (workbenchesRoute as Required<RequiredRouteConfig>).children;

export const rootRoute = makeRoute({
  name: 'Root',
  path: '/', redirect: 'login',
  component: <RootLayout />,
  children: [
    loginRoute, registerRoute,
    notFoundRoute, notRoleRoute,
    workbenchesRoute,
    workbenchesToolRoute
  ]
});
