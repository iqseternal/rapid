import type { AppStoreType } from '@/store';

export class AppStore {
  static getStore() {
    return window.electron.ipcRenderer.invoke('IpcStore/getStore');
  }

  static get<Key extends keyof AppStoreType>(key: Key, defaultValue?: AppStoreType[Key]) {
    return window.electron.ipcRenderer.invoke('IpcStore/get', key, defaultValue);
  }

  static set<Key extends keyof AppStoreType>(key: Key, value: AppStoreType[Key]) {
    return window.electron.ipcRenderer.invoke('IpcStore/set', key, value);
  }

  static delete<Key extends keyof AppStoreType>(key: Key) {
    return window.electron.ipcRenderer.invoke('IpcStore/delete', key);
  }

  static has<Key extends keyof AppStoreType>(key: Key) {
    return window.electron.ipcRenderer.invoke('IpcStore/has', key);
  }

  static reset<Key extends keyof AppStoreType>(...keys: Key[]) {
    return window.electron.ipcRenderer.invoke('IpcStore/reset', ...keys);
  }

  static clear() {
    return window.electron.ipcRenderer.invoke('IpcStore/clear');
  }
}

