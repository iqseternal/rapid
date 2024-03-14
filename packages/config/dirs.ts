import * as path from 'path';

const ROOT_DIR = path.join(__dirname, '../../');
const DIST_DIR = path.join(ROOT_DIR, './dist');

const DIST_WEBSITE_DIR = path.join(DIST_DIR, './website');
const DIST_DESKTOP_DIR = path.join(DIST_DIR, './desktop');

const DIST_DESKTOP_MAIN_DIR = path.join(DIST_DESKTOP_DIR, './main');
const DIST_DESKTOP_PRELOAD_DIR = path.join(DIST_DESKTOP_DIR, './prelod');
const DIST_DESKTOP_RENDERER_DIR = path.join(DIST_DESKTOP_DIR, './renderer');

const DESKTOP_OUT_DIRS = {
  MAIN: path.join(ROOT_DIR, './out/main'),
  PRELOAD: path.join(ROOT_DIR, './out/preload'),
  RENDERER: path.join(ROOT_DIR, './out/renderer')
}

export const DIRS = {
  ROOT_DIR,
  DIST_DIR,

  DIST_WEBSITE_DIR,
  DIST_DESKTOP_DIR,
  DIST_DESKTOP_MAIN_DIR, DIST_DESKTOP_PRELOAD_DIR, DIST_DESKTOP_RENDERER_DIR,

  DESKTOP_OUT_DIRS
}
