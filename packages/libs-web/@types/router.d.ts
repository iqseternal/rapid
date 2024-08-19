import type { FC, ReactElement, LazyExoticComponent, JSX } from 'react';
import type { PathRouteProps } from 'react-router-dom';
import type { RedirectProps } from '../components/Redirect';

import type * as icons from '@ant-design/icons';

type IconRealKey = Exclude<keyof typeof icons, 'createFromIconfontCN' | 'default' | 'IconProvider' | 'setTwoToneColor' | 'getTwoToneColor'>;
type IconKey = IconRealKey | `icon-${string}`;

declare global {
  /**
   * RouteMeta 用户表示一个路由对象的元数据
   */
  interface RouteMeta {
    title: string;
    windowTitle?: string;
    icon?: IconKey;
    fullPath?: string;
  }

  /**
   * 表示路由对象的配置
   */
  interface RouteConfig extends Omit<PathRouteProps, 'children'> {
    path: string;
    name: string;
    meta?: RouteMeta;

    /** 让 component 支持多种配置方式 */
    component?: FC | ReactElement | LazyExoticComponent<() => JSX.Element>;
    redirect?: RedirectProps['from'];

    children?: RouteConfig[];
  }
}

export {};
