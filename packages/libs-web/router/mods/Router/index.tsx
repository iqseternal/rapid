import type { FC, ReactNode } from 'react';
import type { RouteConfig } from '../../types';

import { createContext, isValidElement, memo, useCallback, useContext, useEffect, useState } from 'react';
import { Route, Routes, type PathRouteProps, useLocation } from 'react-router-dom';
import type { RedirectProps } from '../Redirect';
import { isString, isUseful } from '@rapid/libs';
import { useNormalState, useSyncNormalState } from '../../../hooks';
import { isReactLazyFC, isReactComponent } from '../../../common';

import Redirect from '../Redirect';

export interface RouterRenderComponents {
  /**
   * 处理异步组件的展示
   * @returns
   */
  readonly onLazyComponent: FC<{

    readonly children: ReactNode
  }>;
}

export interface RouterProps {
  readonly routes: RouteConfig[];

  readonly renderComponents: RouterRenderComponents;
}

const RouterInner = memo<RouterProps>((props) => {
  const [syncProps] = useSyncNormalState(() => ({
    routes: props.routes,
    renderComponents: props.renderComponents
  }))

  const renderRouterRoutes = useCallback(() => {
    const { routes, renderComponents } = syncProps;

    const LazyComponent = renderComponents.onLazyComponent;

    function renderRoutes(routes: RouteConfig[]) {
      return routes.map((route, index) => {
        const { redirect, meta, children = [], component, ...realRoute } = route;

        // 渲染自定义组件
        let Component = component as FC<any>;
        let componentsProps = {} as RedirectProps;

        // 这是一个重定向组件
        if (isUseful(redirect)) {
          Component = Redirect;

          // RouteConfig 对象中的 redirect 会在创建时被处理为对象模式
          if (isString(redirect)) {
            throw new Error(`createRoutesChildren: route 对象 redirect 没有被处理, route 应该由 makeRoute 函数创建`);
          }

          componentsProps = { from: redirect.from, to: redirect.to, element: component } as RedirectProps;
        }

        // 放入的是一个 lazy
        if (isReactLazyFC(Component)) {
          realRoute.element = (
            <LazyComponent>
              <Component {...componentsProps} />
            </LazyComponent>
          );
        }

        // 放入的是一个 FC
        else if (isReactComponent(Component)) realRoute.element = <Component {...componentsProps} />;

        // 放入的 JSX Element
        else if (isValidElement(Component)) realRoute.element = Component;

        // component 无效?
        else realRoute.element = <></>;

        return (
          <Route
            {...(realRoute as PathRouteProps)}
            key={(route.name ?? route?.meta?.fullPath ?? index)}
          >
            {children && renderRoutes(children)}
          </Route>
        )
      })
    }

    return renderRoutes(routes);
  }, []);

  return (
    <Routes>
      {renderRouterRoutes()}
    </Routes>
  )
})

const Context = createContext<RouteConfig | null>(null);

export const useRoute = () => {
  const route = useContext(Context);

  return route;
}

export const Router = memo<RouterProps>((props) => {
  const location = useLocation();

  const [syncProps] = useSyncNormalState(() => ({
    routes: props.routes,
    renderComponents: props.renderComponents
  }))

  const [normalState] = useNormalState(() => ({
    routeMap: new Map<string, RouteConfig>(),
  }))

  const [currentRoute, setCurrentRoute] = useState<RouteConfig | null>(null);

  useEffect(() => {
    const { routes } = syncProps;

    const routeMap = new Map<string, RouteConfig>();

    function setupRouteMap(routes: RouteConfig[]) {
      for (const route of routes) {
        if (route.meta?.fullPath) routeMap.set(route.meta.fullPath, route);

        if (route.children) setupRouteMap(route.children);
      }
    }

    setupRouteMap(routes);

    normalState.routeMap = routeMap;

    const route = normalState.routeMap.get(location.pathname);
    if (route) setCurrentRoute(route);
    else setCurrentRoute(null);

    return () => {
      normalState.routeMap.clear();
    }
  }, [syncProps.routes]);

  useEffect(() => {
    const route = normalState.routeMap.get(location.pathname);

    if (route) setCurrentRoute(route);
    else setCurrentRoute(null);
  }, [location.pathname]);

  return (
    <Context.Provider
      value={currentRoute}
      key={syncProps.routes.length}
    >
      <RouterInner
        routes={syncProps.routes}
        renderComponents={syncProps.renderComponents}
      />
    </Context.Provider>
  )
})
