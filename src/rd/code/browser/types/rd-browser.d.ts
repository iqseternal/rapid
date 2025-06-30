import type * as SKIN from 'rd/code/browser/skin';

import 'reflect-metadata';

declare global {


  interface Window {
    readonly React: typeof import('react');
    readonly ReactDOM: typeof import('react-dom/client');
    readonly ReactRouterDOM: typeof import('react-router-dom');
    readonly moment: typeof import('moment');
    readonly Antd: typeof import('antd');
    readonly spring: typeof import('@react-spring/web');
    readonly transitionGroup: typeof import('react-transition-group');

    /**
     * extension sdk
     */
    readonly __define_extension__?: Rapid.RExtension;
  }
}

