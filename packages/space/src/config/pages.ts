/**
 * ==========================================
 * 页面 常量编写, 关于页面入口路径的编写
 * ==========================================
 */

import { is } from '@electron-toolkit/utils';
import { join } from 'path';
import { IS_DEV } from '#constants/index';

/** Config , 并不存储在 JSON 中, 不希望用户更改 */
/**
 * 根据当前的环境获取URL
 *
 * dev: 获取URL
 * pro: 获取路径
 *
 * @param url
 * @returns
 */
const makeStartUrl = (url: string) => {
  if (IS_DEV && process.env['ELECTRON_RENDERER_URL'])
    return `${process.env['ELECTRON_RENDERER_URL']}/${url}`;

  return join(__dirname, `../renderer/${url}`);
}

// const PAGE_WINDOW_LOGIN_NAME = 'login.html';
// export const PAGES_WINDOW_LOGIN = makeStartUrl(PAGE_WINDOW_LOGIN_NAME);

const PAGES_WINDOW_MAIN_NAME = 'index.html';
export const PAGES_WINDOW_MAIN = makeStartUrl(PAGES_WINDOW_MAIN_NAME);

const PAGES_WINDOW_SETTING_NAME = 'setting.html';
export const PAGES_WINDOW_SETTING = makeStartUrl(PAGES_WINDOW_SETTING_NAME);

const PAGES_WINDOW_DIALOG_NAME = 'dialog.html';
export const PAGES_WINDOW_DIALOG = makeStartUrl(PAGES_WINDOW_DIALOG_NAME);
