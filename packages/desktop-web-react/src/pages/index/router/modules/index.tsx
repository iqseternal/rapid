import { lazy } from 'react';
import { makeRoute } from '../utils';
import type { RequiredRouteConfig } from '../utils';
import { RapidLayout } from '@pages/index/layout';

export const rapidRoute = makeRoute({
  name: `Rapid`,
  path: `/rapid`, redirect: 'workbenches',
  component: RapidLayout,
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
