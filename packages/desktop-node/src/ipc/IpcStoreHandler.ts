import { app, type IpcMainInvokeEvent, type OpenDevToolsOptions } from 'electron';
import { IpcMain, IPC_EMITTER_TYPE, FrameworkIpcHandler } from '@rapid/framework';
import { IS_DEV, StoreKeyMap, WINDOW_STATE_MACHINE_KEYS } from '@rapid/config/constants';
import { WindowService } from '@/service/WindowService';
import { setWindowOpenHandler } from '@/core/common/window';
import { screen } from 'electron';
import { PrinterService } from '@/service/PrinterService';
import { isNumber, isString, isUndefined } from '@suey/pkg-utils';
import { AppConfigService } from '@/service/AppConfigService';
import { UserConfigService } from '@/service/UserConfigService';
import { appStore } from '@/core';

@IpcMain.IpcController()
export class IpcStoreHandler extends FrameworkIpcHandler {
  public readonly id = 'IpcStore';

  @IpcMain.Handler()
  get<Key extends keyof StoreKeyMap, V extends StoreKeyMap[Key]>(windowService: WindowService, key: Key, defaultValue?: V) {
    if (defaultValue) return appStore.get(key, defaultValue);
    return appStore.get(key);
  }

  @IpcMain.Handler()
  set<Key extends keyof StoreKeyMap, V extends StoreKeyMap[Key]>(windowService: WindowService, key: Key, value: V) {
    return appStore.set(key, value);
  }

  @IpcMain.Handler()
  has<Key extends keyof StoreKeyMap>(windowService: WindowService, key: Key) {
    return appStore.has(key)
  }

  @IpcMain.Handler()
  reset<Key extends keyof StoreKeyMap>(windowService: WindowService, ...keys: Key[]) {
    return appStore.reset(...keys);
  }

  @IpcMain.Handler()
  delete<Key extends keyof StoreKeyMap>(windowService: WindowService, key: Key) {
    return appStore.delete(key);
  }

  @IpcMain.Handler()
  clear(windowService: WindowService) {
    return appStore.clear();
  }
}
