import type { FC, ReactElement, LazyExoticComponent } from 'react';
import type { PathRouteProps } from 'react-router-dom';
import type { RedirectProps } from '@rapid/libs-web/components/Redirect';

declare global {
  interface RouteMeta {
    title: string;
    windowTitle?: string;
    icon?: IconRealKey;
    fullPath?: string;
  }

  interface RouteBaseConfig extends PathRouteProps {
    path: string;
    name: string;
    meta?: RouteMeta;
    component?: FC | ReactElement | LazyExoticComponent<() => JSX.Element>;
    redirect?: RedirectProps['from'];
    children?: RouteConfig[];
  }

  declare type RouteConfig =
    RouteBaseConfig;
}

export {};
