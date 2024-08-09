import { WindowService } from '@/service/WindowService';
import { toMakeIpcAction } from '@rapid/framework';
import { convertWindowService } from './middlewares';
import { appStore, appConfigStore, userConfigStore, AppStoreType } from '@/store';

const { makeIpcOnAction, makeIpcHandleAction } = toMakeIpcAction<[WindowService]>({
  handleMiddlewares: [convertWindowService]
});

export const ipcStoreGetStore = makeIpcHandleAction(
  'IpcStore/getStore',
  [],
  async () => {
    return appStore.store;
  }
);

export const ipcStoreGet = makeIpcHandleAction(
  'IpcStore/get',
  [],
  async <Key extends keyof AppStoreType, V extends Required<AppStoreType>[Key]>(_: WindowService, key: Key, defaultValue?: V) => {
    if (defaultValue) return appStore.get(key, defaultValue);
    return appStore.get(key);
  }
);

export const ipcStoreSet = makeIpcHandleAction(
  'IpcStore/set',
  [],
  async <Key extends keyof AppStoreType, V extends AppStoreType[Key]>(_: WindowService, key: Key, value: V) => {
    return appStore.set(key, value);
  }
);

export const ipcStoreReset = makeIpcHandleAction(
  'IpcStore/reset',
  [],
  async <Key extends keyof AppStoreType>(_: WindowService, ...keys: Key[]) => {
    return appStore.reset(...keys);
  }
);

export const ipcStoreHas = makeIpcHandleAction(
  'IpcStore/has',
  [],
  async <Key extends keyof AppStoreType>(_: WindowService, key: Key) => {
    return appStore.has(key);
  }
);

export const ipcStoreDelete = makeIpcHandleAction(
  'IpcStore/delete',
  [],
  async <Key extends keyof AppStoreType>(_: WindowService, key: Key) => {
    return appStore.delete(key)
  }
);

export const ipcStoreClear = makeIpcHandleAction(
  'IpcStore/clear',
  [],
  async (_: WindowService) => {
    return appStore.clear()
  }
);
