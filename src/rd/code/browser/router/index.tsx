import { Suspense, memo, useMemo } from 'react';
import { HashRouter } from 'react-router-dom';
import { reserveRoutes, Router } from '@rapid/libs-web/router';
import { useShallowReactive } from '@rapid/libs-web';
import type { RouterRenderComponents } from '@rapid/libs-web';

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
    ],
    onLazyComponent: LazyComponent
  }))

  const routes = useMemo(
    () => shallowState.routes,
    [shallowState.routes]
  );

  const renderComponents = useMemo(
    (): RouterRenderComponents => (
      {
        onLazyComponent: shallowState.onLazyComponent,
      }
    ),
    [shallowState.onLazyComponent]
  );

  return (
    <Router
      routes={routes}
      renderComponents={renderComponents}
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
