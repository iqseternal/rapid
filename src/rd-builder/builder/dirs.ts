import * as path from 'path';

/**
 * 项目根目录
 */
export const ROOT_DIR = path.join(__dirname, '../../../');

/**
 * 打包根目录
 */
export const DIST_DIR = path.join(ROOT_DIR, './dist');

/**
 * 打包 website 的输出目录
 */
export const DIST_WEBSITE_DIR = path.join(DIST_DIR, './website');

/**
 * 打包 Web 平台的输出目录
 */
export const DIST_WEB_DIR = path.join(DIST_DIR, './web');

/**
 * 打包 desktop 的输出目录
 */
export const DIST_DESKTOP_DIR = path.join(DIST_DIR, './app');

/**
 * 打包 docs 的输出目录
 */
export const DIST_DOC_DIR = path.join(DIST_DIR, './app-doc');

/**
 * 打包插件的输出目录
 */
export const DIST_EXTENSIONS_DIR = path.join(DIST_DIR, './extensions');

/**
 * 目录对象
 */
export const DIRS = {
  ROOT_DIR,
  DIST_DIR,
  DIST_DOC_DIR,
  DIST_WEBSITE_DIR,
  DIST_WEB_DIR,
  DIST_DESKTOP_DIR,
  DIST_EXTENSIONS_DIR,
} as const;

export default DIRS;



