/**
 * ==========================================
 * preload 注入变量 Api
 * ==========================================
 */
import { ExposeService } from './service/ExposeService';

import { electronAPI } from '@electron-toolkit/preload';
import type { ElectronAPI } from '@electron-toolkit/preload';

import type { PrinterType } from './modules/printer';
import { printer } from './modules/printer';

import type { IpcStore } from './modules/stores';
import { appStore } from './modules/stores';
import type { AppStoreType } from 'rd/base/main/stores';

import { IpcBCaller } from '@suey/elec-ipc-core';
import { ipcActions, ipcBCaller } from './modules/ipc';
import type { IpcActions, IpcProcessorSheet } from './modules/ipc';

/**
 * 实际上是可以直接 autoExpose 暴露 api, 但是 Web 项目需要扩展类型才能够拥有很好的 TS 支持
 */
export interface ExposeApi {
  readonly electron: ElectronAPI;

  /**
   * 打印器对象
   */
  readonly printer: PrinterType;

  readonly ipcBCaller: IpcBCaller<IpcProcessorSheet>;

  /**
   * IPC 事件
   */
  readonly ipcActions: IpcActions;

  /**
   * 应用的 store
   */
  readonly stores: Exclude<
    {
      readonly appStore: IpcStore<AppStoreType>;
    },
    | 'features'
  >;
}

const exposeService = new ExposeService<ExposeApi>();

exposeService.autoExpose({
  electron: electronAPI,
  printer: printer,
  ipcBCaller: ipcBCaller,
  ipcActions,
  stores: {
    appStore
  }
})


