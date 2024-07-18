/**
 * ==========================================
 * preload 需要的类型声明
 * ==========================================
 */
import type { NodeProcess, IpcRenderer as BaseIcpRenderer, WebFrame, IpcRendererListener, IpcRendererEvent } from '@electron-toolkit/preload';
import type { CutHead } from '@rapid/libs/types';
import type * as actions from '@/ipc';

export type AllAction = typeof actions;

export type Handlers = {
  [Key in keyof AllAction as AllAction[Key]['channel']]:
  (...args: CutHead<Parameters<AllAction[Key]['action']>>)
    => ReturnType<AllAction[Key]['action']> extends Promise<any>
    ? ReturnType<AllAction[Key]['action']>
    : Promise<ReturnType<AllAction[Key]['action']>>;
}

export type HandlerMethodTyped<Handler, HandlerMethod extends keyof Handler> = Handler[HandlerMethod];

/**
 * 原本的 IcpRenderer 返回类型为 Promise<any>, 所需需要自己重新修改一下返回值
 */
export type IpcRenderer =
Omit<
  BaseIcpRenderer,
  'invoke' | 'send' | 'sendSync' | 'on' | 'once'
> & {
  // 向主进程发送事件
  invoke<T extends keyof Handlers>(channel: T, ...args: Parameters<Handlers[T]>): ReturnType<Handlers[T]>;
  send<T extends keyof Handlers>(channel: T, ...args: Parameters<Handlers[T]>): void;
  sendSync<T extends keyof Handlers>(channel: T, ...args: Parameters<Handlers[T]>): void;

  on<T extends keyof Handlers>(channel: T, listener: (event: IpcRendererEvent, args: ReturnType<Handlers[T]>) => void): () => void;
  once<T extends keyof Handlers>(channel: T, listener: (event: IpcRendererEvent, args: ReturnType<Handlers[T]>) => void): void;
}

export interface ElectronAPI {
  ipcRenderer: IpcRenderer;
  webFrame: WebFrame;
  process: NodeProcess;
}

