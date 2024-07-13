import type { ComponentType, FC, RefObject } from 'react';
import { useEffect, useReducer, lazy, useState, useRef, createRef } from 'react';
import { Outlet, Navigate, useLocation, Route, useOutlet } from 'react-router-dom';
import { rapidRoute } from './modules';
import { makeRoute } from './utils';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useFadeIn } from '@/hooks';
import { FullSize } from '@/styled';
import { useReactive } from '@rapid/libs/hooks';
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
  component: RootLayout,
  children: [
    rapidRoute, loginRoute, registerRoute,

    notFoundRoute, notRoleRoute
  ]
});

export const routes = [rootRoute];
