import { lazy } from 'react';
import { makeRoute } from '../utils';
import type { RequiredRouteConfig } from '../utils';

export const notFoundRoute = makeRoute({
  name: 'NotFound',
  path: '*',
  component: lazy(() => import('@components/NotFound'))
});

export const notRoleRoute = makeRoute({
  name: 'NotRole',
  path: '/403',
  component: lazy(() => import('@components/NotRole'))
});

export const loginRoute = makeRoute({
  name: 'LoginRoute',
  path: '/login',
  component: lazy(() => import('@pages/index/views/Login'))
})

export const registerRoute = makeRoute({
  name: 'Register',
  path: '/register',
  component: lazy(() => import('@pages/index/views/Register'))
})
