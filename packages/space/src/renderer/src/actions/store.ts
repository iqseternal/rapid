import { StoreKeyMap } from '#constants/store';
import { IPC_MAIN_WINDOW } from '#constants/ipc';

export class AppStore {
  static get<Key extends keyof StoreKeyMap>(key: Key, defaultValue?: StoreKeyMap[Key]) {
    return window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.STORE_GET, key, defaultValue);
  }

  static set<Key extends keyof StoreKeyMap>(key: Key, value: StoreKeyMap[Key]) {
    return window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.STORE_SET, key, value);
  }

  static delete<Key extends keyof StoreKeyMap>(key: Key) {
    return window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.STORE_DELETE, key);
  }

  static has<Key extends keyof StoreKeyMap>(key: Key) {
    return window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.STORE_HAS, key);
  }

  static reset<Key extends keyof StoreKeyMap>(...keys: Key[]) {
    return window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.STORE_RESET, ...keys);
  }

  static clear() {
    return window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.STORE_CLEAR);
  }
}

