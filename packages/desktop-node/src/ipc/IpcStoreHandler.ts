import { WindowService } from '@/service/WindowService';
import { AppStore, APP_STORE_KEYS, StoreKeyToMap } from '@/service/AppStoreService';
import { toMakeIpcAction } from '@rapid/framework';
import { convertWindowService } from './middlewares';

const { makeIpcOnAction, makeIpcHandleAction } = toMakeIpcAction<[WindowService]>({
  handleMiddlewares: [convertWindowService]
});

const appStore = AppStore.getInstance(APP_STORE_KEYS.APP_STORE);
const userConfig = AppStore.getInstance(APP_STORE_KEYS.USER_CONFIG);
const appConfig = AppStore.getInstance(APP_STORE_KEYS.APP_CONFIG);

type IpcStoreType = StoreKeyToMap[APP_STORE_KEYS.APP_STORE];



export const ipcStoreGet = makeIpcHandleAction(
  'IpcStore/get',
  [],
  async <Key extends keyof IpcStoreType, V extends Required<IpcStoreType>[Key]>(_: WindowService, key: Key, defaultValue?: V) => {
    if (defaultValue) return appStore.get(key, defaultValue);
    return appStore.get(key);
  }
);

export const ipcStoreSet = makeIpcHandleAction(
  'IpcStore/set',
  [],
  async <Key extends keyof IpcStoreType, V extends IpcStoreType[Key]>(_: WindowService, key: Key, value: V) => {
    return appStore.set(key, value);
  }
);

export const ipcStoreReset = makeIpcHandleAction(
  'IpcStore/reset',
  [],
  async <Key extends keyof IpcStoreType>(_: WindowService, ...keys: Key[]) => {
    return appStore.reset(...keys);
  }
);

export const ipcStoreHas = makeIpcHandleAction(
  'IpcStore/has',
  [],
  async <Key extends keyof IpcStoreType>(_: WindowService, key: Key) => {
    return appStore.has(key);
  }
);

export const ipcStoreDelete = makeIpcHandleAction(
  'IpcStore/delete',
  [],
  async <Key extends keyof IpcStoreType>(_: WindowService, key: Key) => {
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
