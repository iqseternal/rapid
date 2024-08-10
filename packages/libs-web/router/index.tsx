import type { RequiredRouteConfig } from './makeRequireRouteConfig';
import {  } from './makeRequireRouteConfig';

import type { FC } from 'react';
import { Suspense } from 'react';

import { Skeleton } from 'antd';

import type { PathRouteProps } from 'react-router-dom';
import { Route } from 'react-router-dom';

import type { RedirectProps } from '../components/Redirect';
import Redirect from '../components/Redirect';

export * from './makeRequireRouteConfig';

const Fallback = ({ children }) => {
  return <Suspense fallback={
    <Skeleton />
  }>
    {children}
  </Suspense>
}

export const createRoutesChildren = (routeArr: RequiredRouteConfig[]) => {
  return routeArr.map((route, index) => {
    const { redirect, name, meta, children = [], component, ...realRoute } = route;

    // 渲染自定义组件
    let Component = component as FC<any>;
    let componentsProps = {} as RedirectProps;

    // 这是一个重定向组件
    if (redirect) {
      Component = Redirect;
      const from = meta.fullPath;
      const to = redirect;
      componentsProps = { from, to, element: component } as RedirectProps;
    }

    // 放入的是一个 lazy
    if (Object.hasOwn(Component, '_init') && Object.hasOwn(Component, '_payload')) realRoute.element = <Fallback><Component {...componentsProps} /></Fallback>;
    // 放入的是一个 FC
    else if (typeof Component === 'function') realRoute.element = <Component {...componentsProps} />;
    // 放入的 JSX Element
    else if (Object.hasOwn(Component, 'type') && Object.hasOwn(Component, 'props') && Object.hasOwn(Component, 'key')) {
      realRoute.element = Component;
    }

    return <Route {...(realRoute as PathRouteProps)} key={(name ?? meta.fullPath ?? index)}>
      {children && createRoutesChildren(children)}
    </Route>

  });
}
