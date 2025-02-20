/**
 * ==========================================
 * preload 需要的类型声明
 * ==========================================
 */
import type { NodeProcess, IpcRenderer as BaseIcpRenderer, WebFrame, IpcRendererListener } from '@electron-toolkit/preload';
import type { CutHead, ExtractNever, RPromiseLike } from '@rapid/libs';
import type { Exception, ExceptionErrorMsgData, IpcActionEvent, IpcActionType } from '../../desktop-node/src/core';
import { electronAPI } from '@electron-toolkit/preload';
import type * as actions from '../../desktop-node/src/ipc';

export const electron = electronAPI as ElectronAPI;

export type { Exception, ExceptionErrorMsgData }

/**
 * 将一个值转换为 Promise 值
 */
export type PromiseWithValue<Value> = Value extends Promise<any> ? Value : Promise<Value>;

/**
 * 用于编写 渲染进程 on 事件的 e 类型
 */
export type IpcRendererEvent = Parameters<IpcRendererListener>[0];

/**
 * 获取所有的 ipcAction
 */
export type AllAction = {
  readonly [Key in keyof typeof actions]: (typeof actions)[Key] extends IpcActionType<IpcActionEvent> ? (typeof actions)[Key] : never;
};

/**
 * 转换 ipcAction, 获取 key -> handler 的类型.
 * 传递 IpcActionEventType 以获得 HandleHandlers 或者 OnHandlers
 */
export type AllHandlers<IpcActionEventType extends IpcActionEvent> = {
  readonly [Key in keyof AllAction as AllAction[Key]['channel']]:
    AllAction[Key]['actionType'] extends IpcActionEventType
      ? (...args: CutHead<Parameters<AllAction[Key]['action']>>) => RPromiseLike<Awaited<PromiseWithValue<ReturnType<AllAction[Key]['action']>>>, Exception<ExceptionErrorMsgData>>
      : never;
}

export type HandleHandlers = ExtractNever<AllHandlers<IpcActionEvent.Handle>>;

export type OnHandlers = ExtractNever<AllHandlers<IpcActionEvent.On>>;

/**
 * 原本的 IcpRenderer 返回类型为 Promise<any>, 所需需要自己重新修改一下返回值
 * 需要先 Omit 排除, 然后再编写自己的类型, 否则会覆盖失败
 */
export type IpcRenderer =
Omit<
  BaseIcpRenderer,
  'invoke' | 'send' | 'sendSync'
> & {
  // 向主进程发送事件
  invoke<T extends keyof HandleHandlers>(channel: T, ...args: Parameters<HandleHandlers[T]>): ReturnType<HandleHandlers[T]>;

  send<T extends keyof OnHandlers>(channel: T, ...args: Parameters<OnHandlers[T]>): void;
  sendSync<T extends keyof OnHandlers>(channel: T, ...args: Parameters<OnHandlers[T]>): void;

  // on<T extends keyof OnHandlers>(channel: T, listener: (event: IpcRendererEvent, args: ReturnType<OnHandlers[T]>) => void): () => void;
  // once<T extends keyof OnHandlers>(channel: T, listener: (event: IpcRendererEvent, args: ReturnType<OnHandlers[T]>) => void): void;
}

/**
 * 重新创建 ElectronAPI, 来覆盖 window.electron 的类型
 */
export interface ElectronAPI {
  readonly ipcRenderer: IpcRenderer;
  readonly webFrame: WebFrame;
  readonly process: NodeProcess;
}
