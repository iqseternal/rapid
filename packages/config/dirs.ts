import * as path from 'path';

const ROOT_DIR = path.join(__dirname, '../../');
const DIST_DIR = path.join(ROOT_DIR, './dist');

const DIST_WEBSIT_DIR = path.join(DIST_DIR, './website');
const DIST_DESCKTOP_DIR = path.join(DIST_DIR, './desktop');

const DIST_DESCKTOP_MAIN_DIR = path.join(DIST_DESCKTOP_DIR, './main');
const DIST_DESCKTOP_PRELOAD_DIR = path.join(DIST_DESCKTOP_DIR, './prelod');
const DIST_DESCKTOP_RENDERER_DIR = path.join(DIST_DESCKTOP_DIR, './renderer');

const DESCKTOP_OUT_DIRS = {
  MAIN: path.join(ROOT_DIR, './out/main'),
  PRELOAD: path.join(ROOT_DIR, './out/preload'),
  RENDERER: path.join(ROOT_DIR, './out/renderer')
}

export const DIRS = {
  ROOT_DIR,
  DIST_DIR,

  DIST_WEBSIT_DIR,
  DIST_DESCKTOP_DIR,
  DIST_DESCKTOP_MAIN_DIR, DIST_DESCKTOP_PRELOAD_DIR, DIST_DESCKTOP_RENDERER_DIR,

  DESCKTOP_OUT_DIRS
}
