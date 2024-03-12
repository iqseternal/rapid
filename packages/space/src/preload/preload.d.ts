/**
 * ==========================================
 * preload 需要的类型声明
 * ==========================================
 */
import type { ElectronAPI as BaseElectionAPI, NodeProcess, IpcRenderer as BaseIcpRenderer, WebFrame } from '@electron-toolkit/preload';

import type { IPC_MAIN_WINDOW, MainEventHandlers, RendererEventHandlers, STORE_KEYS } from '#/constants';

/**
 * 原本的 IcpRenderer 返回类型为 Promise<any>, 所需需要自己重新修改一下返回值
 */
export interface IpcRenderer extends BaseIcpRenderer {
  // 向主进程发送事件
  invoke<T extends keyof MainEventHandlers, F = MainEventHandlers[T]>(channel: T, ...args: Parameters<F>): Promise<ReturnType<F>>;
  send<T extends keyof MainEventHandlers, F = MainEventHandlers[T]>(channel: T, ...args: Parameters<F>): void;
  sendSync<T extends keyof MainEventHandlers, F = MainEventHandlers[T]>(channel: T, ...args: Parameters<F>): void;

  //
  on<T extends keyof RendererEventHandlers, F = RendererEventHandlers[T]>(channel: T, listener: (event: IpcRendererEvent, args: ReturnType<F>) => void): void;
  once<T extends keyof RendererEventHandlers, F = RendererEventHandlers[T]>(channel: T, listener: (event: IpcRendererEvent, args: ReturnType<F>) => void): void;
}

export interface ElectronAPI extends BaseElectionAPI {
  ipcRenderer: IpcRenderer;
  webFrame: WebFrame;
  process: NodeProcess;
}

