import type * as SKIN from 'rd/code/browser/skin';

declare global {
  interface Window {

    /**
     * extension sdk
     */
    readonly __define_extension__?: Rapid.RExtension;
  }
}

