import { ipcRenderer } from 'electron';
import { toNil } from '@suey/pkg-utils';
import type { AppStoreType as RAppStoreType } from 'rd/base/main/stores';
import type { IpcProcessorsCompileSheet, IpcProcessorSheet } from '../ipc/ipcBCaller';
import { IpcBCaller } from '@suey/elec-ipc-core';
import type { IpcCompatibleProcessor, MutateProcessorSheet } from '@suey/elec-ipc-core';
import type { IpcStore } from './declare';

import type { AppStoreType } from 'rd/base/main/stores/appStore';

import type * as StoreIpcProcessors from 'rd/base/main/ipc/handlers/ipcStoreHandler';

type IpcStoreProcessorsCompileSheet = {
  readonly [Key in keyof typeof StoreIpcProcessors]: (typeof StoreIpcProcessors)[Key] extends IpcCompatibleProcessor ? (typeof StoreIpcProcessors)[Key] : never;
};

const ipcStoreBCaller = new IpcBCaller<MutateProcessorSheet<IpcStoreProcessorsCompileSheet>>();

export const appStore: IpcStore<AppStoreType> = {
  getStore: (...args) => ipcStoreBCaller.invoke('IpcStore/appStore/getStore', ...args),

  get: (...args) => ipcStoreBCaller.invoke('IpcStore/appStore/get', ...args) as any,

  set: (...args) => ipcStoreBCaller.invoke('IpcStore/appStore/set', ...args),

  delete: (...args) => ipcStoreBCaller.invoke('IpcStore/appStore/delete', ...args),

  has: (...args) => ipcStoreBCaller.invoke('IpcStore/appStore/has', ...args),

  reset: (...args) => ipcStoreBCaller.invoke('IpcStore/appStore/reset', ...args),

  clear: (...args) => ipcStoreBCaller.invoke('IpcStore/appStore/clear', ...args)
} as const;
