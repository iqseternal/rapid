/**
 * ==========================================
 * preload 需要的类型声明
 * ==========================================
 */
import type { ElectronAPI as BaseElectionAPI, NodeProcess, IpcRenderer as BaseIcpRenderer, WebFrame } from '@electron-toolkit/preload';
import type { IpcRendererEvent } from 'electron';

import type { CutHead } from '@rapid/libs/types';
import type { IpcDevToolHandler, IpcStoreHandler, IpcWindowHandler, IpcGraphicHandler, IpcDocHandler } from '../src/ipc';

export type PureHandler<T> = { [Key in keyof T]: T[Key]; }
export type NamedHandler<T> = {
  [Key in Exclude<keyof PureHandler<T>, symbol | 'id'> as `${PureHandler<T>['id']}/${Key}`]:
    T[Key] extends Function
      ? (...args: CutHead<Parameters<T[Key]>>) => ReturnType<T[Key]>
      : never;
}

export type Handlers =
  NamedHandler<IpcDevToolHandler> &
  NamedHandler<IpcStoreHandler> &
  NamedHandler<IpcGraphicHandler> &
  NamedHandler<IpcDocHandler> &
  NamedHandler<IpcWindowHandler>;

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
  invoke<T extends keyof Handlers>(channel: T, ...args: Parameters<Handlers[T]>): ReturnType<Handlers[T]> extends Promise ? ReturnType<Handlers[T]> : Promise<ReturnType<Handlers[T]>>;
  send<T extends keyof Handlers>(channel: T, ...args: Parameters<Handlers[T]>): void;
  sendSync<T extends keyof Handlers>(channel: T, ...args: Parameters<Handlers[T]>): void;

  //
  // on<T extends keyof RendererEventHandlers>(channel: T, listener: (event: IpcRendererEvent, args: ReturnType<RendererEventHandlers[T]>) => void): () => void;
  // once<T extends keyof RendererEventHandlers>(channel: T, listener: (event: IpcRendererEvent, args: ReturnType<RendererEventHandlers[T]>) => void): void;
}

export interface ElectronAPI {
  ipcRenderer: IpcRenderer;
  webFrame: WebFrame;
  process: NodeProcess;
}

