import { useEffect, useReducer, lazy, useState, useRef, createRef } from 'react';
import { workbenchesRoute } from './modules';
import { makeRoute } from './utils';
import { useFadeIn } from '@/hooks';
import { RootLayout } from '../layout';

export * from './modules';

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

export const rootRoute = makeRoute({
  name: 'Root',
  path: '/', redirect: 'login',
  component: <RootLayout />,
  children: [
    workbenchesRoute, loginRoute, registerRoute,

    notFoundRoute, notRoleRoute
  ]
});

export const routes = [rootRoute];
