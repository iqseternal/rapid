import type { ExposeApi } from 'rd/code/sandbox';

import type * as RdSandbox from 'rd/code/sandbox';

// Sandbox
declare global {
  /**
   * 扩展 Window 含有 Electron Api 声明规则
   *
   * ```tsx
   * window.electron.ipcRenderer.invoke('xxx');
   * ```
   */
  interface Window extends ExposeApi { }

  /**
   * 注入的 electron 对象
   */
  const electron: RdSandbox.ElectronAPI;

  /**
   * 注入的 printer 打印日志对象
   */
  const printer: RdSandbox.PrinterServer;

  /**
   * 注入的 ipc 对象
   */
  const ipcActions: RdSandbox.IpcActions;
}

export {};
