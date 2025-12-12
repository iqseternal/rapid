import type { RouteConfig } from '../../types';
import { memo, useEffect } from 'react';
import { Routes } from 'react-router-dom';

import type { RouterRenderComponents } from './libs';
import { renderRoutes, useRouteContextInject, useRouteContextProvider, RouteContext } from './libs';

export interface RouterProps {
  readonly route: RouteConfig;

  readonly renderComponents: RouterRenderComponents;
}

/**
 * 渲染路由树, Router 组件会跟随 location.pathname 变化而刷新, 使用 memo 避免路由树的多次刷新
 */
const RouterInner = memo<RouterProps>((props) => {
  const { route, renderComponents } = props;

  return (
    <Routes>
      {renderRoutes(route, {
        renderComponents: {
          onLazyComponent: renderComponents.onLazyComponent,
        }
      })}
    </Routes>
  )
})

/**
 * 获取当前路由
 */
export const useRoute = useRouteContextInject;

/**
 * 路由组件, 自动渲染路由表
 */
export const Router = memo<RouterProps>((props) => {
  const { route, renderComponents } = props;

  const [currentRoute] = useRouteContextProvider(route);

  return (
    <RouteContext.Provider
      value={currentRoute}
    >
      <RouterInner
        route={route}
        renderComponents={renderComponents}
      />
    </RouteContext.Provider>
  )
})
