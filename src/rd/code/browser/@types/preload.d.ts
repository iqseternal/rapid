import type { ExposeApi } from '@rapid/desktop-preload';
import type * as RPreload from 'node_modules/@rapid/desktop-preload';

declare global {
  /**
   * 声明 preload 线程的类型, 它向 renderer 线程暴露的 api, 以及部分扩展的类型接口
   */
  declare namespace RdPreload { export = RPreload; }

  /**
   * 扩展 Window 含有 Electron Api 声明规则
   *
   * ```tsx
   * window.electron.ipcRenderer.invoke('xxx');
   * ```
   */
  declare interface Window extends ExposeApi { }

  /**
   * 注入的 electron 对象
   */
  declare const electron: RdPreload.ElectronAPI;

  /**
   * 注入的 printer 打印日志对象
   */
  declare const printer: RdPreload.PrinterServer;

  /**
   * 注入的 ipc 对象
   */
  declare const ipcActions: RPreload.IpcActions;
}

export {};
