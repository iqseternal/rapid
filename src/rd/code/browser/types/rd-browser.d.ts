import type * as SKIN from 'rd/code/browser/skin';
import type * as RA from 'rd/code/browser/declare';

declare global {
  interface Window {
    readonly rApp: RA.RApp;
    readonly cssVars: SKIN.RdSKin.CssVarsSheet;
  }

  interface Window {

    /**
     * extension sdk
     */
    readonly __define_extension__?: () => Extension;
  }

  const rApp: RA.RApp;

  const cssVars: SKIN.RdSKin.CssVarsSheet;
}

