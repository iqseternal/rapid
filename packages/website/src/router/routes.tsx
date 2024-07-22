import type { ComponentType, FC } from 'react';
import { useEffect, useReducer, lazy } from 'react';
import { Outlet, Navigate, useLocation, Route } from 'react-router-dom';
import { dashRoutes, dashLoginRoute } from './modules/dashboard';
import { receptionRoutes } from './modules/reception';

import DosLayout from '@/layout/DosLayout';

const notFound: RouteConfig = { path: '*', name: 'NotFound', component: lazy(() => import('@components/NotFound')) };

const notRole: RouteConfig = { path: '/403', name: 'NotRole', component: lazy(() => import('@components/NotRole')) };

export const routes: RouteConfig[] = [
  { path: '/', name: 'Root', component: <Navigate to={receptionRoutes.path} /> },
  receptionRoutes,
  dashLoginRoute, dashRoutes,
  notFound, notRole
];
