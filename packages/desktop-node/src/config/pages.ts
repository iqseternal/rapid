/**
 * ==========================================
 * 页面 常量编写, 关于页面入口路径的编写
 * ==========================================
 */

import { is } from '@electron-toolkit/utils';
import { join } from 'path';
import { IS_DEV } from '@rapid/config/constants';

const devPagesPrefixUrl = '/src/pages/';

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
const makeStartUrl = (url: string, prefix = '', extension = 'html') => {
  if (is.dev && process.env['ELECTRON_RENDERER_URL'])
    return `${process.env['ELECTRON_RENDERER_URL']}${devPagesPrefixUrl}${url}/${prefix}.${extension}`;

  return join(__dirname, `../renderer/${devPagesPrefixUrl}${url}/${prefix}.${extension}`);
}

/** 主窗口 */
const PAGES_WINDOW_MAIN_NAME = 'index';
export const PAGES_WINDOW_MAIN = makeStartUrl(PAGES_WINDOW_MAIN_NAME, PAGES_WINDOW_MAIN_NAME);

/** 设置窗口 */
const PAGES_WINDOW_SETTING_NAME = 'setting';
export const PAGES_WINDOW_SETTING = makeStartUrl(PAGES_WINDOW_SETTING_NAME, PAGES_WINDOW_SETTING_NAME);

/** 弹窗窗口 */
const PAGES_WINDOW_DIALOG_NAME = 'dialog';
export const PAGES_WINDOW_DIALOG = makeStartUrl(PAGES_WINDOW_DIALOG_NAME, PAGES_WINDOW_DIALOG_NAME);

/** 汇报 BUG 窗口 */
const PAGES_WINDOW_REPORT_BUGS_NAME = 'reportBugs';
export const PAGES_WINDOW_REPORT_BUGS = makeStartUrl(PAGES_WINDOW_REPORT_BUGS_NAME, PAGES_WINDOW_REPORT_BUGS_NAME);
