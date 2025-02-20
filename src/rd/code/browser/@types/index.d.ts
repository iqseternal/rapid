/// <reference types="./override.d.ts" />
/// <reference types="./sandbox.d.ts" />
import type * as RA from '../declare';
import type { RdSKin } from '@/skin';

declare global {
  declare namespace Rapid { export = RA; }

  interface Window {
    readonly cssVars: RdSKin.CssVarsSheet;

    readonly rApp: RA.RApp;
  }

  declare const cssVars: RdSKin.CssVarsSheet;

  declare const rApp: RA.RApp;
}

export {};
