import type * as SKIN from 'rd/code/browser/skin';

import 'reflect-metadata';

declare global {
  interface Window {

    /**
     * extension sdk
     */
    readonly __define_extension__?: Rapid.RExtension;
  }
}

