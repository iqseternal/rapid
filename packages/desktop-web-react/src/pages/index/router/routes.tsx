import type { ComponentType, FC } from 'react';
import { useEffect, useReducer, lazy } from 'react';
import { Outlet, Navigate, useLocation, Route } from 'react-router-dom';
import { rapidRoute } from './modules';
import { makeRoute } from './utils';

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
  path: '/', redirect: loginRoute.meta.fullpath
});

export const routes = [
  rootRoute,

  rapidRoute, loginRoute, registerRoute,

  notFoundRoute, notRoleRoute
];
