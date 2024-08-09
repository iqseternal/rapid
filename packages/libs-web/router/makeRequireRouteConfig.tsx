
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

  if (route.path.startsWith('/') && !isRoot) route.path = route.path.substring(1);

  if (!route.meta.fullPath) route.meta.fullPath = path.join(basePath, route.path);
  if (route.redirect) {
    if (
      typeof route.redirect === 'string' &&
      !route.redirect.startsWith('/')
    ) route.redirect = path.join(route.meta.fullPath, route.redirect);
  }

  route.children = route.children ? route.children.map(child => {
    return makeRequireRouteConfig(child, route.meta?.fullPath, false);
  }) : [];

  return route as RequiredRouteConfig;
}

export const makeRoute = makeRequireRouteConfig;
