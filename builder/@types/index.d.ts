/// <reference types="./module.d.ts" />

import type { RuntimePlatforms, Env, PlatformsOnDesktop, PlatformsOnMobile, PlatformsOnBrowser } from '../builder/enums';

declare global {
  // 注入变量仅用 const 方式访问
  // export const CURRENT_PLATFORM: PlatformsOnDesktop | PlatformsOnMobile | PlatformsOnBrowser;
  // export const CURRENT_RUNTIME_PLATFORM: RuntimePlatforms;
  // export const CURRENT_ENV: Env;

  const IS_DEV: boolean;
  const IS_PROD: boolean;

  const IS_WINDOWS: boolean;
  const IS_MAC: boolean;
  const IS_LINUX: boolean;

  const IS_DESKTOP: boolean;
  const IS_MOBILE: boolean;
  const IS_BROWSER: boolean;
}

export {};
