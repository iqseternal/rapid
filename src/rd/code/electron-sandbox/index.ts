/**
 * ==========================================
 * preload 注入变量 Api
 * ==========================================
 */
import { ExposeService } from 'rd/base/sandbox/service/ExposeService';

import type { ElectronAPI } from './server/electron';
import { electron } from './server/electron';

import type { PrinterServer } from './server/printer';
import { printerServer } from './server/printer';

import type { AppStoreType } from './server/stores';
import { appStore } from './server/stores';

import * as ipcActions from './server/ipcActions';

export type { ElectronAPI };

export type { PrinterServer };

// export type { LoggerServer };

export type { HandleHandlers, OnHandlers, ExceptionErrorMsgData, Exception } from './server/electron';

export type { AppStoreType };

export type IpcActions = typeof ipcActions;

/**
 * 实际上是可以直接 autoExpose 暴露 api, 但是 Web 项目需要扩展类型才能够拥有很好的 TS 支持
 */
export interface ExposeApi {
  readonly electron: ElectronAPI;

  /**
   * 打印器对象
   */
  readonly printer: PrinterServer;

  /**
   * IPC 事件
   */
  readonly ipcActions: IpcActions;

  /**
   * 应用的 store
   */
  readonly stores: {
    readonly appStore: AppStoreType;
  }
}

const exposeService = new ExposeService<ExposeApi>();

exposeService.autoExpose({
  electron,
  printer: printerServer,
  ipcActions,
  stores: {
    appStore
  }
})


