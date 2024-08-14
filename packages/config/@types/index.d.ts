import type { PLATFORMS, ENV } from '../constants';

/**
 * 在项目运行的是否就需要注入这些变量
 */
declare global {
  /** 构建的平台, 具体请查看根目录 */
  declare var CURRENT_PLATFORM: PLATFORMS;
  /** 构建的环境, 具体请查看根目录 */
  declare var CURRENT_ENV: ENV;
}

export {};
