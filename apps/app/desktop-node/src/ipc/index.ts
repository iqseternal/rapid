/**
 * 在这里导出 ipc 句柄, 但只导出 ipc 句柄, 不允许导出非 ipc 句柄变量
 */

export * from './handlers/ipcDocHandler';

export * from './handlers/ipcDevToolHandler';

export * from './handlers/ipcStoreHandler';

export * from './handlers/ipcWindowHandler';

export * from './handlers/ipcWindowDragHandler';

export * from './ipcBroadcast';
