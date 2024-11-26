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

import type { IpcActions } from './actions';
import { ipcActions } from './actions';

export type { printerServer };

export type { HandleHandlers, OnHandlers, ExceptionErrorMsgData, Exception } from './server/electron';

export type { IpcActions };

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
}

autoExpose<ExposeApi>({
  electron,
  printer: printerServer,
  ipcActions
});




