
import type { PathRouteProps } from 'react-router-dom';

declare global {
  interface RouteMeta {
    title: string;
    windowTitle?: string;
    icon?: IconRealKey;
    fullpath?: string;
  }

  interface RouteConfig extends PathRouteProps {
    path: string;
    name: string;
    meta?: RouteMeta;
    component?: FC | React.ReactElement | React.LazyExoticComponent<() => JSX.Element>;
    children?: RouteConfig[];
  }
}

export {};
