import { R as RApp, a as RdSKin } from '../declare-B7m5-E3M.js';
import 'react';
import 'zustand/middleware';
import 'zustand';
import 'tldraw';

declare global {
  interface Window {
    readonly rApp: RApp;
    readonly cssVars: RdSKin.CssVarsSheet;
  }

  const rApp: RApp;
  const cssVars: RdSKin.CssVarsSheet;
}
