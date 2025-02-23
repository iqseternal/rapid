/// <reference types="./module.d.ts" />

import type { RuntimePlatforms, Env, PlatformsOnDesktop, PlatformsOnMobile, PlatformsOnBrowser } from '../enums';

declare global {
  // 注入变量仅用 const 方式访问
  export const CURRENT_PLATFORM: PlatformsOnDesktop | PlatformsOnMobile | PlatformsOnBrowser;
  export const CURRENT_RUNTIME_PLATFORM: RuntimePlatforms;
  export const CURRENT_ENV: Env;
}

export {};
