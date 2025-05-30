
import type { AppStoreType as RAppStoreType } from 'rd/base/main/stores';
import { IpcActionService } from 'rd/base/sandbox/service/IpcActionService';
import type { HandleHandlers } from './electron';

const ipcActionService = new IpcActionService<HandleHandlers>();

const appStoreActions = {
  getStore: ipcActionService.makeInvokeAction('IpcStore/appStore/getStore'),
  get: ipcActionService.makeInvokeAction('IpcStore/appStore/get'),
  set: ipcActionService.makeInvokeAction('IpcStore/appStore/set'),
  delete: ipcActionService.makeInvokeAction('IpcStore/appStore/delete'),
  has: ipcActionService.makeInvokeAction('IpcStore/appStore/has'),
  reset: ipcActionService.makeInvokeAction('IpcStore/appStore/reset'),
  clear: ipcActionService.makeInvokeAction('IpcStore/appStore/clear'),
} as const;

/**
 * 应用的 store 类型
 */
export interface AppStoreType {
  /**
   * 获取所有的 store
   */
  readonly getStore: () => ReturnType<HandleHandlers['IpcStore/appStore/getStore']>;
  /**
   * 获取 store 的值
   */
  readonly get: <Key extends keyof RAppStoreType>(key: Key, defaultValue?: RAppStoreType[Key]) => ReturnType<HandleHandlers['IpcStore/appStore/get']>;
  /**
   * 设置 store 的值
   */
  readonly set: <Key extends keyof RAppStoreType>(key: Key, value: RAppStoreType[Key]) => ReturnType<HandleHandlers['IpcStore/appStore/set']>;
  /**
   * 删除 store 的值
   */
  readonly delete: <Key extends keyof RAppStoreType>(key: Key) => ReturnType<HandleHandlers['IpcStore/appStore/delete']>;
  /**
   * 判断 store 是否存在
   */
  readonly has: <Key extends keyof RAppStoreType>(key: Key) => ReturnType<HandleHandlers['IpcStore/appStore/has']>;
  /**
   * 重置 store 的值
   */
  readonly reset: <Key extends keyof RAppStoreType>(...keys: Key[]) => ReturnType<HandleHandlers['IpcStore/appStore/reset']>;
  /**
   * 清空 store
   */
  readonly clear: () => ReturnType<HandleHandlers['IpcStore/appStore/clear']>;
}

export const appStore: AppStoreType = {
  getStore: (...args) => appStoreActions.getStore(...args),
  get: (...args) => appStoreActions.get(...args),
  set: (...args) => appStoreActions.set(...args),
  delete: (...args) => appStoreActions.delete(...args),
  has: (...args) => appStoreActions.has(...args),
  reset: (...args) => appStoreActions.reset(...args),
  clear: (...args) => appStoreActions.clear(...args),
} as const;
