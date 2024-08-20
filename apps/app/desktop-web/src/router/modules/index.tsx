import { lazy } from 'react';
import { makeRoute } from '@rapid/libs-web/router';
import type { RequiredRouteConfig } from '@rapid/libs-web/router';

import WorkspaceLayout from '@/layout/WorkspaceLayout';

export * from './basic';

export const workspaceRoute = makeRoute({
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
  workbenchesWorkstation
] = (workspaceRoute as Required<RequiredRouteConfig>).children;
