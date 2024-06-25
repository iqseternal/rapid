
type NotHasChildrenRouteConfig = Omit<RouteConfig, 'children'>;

export type RequiredRouteConfig = Required<NotHasChildrenRouteConfig>
  & { meta: Required<RouteMeta> }
  & { children?: RequiredRouteConfig[]; };

export function makeRequireRouteConfig(route: RouteConfig, basePath = ''): RequiredRouteConfig {

  if (!route.meta) route.meta = {} as RouteMeta;

  if (!route.meta.title) route.meta.title = '';

  if (!route.meta.fullpath) {
    route.meta.fullpath = basePath + (route.path.startsWith('/') ? '' : '/') + route.path;
  }

  route.children = route.children ? route.children.map(child => {
    return makeRequireRouteConfig(child, route.meta?.fullpath);
  }) : [];

  return route as RequiredRouteConfig;
}

export const makeRoute = makeRequireRouteConfig;
