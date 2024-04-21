import { IpcMain, FrameworkIpcHandler } from '@rapid/framework';
import { WindowService } from '@/service/WindowService';
import { AppStore, APP_STORE_KEYS, StoreKeyToMap } from '@/service/AppStoreService';

type IpcStoreType = StoreKeyToMap[APP_STORE_KEYS.APP_STORE];

@IpcMain.IpcController()
export class IpcStoreHandler extends FrameworkIpcHandler {
  public readonly id = 'IpcStore';
  private readonly appStore = AppStore.getInstance(APP_STORE_KEYS.APP_STORE);

  /**
   * 从 store 中获取 value
   * @param _
   * @param key
   * @param defaultValue
   * @returns
   */
  @IpcMain.Handler()
  get<Key extends keyof IpcStoreType, V extends Required<IpcStoreType>[Key]>(_: WindowService, key: Key, defaultValue?: V) {
    if (defaultValue) return this.appStore.get(key, defaultValue);
    return this.appStore.get(key);
  }

  /**
   * 从 store 中设置 value
   * @param _
   * @param key
   * @param value
   * @returns
   */
  @IpcMain.Handler()
  set<Key extends keyof IpcStoreType, V extends IpcStoreType[Key]>(_: WindowService, key: Key, value: V) {
    return this.appStore.set(key, value);
  }

  /**
   * 查看 store 中是否含有某个 key
   * @param _
   * @param key
   * @returns
   */
  @IpcMain.Handler()
  has<Key extends keyof IpcStoreType>(_: WindowService, key: Key) {
    return this.appStore.has(key)
  }

  /**
   * 重置 store 中某些值
   * @param _
   * @param keys
   * @returns
   */
  @IpcMain.Handler()
  reset<Key extends keyof IpcStoreType>(_: WindowService, ...keys: Key[]) {
    return this.appStore.reset(...keys);
  }

  /**
   * 删除 store 中得某些 value
   * @param _
   * @param key
   * @returns
   */
  @IpcMain.Handler()
  delete<Key extends keyof IpcStoreType>(_: WindowService, key: Key) {
    return this.appStore.delete(key);
  }

  /**
   * 清空 store
   * @returns
   * @param _
   */
  @IpcMain.Handler()
  clear(_: WindowService) {
    return this.appStore.clear();
  }
}
