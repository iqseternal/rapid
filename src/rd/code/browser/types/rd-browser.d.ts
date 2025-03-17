import type * as SKIN from 'rd/code/browser/skin';
import type * as RA from 'rd/code/browser/declare';

declare global {
  interface Window {
    readonly rApp: RA.RApp;
    readonly cssVars: SKIN.RdSKin.CssVarsSheet;
  }

  const rApp: RA.RApp;
  const cssVars: SKIN.RdSKin.CssVarsSheet;
}

