import { useMemo } from 'react';

export type * from './types';

export * from './utils';

export * from './mods/Router';
export * from './mods/Redirect';

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
