/**
 * ==========================================
 * 项目常量的编写
 * ==========================================
 */
import { PLATFORMS, ENV } from '../../../target.config';
import { CONFIG } from './config';

export * from './config';

export * from './store';

// export * from './ipc';

export * from './others';

export { PLATFORMS, ENV };

// 运行的操做系统环境
export const IS_WINDOWS = CURRENT_PLATFORM === PLATFORMS.WINDOWS;
export const IS_MAC = CURRENT_PLATFORM === PLATFORMS.MAC;
export const IS_LINUX = CURRENT_PLATFORM === PLATFORMS.LINUX;
// 是否构建 Web 平台代码
export const IS_WEB = CURRENT_PLATFORM === PLATFORMS.WEB;

// 当前的开发环境
export const IS_DEV = CURRENT_ENV === ENV.DEV;
export const IS_PROD = CURRENT_ENV === ENV.PROD;

/** 自定义文件的扩展名 */
export const EXTENSIONS = {
  /** 自定义图纸数据文档的扩展名属性 */
  DOCS: {
    /** 文档名称 */
    NAME: `${CONFIG.PROJECT}文档`,
    /** 文档的默认扩展名 */
    EXTENSION: 'rd',
    /** 视为文档的所有扩展名类型 */
    EXTENSIONS: ['rd']
  },
  STORE: {
    NAME: `Store`,
    EXTENSION: 'rdc',
    EXTENSIONS: ['rdc']
  }
};

export enum EXPORTS_EXTENSIONS {
  SVG = 'svg',
  PNG = 'png',
  JSON = 'json'
}
