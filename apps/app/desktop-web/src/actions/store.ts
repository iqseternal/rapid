import type { AppStoreType } from 'node_modules/@rapid/desktop-node/src/store';

export class AppStore {
  public static getStore() {
    return window.electron.ipcRenderer.invoke('IpcStore/appStore/getStore');
  }

  public static get<Key extends keyof AppStoreType>(key: Key, defaultValue?: AppStoreType[Key]) {
    return window.electron.ipcRenderer.invoke('IpcStore/appStore/get', key, defaultValue);
  }

  public static set<Key extends keyof AppStoreType>(key: Key, value: AppStoreType[Key]) {
    return window.electron.ipcRenderer.invoke('IpcStore/appStore/set', key, value);
  }

  public static delete<Key extends keyof AppStoreType>(key: Key) {
    return window.electron.ipcRenderer.invoke('IpcStore/appStore/delete', key);
  }

  public static has<Key extends keyof AppStoreType>(key: Key) {
    return window.electron.ipcRenderer.invoke('IpcStore/appStore/has', key);
  }

  public static reset<Key extends keyof AppStoreType>(...keys: Key[]) {
    return window.electron.ipcRenderer.invoke('IpcStore/appStore/reset', ...keys);
  }

  public static clear() {
    return window.electron.ipcRenderer.invoke('IpcStore/appStore/clear');
  }
}

