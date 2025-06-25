import type * as SKIN from 'rd/code/browser/skin';

import 'reflect-metadata';

declare global {


  interface Window {
    readonly React: typeof import('react');
    readonly ReactDOM: typeof import('react-dom/client');
    readonly ReactRouterDOM: typeof import('react-router-dom');

    /**
     * extension sdk
     */
    readonly __define_extension__?: Rapid.RExtension;
  }
}

