import type { RequiredRouteConfig } from './makeRequireRouteConfig';
import {  } from './makeRequireRouteConfig';
import type { FC, ReactElement, ReactNode } from 'react';
import { Suspense, isValidElement } from 'react';
import { Skeleton } from 'antd';
import type { PathRouteProps } from 'react-router-dom';
import { Route } from 'react-router-dom';
import type { RedirectProps } from '../components/Redirect';
import { isReactClassComponent, isReactFC, isReactForwardFC, isReactLazyFC } from '../common';
import type { LazyExoticComponent } from 'react';
import { printWarn } from '@suey/printer';

import Redirect from '../components/Redirect';

export * from './makeRequireRouteConfig';

export interface CreateRoutesChildrenOptions {
  /**
   * 处理异步组件的展示
   * @returns
   */
  onLazyComponent: (props: { children: ReactElement<LazyExoticComponent<FC<any>>> }) => ReactElement;
}

/**
 * 通过路由表创建符合要求的 ReactDomRouter 子元素
 * @param routeArr
 * @returns
 */
export const createRoutesChildren = (routeArr: RequiredRouteConfig[], options: CreateRoutesChildrenOptions) => {
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
    if (isReactLazyFC(Component)) {
      const OnLazyComponent = options.onLazyComponent;

      realRoute.element = <OnLazyComponent>
        <Component {...componentsProps} />
      </OnLazyComponent>;
    }

    // 放入的是一个 FC
    else if (
      isReactFC(Component) || isReactClassComponent(Component) ||
      isReactForwardFC(Component)
    ) realRoute.element = <Component {...componentsProps} />;

    // 放入的 JSX Element
    else if (isValidElement(Component)) {
      realRoute.element = Component;
    }

    else {
      printWarn(`createRoutesChildren: 传入的 component 不是一个有效的值`);
      realRoute.element = <></>;
    }

    return <Route {...(realRoute as PathRouteProps)} key={(name ?? meta.fullPath ?? index)}>
      {children && createRoutesChildren(children, options)}
    </Route>

  });
}


/**
 * 设置检索对象, 该函数在入口处调用, 在构建组件之前
 *
 */
export const reserveRoutes = <Routes extends Record<string, any>,>(presetRoutes: Routes) => {
  const runtimeContext = {
    routes: presetRoutes
  }

  return {
    /**
     * 检索, 取回 route 对象, 改函数的作用是为 js 构建工具提供清晰的构建流程, 防止出现未初始化而访问的情况
     *
     * @example
     * const { loginRoute } = retrieveRoutes(); // router/modules 中取出一个 route 对象
     *
     * @example
     * // Error 方式
     * import { loginRoute } from '@/router/modules'; // 这种方式是循环引用, 会让构建工具不知道先初始化谁
     * import { retrieveRoutes } from '@router/retrieve';
     * const Component = () => {
     *   loginRoute.xx
     *
     *   return <></>;
     * }
     *
     * @returns
     */
    retrieveRoutes: () => runtimeContext.routes
  }
}
