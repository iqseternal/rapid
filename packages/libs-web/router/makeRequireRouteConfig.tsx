import { isString } from '@rapid/libs';
import { RedirectProps } from '../components/Redirect';
import { Printer, printError } from '@suey/printer';

type NotHasChildrenRouteConfig = Omit<RouteConfig, 'children'>;

export type RequiredRouteConfig = Omit<Required<NotHasChildrenRouteConfig>, 'meta'>
  & { meta: Required<RouteMeta> }
  & { children?: RequiredRouteConfig[]; };

const path = {
  joinTwo(path1: string, path2: string) {
    if (path1.endsWith('/')) path1 = path1.replaceAll(/\/+$/g, '');
    if (path2.startsWith('/')) path2 = path2.replaceAll(/^\/+/g, '');
    return path1 + '/' + path2;
  },
  join(...args: string[]) {
    return args.reduce((pre, cur) => path.joinTwo(pre, cur), '');
  }
}

/**
 * 制作一个基础路由对象, 路由对象中的数据会被自动地按照上下级补全
 * @returns
 */
export function makeRequireRouteConfig(route: RouteConfig, basePath = '', isRoot = true): RequiredRouteConfig {
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

  return route as RequiredRouteConfig;
}

export const makeRoute = makeRequireRouteConfig;
