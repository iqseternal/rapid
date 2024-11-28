/**
 * ==========================================
 * preload 注入变量 Api
 * ==========================================
 */
import { autoExpose } from './core';

import type { ElectronAPI } from './server/electron';
import { electron } from './server/electron';

import type { PrinterServer } from './server/printer';
import { printerServer } from './server/printer';

import type { AppStoreType } from './server/stores';
import { appStore } from './server/stores';

import { join } from 'path';
import { IS_PROD } from '@rapid/config/constants';

import * as ipcActions from './actions';

export type { printerServer };

export type { HandleHandlers, OnHandlers, ExceptionErrorMsgData, Exception } from './server/electron';

export type { AppStoreType };

export type IpcActions = typeof ipcActions;

/**
 * 实际上是可以直接 autoExpose 暴露 api, 但是 Web 项目需要扩展类型才能够拥有很好的 TS 支持
 */
export interface ExposeApi {
  electron: ElectronAPI;
  /**
   * 打印器对象
   */
  printer: PrinterServer;
  /**
   * IPC 事件
   */
  ipcActions: IpcActions;
  /**
   * 应用的 store
   */
  stores: {
    appStore: AppStoreType;
  },

  WEB_ROOT_DIR: () => string;
}

autoExpose<ExposeApi>({
  electron,
  printer: printerServer,
  ipcActions,
  stores: {
    appStore
  },
  WEB_ROOT_DIR: () => {
    if (IS_PROD) return join(process.cwd(), '/out/renderer/').replace(/\\/g, '/')

    return join(process.cwd(), '/desktop-web/public/').replace(/\\/g, '/')
  }
});




