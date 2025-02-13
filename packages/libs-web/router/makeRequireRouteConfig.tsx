import { isString } from '@rapid/libs';
import { printError } from '@suey/printer';

/**
 * 补全后的 RouteMeta
 */
export type CompletiveRouteMeta = RouteMeta & Pick<Required<RouteMeta>, 'fullPath' | 'title'>;

/**
 * 补全后的 RouteConfig
 */
export type CompletiveRouteConfig<RConfig extends RouteConfig = RouteConfig> = Omit<Omit<RConfig, 'children'>, 'meta'> & {
  meta: CompletiveRouteMeta;
  children: CompletiveRouteConfig<RConfig>[];
}

type PathJson<S1 extends string, S2 extends string> = (
  S1 extends `${infer P1}/`
  ? (S2 extends `/${infer P2}` ? `${P1}/${P2}` : `${S1}${S2}`)
  : (S2 extends `/${string}` ? `${S1}${S2}` : `${S1}/${S2}`)
);

const path = {
  joinTwo<P1 extends string, P2 extends string>(path1: P1, path2: P2): PathJson<P1, P2> {
    if (path1.endsWith('/')) path1 = path1.replaceAll(/\/+$/g, '') as P1;
    if (path2.startsWith('/')) path2 = path2.replaceAll(/^\/+/g, '') as P2;
    return path1 + '/' + path2 as PathJson<P1, P2>;
  },
  join(...args: string[]) {
    return args.reduce((pre, cur) => path.joinTwo(pre, cur), '');
  }
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
export function makeRequireRouteConfig(route: RouteConfig, basePath = '', isRoot = true): CompletiveRouteConfig<RouteConfig> {
  if (!route.meta) route.meta = {} as RouteMeta;
  if (!route.meta.title) route.meta.title = '';

  // path 是相对路径, 但是允许填写 /, 自动将这个 / 去除
  if (route.path.startsWith('/') && !isRoot) route.path = route.path.substring(1);

  // 如果没有处理 fullPath, 那么自动填充
  if (!route.meta.fullPath) route.meta.fullPath = path.join(basePath, route.path);

  // 解决重定向
  if (route.redirect) {
    if (isString(route.redirect)) {
      const redirect = route.redirect;

      // 重新向组件 props
      route.redirect = {
        from: route.meta.fullPath!,
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
    printError(`路由对象含有 children, 但是不存在 redirect ?`, route);
  }


  route.children = route.children ? route.children.map(child => {
    return makeRequireRouteConfig(child, route.meta?.fullPath, false);
  }) : [];

  return route as CompletiveRouteConfig;
}

export const makeRoute = makeRequireRouteConfig;
