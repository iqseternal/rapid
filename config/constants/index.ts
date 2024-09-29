/**
 * ==========================================
 * 项目常量的编写, 不要通过路径别名或者导入包的方式创建这个常量
 * ==========================================
 */
import { PLATFORMS_ON_DESKTOP, PLATFORMS_ON_BROWSER, PLATFORMS_ON_MOBILE, ENV, RUNTIME_PLATFORMS } from '../enums';
import { CONFIG } from './config';

export { SystemInformation } from './systemInfo';

export * from './config';

// export * from './store';

export * from './others';

export { PLATFORMS_ON_DESKTOP, ENV };

// 运行的操做系统环境
export const IS_WINDOWS = CURRENT_PLATFORM === PLATFORMS_ON_DESKTOP.WINDOWS;
export const IS_MAC = CURRENT_PLATFORM === PLATFORMS_ON_DESKTOP.MAC;
export const IS_LINUX = CURRENT_PLATFORM === PLATFORMS_ON_DESKTOP.LINUX;

// 是否构建运行平台
export const IS_DESKTOP = CURRENT_RUNTIME_PLATFORM === RUNTIME_PLATFORMS.DESKTOP;
export const IS_MOBILE = CURRENT_RUNTIME_PLATFORM === RUNTIME_PLATFORMS.MOBILE;
export const IS_BROWSER = CURRENT_RUNTIME_PLATFORM === RUNTIME_PLATFORMS.BROWSER;

// 当前的开发环境
export const IS_DEV = CURRENT_ENV === ENV.DEV;
export const IS_PROD = CURRENT_ENV === ENV.PROD;

/** 自定义文件的扩展名 */
export const EXTENSIONS = {
  DOC: 'rd',

  APP_STORE: 'rdc',
  APP_CONFIG_STORE: 'json',
  USER_CONFIG_STORE: 'json',

  /** 自定义图纸数据文档的扩展名属性 */
  // DOCS: {
  //   /** 文档名称 */
  //   NAME: `${CONFIG.PROJECT}文档`,
  //   /** 文档的默认扩展名 */
  //   EXTENSION: 'rd',
  //   /** 视为文档的所有扩展名类型 */
  //   EXTENSIONS: ['rd']
  // }
} as const;
export type ExtensionType = typeof EXTENSIONS[keyof typeof EXTENSIONS];

export enum EXPORTS_EXTENSIONS {
  SVG = 'svg',
  PNG = 'png',
  JSON = 'json'
}
