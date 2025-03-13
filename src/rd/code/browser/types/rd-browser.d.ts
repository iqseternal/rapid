import type { RdSKin } from 'rd/code/browser/skin';

import type * as RA from 'rd/code/browser/declare';

// Browser: rApp
declare global {
  namespace Rapid { export = RA; }

  interface Window {
    readonly rApp: RA.RApp;
    readonly cssVars: RdSKin.CssVarsSheet;
  }

  const rApp: RA.RApp;
  const cssVars: RdSKin.CssVarsSheet;
}

