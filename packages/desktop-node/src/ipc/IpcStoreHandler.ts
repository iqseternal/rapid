import { app, type IpcMainInvokeEvent, type OpenDevToolsOptions } from 'electron';
import { IpcMain, IPC_EMITTER_TYPE, FrameworkIpcHandler } from '@rapid/framework';
import { IS_DEV, WINDOW_STATE_MACHINE_KEYS } from '@rapid/config/constants';
import { WindowService } from '@/service/WindowService';
import { setWindowOpenHandler } from '@/core/common/window';
import { screen } from 'electron';
import { PrinterService } from '@/service/PrinterService';
import { isNumber, isString, isUndefined } from '@suey/pkg-utils';
import { AppConfigService } from '@/service/AppConfigService';
import { UserConfigService } from '@/service/UserConfigService';
import { AppStore, APP_STORE_KEYS, StoreKeyToMap } from '@/service/AppStoreService';

type IpcStoreType = StoreKeyToMap[APP_STORE_KEYS.APP_STORE];

@IpcMain.IpcController()
export class IpcStoreHandler extends FrameworkIpcHandler {
  public readonly id = 'IpcStore';
  private readonly appStore = AppStore.getInstance(APP_STORE_KEYS.APP_STORE);

  /**
   * 从 store 中获取 value
   * @param windowService
   * @param key
   * @param defaultValue
   * @returns
   */
  @IpcMain.Handler()
  get<Key extends keyof IpcStoreType, V extends IpcStoreType[Key]>(windowService: WindowService, key: Key, defaultValue?: V) {
    if (defaultValue) return this.appStore.get(key, defaultValue);
    return this.appStore.get(key);
  }

  /**
   * 从 store 中设置 value
   * @param windowService
   * @param key
   * @param value
   * @returns
   */
  @IpcMain.Handler()
  set<Key extends keyof IpcStoreType, V extends IpcStoreType[Key]>(windowService: WindowService, key: Key, value: V) {
    return this.appStore.set(key, value);
  }

  /**
   * 查看 store 中是否含有某个 key
   * @param windowService
   * @param key
   * @returns
   */
  @IpcMain.Handler()
  has<Key extends keyof IpcStoreType>(windowService: WindowService, key: Key) {
    return this.appStore.has(key)
  }

  /**
   * 重置 store 中某些值
   * @param windowService
   * @param keys
   * @returns
   */
  @IpcMain.Handler()
  reset<Key extends keyof IpcStoreType>(windowService: WindowService, ...keys: Key[]) {
    return this.appStore.reset(...keys);
  }

  /**
   * 删除 store 中得某些 value
   * @param windowService 、
   * @param key
   * @returns
   */
  @IpcMain.Handler()
  delete<Key extends keyof IpcStoreType>(windowService: WindowService, key: Key) {
    return this.appStore.delete(key);
  }

  /**
   * 清空 store
   * @param windowService
   * @returns
   */
  @IpcMain.Handler()
  clear(windowService: WindowService) {
    return this.appStore.clear();
  }
}
