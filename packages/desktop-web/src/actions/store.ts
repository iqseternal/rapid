import { StoreKeyMap, IPC_MAIN_WINDOW } from '@rapid/config/constants';

export class AppStore {
  static get<Key extends keyof StoreKeyMap>(key: Key, defaultValue?: StoreKeyMap[Key]) {
    return window.electron.ipcRenderer.invoke('IpcStore/get', key, defaultValue);
  }

  static set<Key extends keyof StoreKeyMap>(key: Key, value: StoreKeyMap[Key]) {
    return window.electron.ipcRenderer.invoke('IpcStore/set', key, value);
  }

  static delete<Key extends keyof StoreKeyMap>(key: Key) {
    return window.electron.ipcRenderer.invoke('IpcStore/delete', key);
  }

  static has<Key extends keyof StoreKeyMap>(key: Key) {
    return window.electron.ipcRenderer.invoke('IpcStore/has', key);
  }

  static reset<Key extends keyof StoreKeyMap>(...keys: Key[]) {
    return window.electron.ipcRenderer.invoke('IpcStore/reset', ...keys);
  }

  static clear() {
    return window.electron.ipcRenderer.invoke('IpcStore/clear');
  }
}

