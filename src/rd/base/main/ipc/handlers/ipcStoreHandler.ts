import { ipcMReceiver } from '@suey/elec-ipc-core';
import { convertWindowServiceMiddleware } from '../middlewares';
import { appStore, AppStoreType } from 'rd/base/main/stores';
import { WindowService } from 'rd/base/main/service/WindowService';

// 创建带有 WindowService 中间件的处理器工厂
const { makeProcessor, makeHandleProcessor } = ipcMReceiver.withProcessorFactory();

/**
 * 为渲染进程提供获得 appStore 的能力
 */
export const ipcAppStoreGetStore = makeHandleProcessor(
  'IpcStore/appStore/getStore',
  {},
  async () => {
    return appStore.store;
  }
);

/**
 * 渲染进程通过 key 获得一个存储在 appStore 中的数据
 */
export const ipcAppStoreGet = makeHandleProcessor(
  'IpcStore/appStore/get',
  {},
  async <Key extends keyof AppStoreType, V extends Required<AppStoreType>[Key]>(_: unknown, key: Key, defaultValue?: V) => {
    if (defaultValue) return appStore.get(key, defaultValue);
    return appStore.get(key);
  }
);

/**
 * 渲染进程通过 key 设置存储在 appStore 中的数据
 */
export const ipcAppStoreSet = makeHandleProcessor(
  'IpcStore/appStore/set',
  {},
  async <Key extends keyof AppStoreType, V extends AppStoreType[Key]>(_: unknown, key: Key, value: V) => {
    return appStore.set(key, value);
  }
);

/**
 * 渲染进程通过 key 重置某些 appStore 中的数据
 */
export const ipcAppStoreReset = makeHandleProcessor(
  'IpcStore/appStore/reset',
  {},
  async <Key extends keyof AppStoreType>(_: unknown, ...keys: Key[]) => {
    return appStore.reset(...keys);
  }
);

/**
 * 渲染进程通过 key 判断 appStore 中是否含有某个 key
 */
export const ipcAppStoreHas = makeHandleProcessor(
  'IpcStore/appStore/has',
  {},
  async <Key extends keyof AppStoreType>(_: unknown, key: Key) => {
    return appStore.has(key);
  }
);

/**
 * 渲染进程通过 key 删除 appStore 中的数据
 */
export const ipcAppStoreDelete = makeHandleProcessor(
  'IpcStore/appStore/delete',
  {},
  async <Key extends keyof AppStoreType>(_: unknown, key: Key) => {
    return appStore.delete(key)
  }
);

/**
 * 清空 appStore
 */
export const ipcAppStoreClear = makeHandleProcessor(
  'IpcStore/appStore/clear',
  {},
  async (_) => {
    return appStore.clear()
  }
);
