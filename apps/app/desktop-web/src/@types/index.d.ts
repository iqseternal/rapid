import type { Rapid as RA } from '../declare.d';
import type { RdSKin } from '@/skin';

declare global {
  declare namespace Rapid { export = RA; }

  interface Window {
    readonly cssVars: RdSKin.CssVarsSheet
  }

  declare const cssVars: RdSKin.CssVarsSheet;
}

export {};
