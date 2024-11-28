import type { FC, ReactElement } from 'react';
import { Suspense, lazy, memo, useLayoutEffect, useTransition } from 'react';
import { Route, RouteProps, Routes, Navigate } from 'react-router-dom';
import { createRoutesChildren, makeRoute, reserveRoutes } from '@rapid/libs-web/router';
import { Skeleton } from 'antd';
import { Redirect } from '@rapid/libs-web';

import DosLayout from '@/layout/DosLayout';

import * as presetRoutes from './modules';

export const { retrieveRoutes, useRetrieveRoute } = reserveRoutes(presetRoutes);

export const RouterContext = memo(() => {
  return <Suspense
    fallback={<>
      <div>正在加载组件 ....</div>
      <div>当然, 你可能在出错的时候才有可能看到此页面....</div>
    </>}
  >
    <Routes>
      {createRoutesChildren([presetRoutes.rootRoute], {
        /**
         * 异步 lazy 组件展示
         * @returns {ReactElement}
         */
        onLazyComponent: memo(({ children }): ReactElement => {

          return <Suspense fallback={
            <Skeleton />
          }>
            {children}
          </Suspense>
        })
      })}
    </Routes>
  </Suspense>
})

export default RouterContext;

