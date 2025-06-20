import type * as SKIN from 'rd/code/browser/skin';

import 'reflect-metadata';

declare global {


  interface Window {
    React: typeof import('react');
    ReactDOM: typeof import('react-dom/client');
    ReactRouterDOM: typeof import('react-router-dom');

    /**
     * extension sdk
     */
    readonly __define_extension__?: Rapid.RExtension;
  }
}

