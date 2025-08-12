import { Suspense, memo } from 'react';
import { HashRouter } from 'react-router-dom';
import { reserveRoutes, Router } from '@rapid/libs-web/router';
import { useShallowReactive } from '@rapid/libs-web';

import RouterErrorBoundary from './mods/ErrorBoundary';
import LazyComponent from './mods/LazyComponent';

import * as presetRoutes from './modules';

export const { retrieveRoutes, useRetrieveRoute } = reserveRoutes(presetRoutes);

/**
 * 渲染路由
 */
export const RdRouter = memo(() => {
  const [shallowState] = useShallowReactive(() => ({
    routes: [
      presetRoutes.rootRoute
    ]
  }))

  return (
    <Router
      routes={shallowState.routes}
      renderComponents={{
        onLazyComponent: LazyComponent
      }}
    />
  )
})

export const RdRouterWrapper = memo(() => {

  return (
    <HashRouter>
      <Suspense
        fallback={<RouterErrorBoundary />}
      >
        <RdRouter />
      </Suspense>
    </HashRouter>
  )
})

export default RdRouterWrapper;
