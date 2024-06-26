import { lazy } from 'react';
import { makeRoute } from '../utils';
import type { RequiredRouteConfig } from '../utils';

export const rapidRoute = makeRoute({
  name: `Rapid`,
  path: `/rapid`, redirect: 'workbenches',
  component: lazy(() => import('@pages/index/layout')),
  children: [
    {
      name:  'Work',
      path: '/workbenches',
      component: lazy(() => import('@pages/index/views/Workbenches'))
    },
    {
      path: '/index', name: 'ReceptionHome',
      meta: { title: '首页' },
      component: lazy(() => import('@pages/index/views/Home'))
    },
  ]
} as const);

export const workbenchesRoute = (rapidRoute as Required<RequiredRouteConfig>).children[0];
