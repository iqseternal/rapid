import * as path from 'path';

/** 项目根目录 */
export const ROOT_DIR = path.join(__dirname, '../../');

// =================================================================


/** 项目开发 node 目录 */
export const DEV_DESKTOP_NODE_DIR = path.join(ROOT_DIR, './packages/desktop-node');
/** 项目开发 Web 目录 */
export const DEV_DESKTOP_WEB_DIR = path.join(ROOT_DIR, './packages/desktop-web');

// =================================================================

/** 打包根目录 */
export const DIST_DIR = path.join(ROOT_DIR, './dist');

/** 打包 website 的输出目录 */
export const DIST_WEBSITE_DIR = path.join(DIST_DIR, './website');
/** 打包 Web 平台的输出目录 */
export const DIST_WEB_DIR = path.join(DIST_DIR, './web');
/** 打包 desktop 的输出目录 */
export const DIST_DESKTOP_DIR = path.join(DIST_DIR, './desktop');

export const DIST_DOC_DIR = path.join(DIST_DIR, './rapid-doc');

// =================================================================

export const OUT_DESKTOP_ROOT_DIR = path.join(ROOT_DIR, './out');

/** desktop out main 的输出目录 */
export const OUT_DESKTOP_MAIN_DIR = path.join(OUT_DESKTOP_ROOT_DIR, './main');
/** desktop out preload 的输出目录 */
export const OUT_DESKTOP_PRELOAD_DIR = path.join(OUT_DESKTOP_ROOT_DIR, './preload');
/** desktop out renderer 的输出目录 */
export const OUT_DESKTOP_RENDERER_DIR = path.join(OUT_DESKTOP_ROOT_DIR, './renderer');
