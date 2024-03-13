import type { BrowserWindow } from 'electron';
import type { PLATFORMS, ENV } from '../constants';

declare global {
  /** 基本回调函数 */
  type BaseCb = () => void;

  /** 主进程对于窗口的回调函数 */
  type WindowCb = (window: BrowserWindow) => void;

  /** 构建的平台, 具体请查看根目录 */
  var CURRENT_PLATFORM: PLATFORMS;
  var CURRENT_ENV: ENV;
}

export {};
