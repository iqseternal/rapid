import { lazy } from 'react';
import { makeRoute } from '../utils';
import type { RequiredRouteConfig } from '../utils';
import { RapidLayout } from '@pages/index/layout';

import Home from '@pages/index/views/Home';
import Workbenches from '@pages/index/views/Workbenches';

export const workbenchesRoute = makeRoute({
  name: `Workbenches`,
  path: `/workbenches`, redirect: 'home',
  component: RapidLayout,
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

  ]
} as const);

export const workbenchesHomeRoute = (workbenchesRoute as Required<RequiredRouteConfig>).children[0];
