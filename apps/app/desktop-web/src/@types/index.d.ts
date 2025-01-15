import type { Rapid as RA } from '../declare.d';
import type { RdSKin } from '@/skin';

declare global {
  declare namespace Rapid { export = RA; }

  declare var cssVars: RdSKin.CssVarsSheet;
  declare const cssVars: RdSKin.CssVarsSheet;
}

export {};
