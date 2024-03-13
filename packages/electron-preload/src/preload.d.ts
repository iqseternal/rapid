/**
 * ==========================================
 * preload 需要的类型声明
 * ==========================================
 */
import type { ElectronAPI as BaseElectionAPI, NodeProcess, IpcRenderer as BaseIcpRenderer, WebFrame } from '@electron-toolkit/preload';
import type { IpcRendererEvent } from 'electron';
import type { IPC_MAIN_WINDOW, MainEventHandlers, RendererEventHandlers, STORE_KEYS } from '@rapid/config/constants';

/**
 * 原本的 IcpRenderer 返回类型为 Promise<any>, 所需需要自己重新修改一下返回值
 */
export type IpcRenderer =
Omit<
  BaseIcpRenderer,
  'invoke' | 'send' | 'sendSync' | 'on' | 'once'
> & {
  // 向主进程发送事件
  invoke<T extends keyof MainEventHandlers>(channel: T, ...args: Parameters<MainEventHandlers[T]>): Promise<ReturnType<MainEventHandlers[T]>>;
  send<T extends keyof MainEventHandlers>(channel: T, ...args: Parameters<MainEventHandlers[T]>): void;
  sendSync<T extends keyof MainEventHandlers>(channel: T, ...args: Parameters<MainEventHandlers[T]>): void;

  //
  on<T extends keyof RendererEventHandlers>(channel: T, listener: (event: IpcRendererEvent, args: ReturnType<RendererEventHandlers[T]>) => void): () => void;
  once<T extends keyof RendererEventHandlers>(channel: T, listener: (event: IpcRendererEvent, args: ReturnType<RendererEventHandlers[T]>) => void): void;
}

export interface ElectronAPI {
  ipcRenderer: IpcRenderer;
  webFrame: WebFrame;
  process: NodeProcess;
}

