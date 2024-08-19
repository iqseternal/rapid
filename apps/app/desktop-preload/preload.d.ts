/**
 * ==========================================
 * preload 需要的类型声明
 * ==========================================
 */
import type { NodeProcess, IpcRenderer as BaseIcpRenderer, WebFrame, IpcRendererListener } from '@electron-toolkit/preload';
import type { CutHead } from '@suey/pkg-utils';
import type * as actions from '../desktop-node/src/ipc';

export type IpcRendererEvent = Parameters<IpcRendererListener>[0];

// 引入所有的 Action, 这就是为什么不许 ipc/index.ts 到处多余的变量
export type AllAction = typeof actions;

// 创建句柄类型, 例如: { 'IpcStore/get': (key: string) => Promise<string> }
export type Handlers = {
  [Key in keyof AllAction as AllAction[Key]['channel']]:
  (...args: CutHead<Parameters<AllAction[Key]['action']>>)
    => ReturnType<AllAction[Key]['action']> extends Promise<any>
    ? ReturnType<AllAction[Key]['action']>
    : Promise<ReturnType<AllAction[Key]['action']>>;
}

/**
 * 原本的 IcpRenderer 返回类型为 Promise<any>, 所需需要自己重新修改一下返回值
 * 需要先 Omit 排除, 然后再编写自己的类型, 否则会覆盖失败
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

/**
 * 重新创建 ElectronAPI, 来覆盖 window.electron 的类型
 */
export interface ElectronAPI {
  ipcRenderer: IpcRenderer;
  webFrame: WebFrame;
  process: NodeProcess;
}

