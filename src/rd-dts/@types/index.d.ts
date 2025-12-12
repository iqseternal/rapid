/// <reference types="./module.d.ts" />

declare global {
  /**
   * 当前是否为开发环境
   */
  const IS_DEV: boolean;
  /**
   * 当前是否为生产环境
   * @description 与 IS_DEV 相反
   */
  const IS_PROD: boolean;

  /**
   * 当前的对标平台是否为 Windows
   */
  const IS_WINDOWS: boolean;
  // const IS_MAC: boolean;
  // const IS_LINUX: boolean;

  /**
   * 当前产品的输出平台是否为 桌面端
   */
  const IS_DESKTOP: boolean;
  // const IS_MOBILE: boolean;
  // const IS_BROWSER: boolean;
}

export {};
