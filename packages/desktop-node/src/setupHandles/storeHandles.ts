import { app, type IpcMainInvokeEvent, type OpenDevToolsOptions } from 'electron';
import { IpcMainHandlers, IpcMain, IPC_EMITTER_TYPE, runAndErrorCallback, IpcMainHandler } from '@/framework';
import { IS_DEV, MainEventHandlers, StoreKeyMap, WINDOW_STATE_MACHINE_KEYS } from '@rapid/config/constants';
import { WindowService } from '@/service/WindowService';
import { setWindowOpenHandler } from '@/core/common/window';
import { screen } from 'electron';
import { ok, fail } from '@/core/common/ipcR';
import { PrinterService } from '@/service/PrinterService';
import { isNumber, isString, isUndefined } from '@suey/pkg-utils';
import { AppConfigService } from '@/service/AppConfigService';
import { UserConfigService } from '@/service/UserConfigService';

@IpcMain.IpcController()
export class IpcStore<Store extends StoreKeyMap = StoreKeyMap> extends IpcMainHandler {
  public readonly id = 'IpcStore';

  @IpcMain.Handler()
  get<Key extends keyof Store, V extends Store[Key]>(windowService: WindowService, key: Key, defaultValue?: V) {
    return appStore.get(key, defaultValue);
  }

  @IpcMain.Handler()
  set<Key extends keyof Store, V extends Store[Key]>(windowService: WindowService, key: Key, value: V) {
    return appStore.set(key, value);
  }

  @IpcMain.Handler()
  has<Key extends keyof Store>(windowService: WindowService, key: Key) {
    return appStore.has(key)
  }

  @IpcMain.Handler()
  reset<Key extends keyof Store>(windowService: WindowService, ...keys: Key[]) {
    return appStore.reset(...keys);
  }

  @IpcMain.Handler()
  delete<Key extends keyof Store>(windowService: WindowService, key: Key) {
    return appStore.delete(key);
  }

  @IpcMain.Handler()
  clear(windowService: WindowService) {
    return appStore.clear();
  }
}
