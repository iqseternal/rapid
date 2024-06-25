import type { ComponentType, FC } from 'react';
import { useEffect, useReducer, lazy } from 'react';
import { Outlet, Navigate, useLocation, Route } from 'react-router-dom';
import { rootRoute } from './modules';

import Redirect from '@/components/Redirect';

const notFound: RouteConfig = { path: '*', name: 'NotFound', component: lazy(() => import('@components/NotFound')) };

const notRole: RouteConfig = { path: '/403', name: 'NotRole', component: lazy(() => import('@components/NotRole')) };

export const routes: RouteConfig[] = [
  // { path: '/', name: 'Root', component: <Navigate to={rootRoute.path} /> },
  rootRoute,
  notFound, notRole
];
