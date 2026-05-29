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
  interface Window extends ExposeApi {}

  const injector: RdSandbox.Injector;
}

export {};
