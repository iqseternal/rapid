import type * as SKIN from 'rd/code/browser/skin';
import type * as Rapid from 'rd/code/browser/declare';

declare global {
  interface Window {
    readonly rApp: Rapid.RApp;
    readonly cssVars: SKIN.RdSKin.CssVarsSheet;
  }

  interface Window {

    /**
     * extension sdk
     */
    readonly __define_extension__?: Rapid.RExtension;
  }

  const rApp: Rapid.RApp;

  const cssVars: SKIN.RdSKin.CssVarsSheet;
}

