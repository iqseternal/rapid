/// <reference types="../../../config/@types/index" />

import type { FC, ReactElement, CSSProperties } from 'react';
import type { RouteProps, PathRouteProps } from 'react-router-dom';
import type { LangTextKey, LangTextMap } from '@/i18';
import type { CSSObject } from 'styled-components';
import * as icons from '@ant-design/icons';

declare global {
  declare type IconRealKey =
    Exclude<
      Exclude<
        Exclude<
          Exclude<
            Exclude<
              keyof typeof icons
            , 'IconProvider'>
          , 'setTwoToneColor'>
        , 'getTwoToneColor'>
      , 'createFromIconfontCN'>
    , 'default'>;

  interface RouteMeta {
    title: string;
    windowTitle?: string;
    icon?: IconKey;
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

  interface BaseProps {
    children?: React.ReactNode;
    style?: CSSProperties;
    className?: string;
  };






}

export { };
