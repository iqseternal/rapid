
type NotHasChildrenRouteConfig = Omit<RouteConfig, 'children'>;

export type RequiredRouteConfig = Required<NotHasChildrenRouteConfig>
  & { meta: Required<RouteMeta> }
  & { children?: RequiredRouteConfig[]; };

/**
 * 制作一个基础路由对象, 路由对象中的数据会被自动地按照上下级补全
 * @returns
 */
export function makeRequireRouteConfig(route: RouteConfig, basePath = ''): RequiredRouteConfig {

  if (!route.meta) route.meta = {} as RouteMeta;
  if (!route.meta.title) route.meta.title = '';
  if (!route.meta.fullpath) {
    if (route.path.startsWith('/')) route.path = route.path.substring(1);

    route.meta.fullpath = basePath + '/' + route.path;
  }

  if (route.redirect) {
    if (!route.redirect.startsWith('/')) {
      route.redirect = route.meta.fullpath + (route.meta.fullpath.endsWith('/') ? '' : '/') + route.redirect;
    }
  }

  route.children = route.children ? route.children.map(child => {
    return makeRequireRouteConfig(child, route.meta?.fullpath);
  }) : [];

  return route as RequiredRouteConfig;
}

export const makeRoute = makeRequireRouteConfig;
