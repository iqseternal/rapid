import { lazy } from 'react';
import { makeRoute } from '../utils';
import type { RequiredRouteConfig } from '../utils';

import WorkbenchesLayout from '@pages/index/layout/WorkbenchesLayout';

export * from './basic';

export const workbenchesRoute = makeRoute({
  name: `Workbenches`,
  path: `/workbenches`, redirect: 'home',
  component: <WorkbenchesLayout />,
  children: [
    {
      name: 'WorkbenchesHome',
      path: '/home',
      meta: { title: '首页', icon: 'HomeOutlined' },
      component: lazy(() => import('@pages/index/views/Home'))
    },
    {
      name:  'WorkbenchesWorkstation',
      path: '/workstation',
      meta: { title: '工作区', icon: 'FileWordOutlined' },
      component: lazy(() => import('@pages/index/views/Workbenches'))
    },
    {
      name: 'Skin',
      path: '/skin',
      meta: { title: '皮肤', icon: 'SkinOutlined' },
      component: lazy(() => import('@pages/index/views/Skin'))
    }
  ]
} as const);

export const [
  workbenchesHomeRoute,
  workbenchesWorkstation
] = (workbenchesRoute as Required<RequiredRouteConfig>).children;
