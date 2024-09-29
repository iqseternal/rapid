import type { FC, ReactElement } from 'react';
import { Suspense, lazy, useLayoutEffect, useTransition } from 'react';
import { Route, RouteProps, Routes, Navigate } from 'react-router-dom';
import { createRoutesChildren, makeRoute } from '@rapid/libs-web/router';
import { receptionRoutes, dashLoginRoute, dashRoutes } from './modules';
import { Skeleton } from 'antd';

import Redirect from '@rapid/libs-web/components/Redirect';
import DosLayout from '@/layout/DosLayout';

const notFound = makeRoute({ path: '*', name: 'NotFound', component: lazy(() => import('@components/NotFound')) });

const notRole = makeRoute({ path: '/403', name: 'NotRole', component: lazy(() => import('@components/NotRole')) });

const rootRoute = makeRoute({ path: '/', name: 'Root', redirect: receptionRoutes.meta.fullPath });

export const routes = [
  rootRoute,
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
      {createRoutesChildren(routes, {
        /**
         * 异步 lazy 组件展示
         * @returns {ReactElement}
         */
        onLazyComponent: ({ children }): ReactElement => {


          return <Suspense fallback={
            <Skeleton />
          }>
            {children}
          </Suspense>
        }
      })}
    </Routes>
  </Suspense>
}
