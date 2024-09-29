/// <reference types="./module.d.ts" />

import type { RUNTIME_PLATFORMS, ENV, PLATFORMS_ON_DESKTOP, PLATFORMS_ON_MOBILE, PLATFORMS_ON_BROWSER } from '../enums';

declare global {
  /** 注入变量的接口, 用于创建注入变量集合 */
  interface InjectionVariables {
    CURRENT_PLATFORM: PLATFORMS_ON_DESKTOP | PLATFORMS_ON_MOBILE | PLATFORMS_ON_BROWSER;
    CURRENT_RUNTIME_PLATFORM: RUNTIME_PLATFORMS;
    CURRENT_ENV: ENV;
  }

  // 注入变量仅用 const 方式访问
  export const CURRENT_PLATFORM: PLATFORMS_ON_DESKTOP | PLATFORMS_ON_MOBILE | PLATFORMS_ON_BROWSER;
  export const CURRENT_RUNTIME_PLATFORM: RUNTIME_PLATFORMS;

  export const CURRENT_ENV: ENV;
}

export {};
