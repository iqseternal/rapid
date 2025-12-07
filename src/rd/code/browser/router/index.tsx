import { Suspense, memo, useEffect, useMemo } from 'react';
import { HashRouter } from 'react-router-dom';
import { reserveRoutes, Router } from '@rapid/libs-web/router';
import { useShallowReactive } from '@rapid/libs-web';
import type { RouterRenderComponents } from '@rapid/libs-web';
import { useUserStore } from '../features';

import RouterErrorBoundary from './mods/ErrorBoundary';
import LazyComponent from './mods/LazyComponent';

import * as presetRoutes from './modules';

export const { retrieveRoutes, useRetrieveRoute } = reserveRoutes(presetRoutes);

/**
 * 渲染路由
 */
export const RdRouter = memo(() => {
  const [shallowState] = useShallowReactive(() => ({
    route: presetRoutes.rootRoute,
    onLazyComponent: LazyComponent
  }))

  const userinfo = useUserStore(store => store.userinfo);

  // @feature 路由热更新支持. 本地路由随着特定条件而进行更新
  // 例如:
  // 1. 插件安装/卸载/更新 等等, 新增新的界面.
  // 2. 用户权限变化, 显示/隐藏 特定路由
  const route = useMemo(
    () => {

      return shallowState.route;
    },
    [
      shallowState.route,
      userinfo
    ]
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
      route={route}
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
