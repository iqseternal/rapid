import * as path from 'path';

/** 项目根目录 */
export const ROOT_DIR = path.join(__dirname, '../../');

// =================================================================

export const DEV_DESKTOP_DIR = path.join(ROOT_DIR, './apps/app');

/** 项目开发 node 目录 */
export const DEV_DESKTOP_MAIN_DIR = path.join(DEV_DESKTOP_DIR, './desktop-node');
export const DEV_DESKTOP_PRELOAD_DIR = path.join(DEV_DESKTOP_DIR, './desktop-preload')
/** 项目开发 Web 目录 */
export const DEV_DESKTOP_WEB_DIR = path.join(DEV_DESKTOP_DIR, './desktop-web');

// =================================================================

/** 打包根目录 */
export const DIST_DIR = path.join(ROOT_DIR, './dist');

/** 打包 website 的输出目录 */
export const DIST_WEBSITE_DIR = path.join(DIST_DIR, './website');

/** 打包 Web 平台的输出目录 */
export const DIST_WEB_DIR = path.join(DIST_DIR, './web');
/** 打包 desktop 的输出目录 */
export const DIST_DESKTOP_DIR = path.join(DIST_DIR, './app');

export const DIST_DOC_DIR = path.join(DIST_DIR, './app-doc');
export const DIST_EXTENSIONS_DIR = path.join(DIST_DIR, './extensions');

// =================================================================

export const OUT_DESKTOP_ROOT_DIR = path.join(ROOT_DIR, './apps/app/out');

/** desktop out main 的输出目录 */
export const OUT_DESKTOP_MAIN_DIR = path.join(OUT_DESKTOP_ROOT_DIR, './main');
/** desktop out preload 的输出目录 */
export const OUT_DESKTOP_PRELOAD_DIR = path.join(OUT_DESKTOP_ROOT_DIR, './preload');
/** desktop out renderer 的输出目录 */
export const OUT_DESKTOP_RENDERER_DIR = path.join(OUT_DESKTOP_ROOT_DIR, './renderer');

export const DIRS = {
  ROOT_DIR,

  DEV_DESKTOP_DIR,
  DEV_DESKTOP_WEB_DIR, DEV_DESKTOP_MAIN_DIR, DEV_DESKTOP_PRELOAD_DIR,

  DIST_DIR,
  DIST_DOC_DIR, DIST_WEBSITE_DIR, DIST_WEB_DIR, DIST_DESKTOP_DIR, DIST_EXTENSIONS_DIR,

  OUT_DESKTOP_ROOT_DIR,
  OUT_DESKTOP_PRELOAD_DIR, OUT_DESKTOP_MAIN_DIR, OUT_DESKTOP_RENDERER_DIR
}
export default DIRS;



