/**
 * ==========================================
 * 项目常量的编写
 * ==========================================
 */
import { PLATFORMS, ENV } from '../../../target.config';

export * from './config';

export * from './store';

// export * from './ipc';

export * from './others';

export { PLATFORMS, ENV };

// 运行的操做系统环境
export const IS_WINDOWS = CURRENT_PLATFORM === PLATFORMS.WINDOWS;
export const IS_MAC = CURRENT_PLATFORM === PLATFORMS.MAC;
export const IS_LINUX = CURRENT_PLATFORM === PLATFORMS.LINUX;

// 当前的开发环境
export const IS_DEV = CURRENT_ENV === ENV.DEV;
export const IS_PROD = CURRENT_ENV === ENV.PROD;

export enum EXTENSIONS {
  DOCS_EXT = 'rd',

  STORE_EXT = 'rdc'

}
