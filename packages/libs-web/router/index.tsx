import type { FC, ReactNode } from 'react';
import { isValidElement, memo, useEffect, useMemo } from 'react';
import { isString, isUnUseful, isUndefined, isUseful } from '@rapid/libs';
import type { PathRouteProps } from 'react-router-dom';
import { Route, useLocation } from 'react-router-dom';
import type { RedirectProps } from './Redirect';
import { Redirect } from './Redirect';
import { isReactClassComponent, isReactComponent, isReactFC, isReactForwardFC, isReactLazyFC, isReactMemoFC } from '../common';
import type { RouteConfig } from './declare';
import { Routes, HashRouter } from 'react-router-dom';

export type * from './declare';

export * from './makeRequireRouteConfig';

export interface RenderRoutesOptions {
  /**
   * 处理异步组件的展示
   * @returns
   */
  readonly onLazyComponent: FC<{

    readonly children: ReactNode
  }>;
}

/**
 * 通过路由表创建符合要求的 ReactDomRouter 子元素
 */
export function renderRoutes<RouteConfigArr extends RouteConfig[]>(routeArr: RouteConfigArr, options: RenderRoutesOptions) {

  return routeArr.map((route, index) => {
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
      const OnLazyComponent = options.onLazyComponent;

      realRoute.element = (
        <OnLazyComponent>
          <Component {...componentsProps} />
        </OnLazyComponent>
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
        {children && renderRoutes(children, options)}
      </Route>
    )
  });
}

// const runtimeContext = {
//   routes: {} as Record<string, RouteConfig>
// }

// @ts-ignore: s
// const reserveRoutes = <Routes extends Record<string, RouteConfig>>(presetRoutes: Routes) => {
//   Reflect.ownKeys(presetRoutes).forEach(routeKey => {
//     const route = presetRoutes[routeKey as keyof Routes];

//     if (isUnUseful(route)) return;

//     runtimeContext.routes[routeKey as string] = route;
//   })
// }

// function useRoute<RouteConfigGetter extends () => RouteConfig>(routeConfigGetter: RouteConfigGetter): ReturnType<RouteConfigGetter>;

// function useRoute(): readonly [{ route: RouteConfig | null }] | null;

// function useRoute<RouteConfigGetter extends () => RouteConfig>(routeConfigGetter?: RouteConfigGetter): ReturnType<RouteConfigGetter> | (readonly [{ route: RouteConfig | null }] | null) {

//   if (isUnUseful(routeConfigGetter)) {
//     const location = useLocation();

//     const [shallowState] = useShallowReactive(() => ({
//       route: runtimeContext.routes[location.pathname] ?? null
//     }))

//     useEffect(() => {

//       shallowState.route = runtimeContext.routes[location.pathname] ?? null;
//     }, [location.pathname]);

//     return [shallowState] as const;
//   }


//   const route = routeConfigGetter();

//   // @ts-ignore: '
//   return route;
// }

export interface RouterProps {
  readonly routes: RouteConfig[];

  readonly renderComponents: {
    readonly onLazyComponent: FC<{
      readonly children: ReactNode
    }>;
  }
}

export const Router = memo<RouterProps>((props) => {
  const { routes, renderComponents } = props;

  return (
    <Routes>
      {renderRoutes(routes, renderComponents)}
    </Routes>
  )
})

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
    retrieveRoutes: () => runtimeContext.routes,

    /**
     * react hook, 检索, 取回 route 对象,
     */
    useRetrieveRoute: <RouteKey extends keyof Routes, RouteSelector extends (routes: Routes) => Routes[RouteKey]>(selector: RouteSelector) => {
      return useMemo(() => selector(runtimeContext.routes), []);
    }
  }
}
