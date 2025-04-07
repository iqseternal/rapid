import { R as RApp, a as RdSKin } from '../declare-CoJE51mV.js';
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
