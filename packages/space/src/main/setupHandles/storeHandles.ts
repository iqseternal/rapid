
import { setIpcMainHandle } from '#code/core/common/ipcR';
import { PrinterService } from '#code/service/PrinterService';
import { IPC_MAIN_WINDOW } from '#constants/ipc';

setIpcMainHandle(IPC_MAIN_WINDOW.STORE_GET, (e, key, defaultValue?) => ipcR(ok => ok(appStore.get(key) ?? defaultValue)));

setIpcMainHandle(IPC_MAIN_WINDOW.STORE_SET, (e, key, value) => ipcR(ok => ok(appStore.set(key, value))));

setIpcMainHandle(IPC_MAIN_WINDOW.STORE_HAS, (e, key) => ipcR(ok => ok(appStore.has(key))));

setIpcMainHandle(IPC_MAIN_WINDOW.STORE_RESET, (e, ...keys) => ipcR(ok => ok(appStore.reset(...keys))));

setIpcMainHandle(IPC_MAIN_WINDOW.STORE_DELETE, (e, key) => ipcR(ok => ok(appStore.delete(key))));

setIpcMainHandle(IPC_MAIN_WINDOW.STORE_CLEAR, (e) => ipcR(ok => ok(appStore.clear())));
