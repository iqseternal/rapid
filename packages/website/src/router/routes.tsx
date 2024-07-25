import type { ComponentType, FC } from 'react';
import { useEffect, useReducer, lazy } from 'react';
import { Outlet, Navigate, useLocation, Route } from 'react-router-dom';
import { dashRoutes, dashLoginRoute } from './modules/dashboard';
import { receptionRoutes } from './modules/reception';
import { makeRoute } from './utils';

import DosLayout from '@/layout/DosLayout';

const notFound = makeRoute({ path: '*', name: 'NotFound', component: lazy(() => import('@components/NotFound')) });

const notRole = makeRoute({ path: '/403', name: 'NotRole', component: lazy(() => import('@components/NotRole')) });

export const routes = [
  makeRoute({ path: '/', name: 'Root', component: <Navigate to={receptionRoutes.path} /> }),
  receptionRoutes,
  dashLoginRoute, dashRoutes,
  notFound, notRole
];

export * from './modules';
