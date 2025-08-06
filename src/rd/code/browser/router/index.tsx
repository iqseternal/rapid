import { Suspense, memo } from 'react';
import { Routes, HashRouter } from 'react-router-dom';
import { renderRoutes, reserveRoutes } from '@rapid/libs-web/router';
import { useShallowReactive } from '@rapid/libs-web';
import { Skeleton } from 'antd';

import RouterErrorBoundary from './mods/ErrorBoundary';
import LazyComponent from './mods/LazyComponent';

import * as presetRoutes from './modules';

export const { retrieveRoutes, useRetrieveRoute } = reserveRoutes(presetRoutes);

/**
 * 渲染所有的 routes
 */
export const RdRoutes = memo(() => {

  const [shallowState] = useShallowReactive(() => ({
    routes: [
      presetRoutes.rootRoute
    ]
  }))

  return (
    <Routes>
      {renderRoutes(shallowState.routes, {
        onLazyComponent: LazyComponent
      })}
    </Routes>
  )
})

export const RdRouterWrapper = memo(() => {

  return (
    <HashRouter>
      <Suspense
        fallback={<RouterErrorBoundary />}
      >
        <RdRoutes />
      </Suspense>
    </HashRouter>
  )
})

export default RdRouterWrapper;
