
/// <reference types="../@types" />
/// <reference types="./web-module.d.ts" />

import type { Extension } from '@suey/rxp-meta';

declare global {


  interface Window {


    __define_extension__?: () => Extension;


  }
}

export {};
