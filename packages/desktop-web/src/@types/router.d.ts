import type { FC } from 'react';
import type { PathRouteProps } from 'react-router-dom';

declare global {
  interface RouteMeta {
    title: string;
    windowTitle?: string;
    icon?: IconRealKey;
    fullpath?: string;
  }

  interface RouteBaseConfig extends PathRouteProps {
    path: string;
    name: string;
    meta?: RouteMeta;
    component?: FC | React.ReactElement | React.LazyExoticComponent<() => JSX.Element>;
    redirect?: string;
    children?: RouteConfig[];
  }

  declare type RouteConfig =
    RouteBaseConfig;
}

export {};
