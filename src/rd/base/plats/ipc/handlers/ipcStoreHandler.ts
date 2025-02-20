import { WindowService } from 'rd/base/plats/service/WindowService';
import { toMakeIpcAction } from 'rd/base/node/core/ipc';
import { convertWindowServiceMiddleware } from '../middlewares';
import { appStore, AppStoreType } from 'rd/base/node/store';

const { makeIpcHandleAction } = toMakeIpcAction<[WindowService]>({
  handleMiddlewares: [convertWindowServiceMiddleware]
});

/**
 * 为渲染进程提供获得 appStore 的能力
 */
export const ipcAppStoreGetStore = makeIpcHandleAction(
  'IpcStore/appStore/getStore',
  [],
  async () => {
    return appStore.store;
  }
);

/**
 * 渲染进程通过 key 获得一个存储在 appStore 中的数据
 */
export const ipcAppStoreGet = makeIpcHandleAction(
  'IpcStore/appStore/get',
  [],
  async <Key extends keyof AppStoreType, V extends Required<AppStoreType>[Key]>(_: WindowService, key: Key, defaultValue?: V) => {
    if (defaultValue) return appStore.get(key, defaultValue);
    return appStore.get(key);
  }
);

/**
 * 渲染进程通过 key 设置存储在 appStore 中的数据
 */
export const ipcAppStoreSet = makeIpcHandleAction(
  'IpcStore/appStore/set',
  [],
  async <Key extends keyof AppStoreType, V extends AppStoreType[Key]>(_: WindowService, key: Key, value: V) => {
    return appStore.set(key, value);
  }
);

/**
 * 渲染进程通过 key 重置某些 appStore 中的数据
 */
export const ipcAppStoreReset = makeIpcHandleAction(
  'IpcStore/appStore/reset',
  [],
  async <Key extends keyof AppStoreType>(_: WindowService, ...keys: Key[]) => {
    return appStore.reset(...keys);
  }
);

/**
 * 渲染进程通过 key 判断 appStore 中是否含有某个 key
 */
export const ipcAppStoreHas = makeIpcHandleAction(
  'IpcStore/appStore/has',
  [],
  async <Key extends keyof AppStoreType>(_: WindowService, key: Key) => {
    return appStore.has(key);
  }
);

/**
 * 渲染进程通过 key 删除 appStore 中的数据
 */
export const ipcAppStoreDelete = makeIpcHandleAction(
  'IpcStore/appStore/delete',
  [],
  async <Key extends keyof AppStoreType>(_: WindowService, key: Key) => {
    return appStore.delete(key)
  }
);

/**
 * 清空 appStore
 */
export const ipcAppStoreClear = makeIpcHandleAction(
  'IpcStore/appStore/clear',
  [],
  async (_: WindowService) => {
    return appStore.clear()
  }
);
