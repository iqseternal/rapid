import type { FC } from 'react';
import { Suspense, useLayoutEffect, useTransition } from 'react';
import type { PathRouteProps } from 'react-router-dom';
import { Route, RouteProps, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routes } from './routes';
import Loading from '@/components/Loading';

const createRouteArr = (routeArr: RouteConfig[]) => {
  return routeArr.map((route, index) => {
    const Component = route.component as FC;

    if (Object.hasOwn(Component, '_init') && Object.hasOwn(Component, '_payload')) route.element = <Component />;
    else if (typeof Component === 'function') route.element = <Component />;
    else if (Object.hasOwn(Component, 'type') && Object.hasOwn(Component, 'props') && Object.hasOwn(Component, 'key')) {
      route.element = Component;
    }

    return <Route {...(route as PathRouteProps)} key={(route.name ?? route.path ?? '') + index}>
      {route.children && createRouteArr(route.children)}
    </Route>;
  });
}

export * from './modules';

export default function RouterContext() {
  return <Suspense fallback={<Loading />}>
    <Routes>{createRouteArr(routes)}</Routes>
  </Suspense>;
}
