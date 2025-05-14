import { lazy } from 'react';
import { makeRoute } from '@rapid/libs-web/router';
import type { CompleteRouteConfig } from '@rapid/libs-web/router';
import { loginRoute, registerRoute, notFoundRoute, notRoleRoute } from './basic';

import RootLayout from '@/layout/RootLayout';
import WorkspaceLayout from '@/layout/WorkspaceLayout';

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
  path: `/workbenches`,
  redirect: 'workstation',
  component: <WorkspaceLayout />,
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
      name:  'WorkbenchesWorkstation',
      path: '/workbenches/workstation',
      meta: { title: '工作区', icon: 'FileWordOutlined' },
      component: lazy(() => import('@/pages/Workspace/Workbenches'))
    },
    {
      name: 'WorkbenchesHome',
      path: '/workbenches/home',
      meta: { title: '首页', icon: 'HomeOutlined', hiddenInMenu: true },
      component: lazy(() => import('@/pages/Workspace/Home'))
    },
    {
      name: 'Skin',
      path: '/workbenches/skin',
      meta: { title: '皮肤', icon: 'SkinOutlined', hiddenInMenu: false },
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
