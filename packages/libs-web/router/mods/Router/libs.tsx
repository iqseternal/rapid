import type { FC, ReactNode } from 'react';
import type { RouteConfig } from '../../types';
import { isUseful, isString } from '@rapid/libs';
import type { RedirectProps } from '../Redirect';
import { Redirect } from '../Redirect';
import { createContext, isValidElement, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { isReactLazyFC, isReactComponent } from '../../../common';
import type { PathRouteProps } from 'react-router-dom';
import { Route, useLocation } from 'react-router-dom';
import { useNormalState } from '../../../hooks';

export interface RouterRenderComponents {
  /**
   * 处理异步组件的展示
   * @returns
   */
  readonly onLazyComponent: FC<{

    readonly children: ReactNode;
  }>;
}

export interface RenderRoutesOptions {
  readonly renderComponents: RouterRenderComponents;
}

export function renderRoutes(routes: RouteConfig[], options: RenderRoutesOptions) {
  const { renderComponents } = options;

  const LazyComponent = renderComponents.onLazyComponent;

  function renderRoutesTree(routes: RouteConfig[]) {
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
          {children && renderRoutesTree(children)}
        </Route>
      )
    })
  }

  return renderRoutesTree(routes);
}

export const RouteContext = createContext<RouteConfig | null>(null);

export function useRouteContextInject() {
  const route = useContext(RouteContext);

  return [route] as const;
}

export function useRouteContextProvider(routes: RouteConfig[]) {
  const location = useLocation();

  const [normalState] = useNormalState(() => ({
    routeMap: new Map<string, RouteConfig>(),
  }))

  const [currentRoute, setCurrentRoute] = useState<RouteConfig | null>(null);

  useEffect(() => {
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
  }, [routes]);

  useEffect(() => {
    const route = normalState.routeMap.get(location.pathname);

    if (route) setCurrentRoute(route);
    else setCurrentRoute(null);
  }, [location.pathname]);

  return [currentRoute, setCurrentRoute] as const;
}
