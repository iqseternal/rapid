import type { FC } from 'react';
import { Suspense, lazy, useLayoutEffect, useTransition } from 'react';
import { Route, RouteProps, Routes, Navigate } from 'react-router-dom';
import { createRoutesChildren, makeRoute } from '@rapid/libs-web/router';
import { receptionRoutes, dashLoginRoute, dashRoutes } from './modules';

import Redirect from '@rapid/libs-web/components/Redirect';
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

export default function RouterContext() {
  return <Suspense
    fallback={<>
      <div>正在加载组件 ....</div>
      <div>当然, 你可能在出错的时候才有可能看到此页面....</div>
    </>}
  >
    <Routes>
      {createRoutesChildren(routes)}
    </Routes>
  </Suspense>
}
