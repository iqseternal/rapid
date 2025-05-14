import { isString, Ansi } from '@rapid/libs';
import type { RouteMeta, RouteConfig } from './declare';

import path from 'path-browserify';

/**
 * 补全后的 RouteMeta
 */
export type CompleteRouteMeta = RouteMeta & Pick<Required<RouteMeta>, 'fullPath'>;

/**
 * 补全后的 RouteConfig
 */
export type CompleteRouteConfig<RConfig extends RouteConfig = RouteConfig> = Omit<Omit<RConfig, 'children'>, 'meta'> & {
  meta: CompleteRouteMeta;
  children: CompleteRouteConfig<RConfig>[];
}

/**
 * 制作一个基础路由对象, 路由对象中的数据会被自动地按照上下级 补全
 *
 * @example
 *
 * const route = makeRoute({
 *   path: 'home',
 *   meta: {
 *     title: '首页'
 *   },
 *   component: lazy(() => import('@/views/home')),
 *   children: [
 *     {
 *       path: 'user',
 *       meta: {
 *         title: '用户'
 *       }
 *     }
 *   ]
 * });
 * @returns
 */
export function makeRequireRouteConfig(route: RouteConfig, basePath = '', isRoot = true): CompleteRouteConfig<RouteConfig> {
  if (basePath.endsWith('/')) basePath = basePath.replaceAll(/\/+$/g, '');

  if (!route.meta) route.meta = {} as RouteMeta;
  if (route.path.startsWith('/') && !isRoot) {
    if (route.path !== '*') {
      if (!new RegExp(`^${basePath}(/.*|$)`).test(route.path)) {
        throw new Error(`子路由必须由父级路径前缀开始, ${route.path}`);
      }
    }
  }

  // 如果没有处理 fullPath, 那么自动填充
  if (!route.meta.fullPath) {
    if (route.path.startsWith('/')) route.meta.fullPath = route.path;
    else {
      route.meta.fullPath = path.join(basePath, route.path);
    }
  }

  // 解决重定向
  if (route.redirect) {
    if (isString(route.redirect)) {
      const redirect = route.redirect;

      // 重新向组件 props
      route.redirect = {
        from: route.meta.fullPath,
        to: redirect
      }
    }

    if (route.redirect) {
      // redirect 是一个相对路径
      if (!route.redirect.to.startsWith('/')) {
        route.redirect.to = path.join(route.meta.fullPath, route.redirect.to);
      }
    }
  }

  if (route.children && route.children.length !== 0 && !route.redirect) {
    Ansi.print(Ansi.red, '路由对象含有 children, 但是不存在 redirect ?');
  }

  route.children = route.children ? route.children.map(child => {
    return makeRequireRouteConfig(child, route.meta?.fullPath, false);
  }) : [];

  return route as CompleteRouteConfig;
}

export const makeRoute = makeRequireRouteConfig;
