/// <reference types="vite/client" />

import type { BrowserWindow } from 'electron';
import type { PLATFORMS, ENV } from '../constants';

declare global {
  /** 基本回调函数 */
  declare type BaseCb = () => void;

  /** 主进程对于窗口的回调函数 */
  declare type WindowCb = (window: BrowserWindow) => void;

  /** 构建的平台, 具体请查看根目录 */
  declare var CURRENT_PLATFORM: PLATFORMS;
  declare var CURRENT_ENV: ENV;
}

export {};
