import { makeRoute } from '@rapid/libs-web';
import { lazy } from 'react';
import { notFoundRoute } from './basic';

import RootLayout from '@/layout/RootLayout';
import RecpLayout from '@/layout/RecpLayout';

export const receptionRoute = makeRoute({
  name: 'Reception',
  path: '/recp',
  redirect: 'home',
  component: <RecpLayout />,
  children: [
    {
      name: 'Home',
      path: '/recp/home',
      component: lazy(() => import('@/pages/recp/Home'))
    }
  ]
})

export const rootRoute = makeRoute({
  name: 'Root',
  path: '/',
  redirect: receptionRoute.meta.fullPath,
  component: <RootLayout />,
  children: [
    notFoundRoute,
    receptionRoute
  ]
});
