import type { FC } from 'react';
import { Suspense, useLayoutEffect, useTransition } from 'react';
import type { PathRouteProps } from 'react-router-dom';
import { Route, RouteProps, Routes, HashRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routes } from './routes';
import type { RequiredRouteConfig } from './utils';

import type { RedirectProps } from '@rapid/libs/components/Redirect';
import Redirect from '@rapid/libs/components/Redirect';

const createRouteArr = (routeArr: RequiredRouteConfig[]) => {
  return routeArr.map((route, index) => {
    const { redirect, name, meta, children, component, ...realRoute } = route;

    // 渲染自定义组件
    let Component = component as FC<any>;
    let componentsProps = {};

    // 这是一个重定向组件
    if (redirect) {
      Component = Redirect;
      const from = meta.fullpath;
      const to = redirect;
      componentsProps = { from, to, element: component } as RedirectProps;
    }

    // 放入的是一个 lazy
    if (Object.hasOwn(Component, '_init') && Object.hasOwn(Component, '_payload')) route.element = <Component {...componentsProps} />;
    // 放入的是一个 FC
    else if (typeof Component === 'function') route.element = <Component {...componentsProps} />;
    // 放入的 JSX Element
    else if (Object.hasOwn(Component, 'type') && Object.hasOwn(Component, 'props') && Object.hasOwn(Component, 'key')) {
      route.element = Component;
    }

    return <Route {...(realRoute as PathRouteProps)} key={(route.name ?? route.meta.fullpath)}>
      {route.children && createRouteArr(route.children)}
    </Route>;
  });
}
export * from './routes';

export default function RouterContext() {
  return <Suspense fallback={<></>}>
    <Routes>{createRouteArr(routes)}</Routes>
  </Suspense>;
}
