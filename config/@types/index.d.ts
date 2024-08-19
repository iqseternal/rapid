import type { PLATFORMS, ENV } from '../enums';

declare global {
  /** 注入变量的接口, 用于创建注入变量集合 */
  interface InjectionVariables {
    CURRENT_PLATFORM: PLATFORMS;
    CURRENT_ENV: ENV;
  }

  // 注入变量仅用 const 方式访问
  export const CURRENT_PLATFORM: PLATFORMS;
  export const CURRENT_ENV: ENV;
}

export {};
