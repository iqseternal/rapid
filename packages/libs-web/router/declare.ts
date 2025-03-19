

import type { FC, ReactElement, LazyExoticComponent, JSX, MemoExoticComponent } from 'react';
import type { PathRouteProps } from 'react-router-dom';
import type { RedirectProps } from './Redirect';

/**
 * RouteMeta 用户表示一个路由对象的元数据
 */
export interface RouteMeta {
  /**
   * 这个路由对象完整的 fullPath, 不填写会自动生成
   */
  fullPath?: string;
}

/**
 * 表示路由对象的配置
 */
export interface RouteConfig extends Omit<PathRouteProps, 'children'> {
  /**
   * 路径：默认是相对的
   */
  path: string;

  name: string;

  /**
   * 设置的元数据
   */
  meta?: RouteMeta;

  /**
   * 让 component 支持多种配置方式
   *
   */
  component?: FC | ReactElement | LazyExoticComponent<any> | MemoExoticComponent<any>;

  /**
   * 重定向参数, 参考重定向组件
   */
  redirect?: string | {
    from: RedirectProps['from'];
    to: RedirectProps['to'];
  };

  children?: RouteConfig[];
}

