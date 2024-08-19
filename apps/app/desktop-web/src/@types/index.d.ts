import type { ExposeApi } from '@rapid/desktop-preload';

declare global {
  /**
   * 扩展 Window 含有 Electron Api 声明规则
   *
   * ```tsx
   * window.electron.ipcRenderer.invoke('xxx');
   * ```
   */
  declare interface Window extends ExposeApi {}

}

export {};
