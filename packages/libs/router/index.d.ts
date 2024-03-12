import type { RouteRecordRaw, RouteMeta, _RouteRecordBase } from 'vue-router';

export type RouteRecordSingleView = Omit<RouteRecordRaw, 'RouteRecordSingleView'>;
export type RouteRecordSingleViewWithChildren = Omit<RouteRecordRaw, 'RouteRecordSingleViewWithChildren'>;
export type RouteRecordMultipleViewsWithChildren = Omit<RouteRecordRaw, 'RouteRecordMultipleViewsWithChildren'>;
export type RouteRecordMultipleViews = Omit<RouteRecordRaw, 'RouteRecordMultipleViews'>;
export type RouteRecordRedirect = Omit<RouteRecordRaw, 'RouteRecordRedirect'>;

export type RequiredRouteRecordSingleView = (Omit<RouteRecordSingleView, 'meta' | 'children'> & { name: string;meta: Required<RouteMeta>;children: RequiredRouteRecordRaw[];components: never; });
export type RequiredRouteRecordSingleViewWithChildren = (Omit<RouteRecordSingleViewWithChildren, 'meta' | 'children'> & { name: string;meta: Required<RouteMeta>;children: RequiredRouteRecordRaw[];components: never; });
export type RequiredRouteRecordMultipleViewsWithChildren = (Omit<RouteRecordMultipleViewsWithChildren, 'meta' | 'children'> & { name: string;meta: Required<RouteMeta>;children: RequiredRouteRecordRaw[];components: never; });
export type RequiredRouteRecordMultipleViews = (Omit<RouteRecordMultipleViews, 'meta'> & { name: string;meta: Required<RouteMeta>;children: never;components: never; });
export type RequiredRouteRecordRedirect = (Omit<RouteRecordRedirect, 'meta'> & { name: string;meta: Required<RouteMeta>;children: never;components: never; });

export type RequiredRouteRecordRaw =
  RequiredRouteRecordSingleView |
  RequiredRouteRecordSingleViewWithChildren |
  RequiredRouteRecordMultipleViewsWithChildren |
  RequiredRouteRecordMultipleViews |
  RequiredRouteRecordRedirect;

export type CustomRouteRecordSingleView = Omit<RouteRecordSingleView, 'children'> & { name: string;children?: CustomRouteRecordRaw[]; };
export type CustomRouteRecordSingleViewWithChildren = Omit<RouteRecordSingleViewWithChildren, 'children'> & { name: string;children?: CustomRouteRecordRaw[]; };
export type CustomRouteRecordMultipleViewsWithChildren = Omit<RouteRecordMultipleViewsWithChildren, 'children'> & { name: string;children?: CustomRouteRecordRaw[]; };
export type CustomRouteRecordMultipleViews = (Omit<RouteRecordMultipleViews, 'children'> & { name: string;children: never; });
export type CustomRouteRecordRedirect =(Omit<RouteRecordRedirect, 'children'> & { name: string;children: never; });

export type CustomRouteRecordRaw =
  CustomRouteRecordSingleView |
  CustomRouteRecordSingleViewWithChildren |
  CustomRouteRecordMultipleViewsWithChildren |
  CustomRouteRecordMultipleViews |
  CustomRouteRecordRedirect;
