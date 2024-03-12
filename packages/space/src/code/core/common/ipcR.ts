import type { IpcMainInvokeEvent, IpcMainEvent } from 'electron';
import { ipcMain, ipcRenderer, BrowserWindow, webContents } from 'electron';

import { type MainEventHandlers, IPC_MAIN_WINDOW, RendererEventHandlers } from '#/constants'
/**
 * 原本采用接口扩展实现的, 但是 IpcMain 接口存在于 Electron 命名空间中
 * 扩展时会导致 Parameters, ReturnType 等类型运算失效
 * 所以采用封装函数的形式
 */

export const setIpcMainHandle = <T extends keyof MainEventHandlers>(icp: T, listener: (event: IpcMainInvokeEvent, ...args: Parameters<MainEventHandlers[T]>) => Promise<ReturnType<MainEventHandlers[T]>>) => ipcMain.handle(icp, listener as any);
export const setIpcMainHandleOnce: typeof setIpcMainHandle = (icp, listener) => ipcMain.handleOnce(icp, listener as any);
export const removeHandle = <T extends keyof MainEventHandlers>(channel: T) => ipcMain.removeHandler(channel);

export const setIpcMainOn = <T extends keyof MainEventHandlers>(channel: T, listener: (event: IpcMainInvokeEvent, ...args: Parameters<MainEventHandlers[T]>) => void) => ipcMain.on(channel, listener as any);
export const setIpcMainOnce: typeof setIpcMainOn = (channel, listener) => ipcMain.once(channel, listener as any);

export const sendToRenderer = <T extends keyof RendererEventHandlers>(win: BrowserWindow, evtName: T, args: ReturnType<RendererEventHandlers[T]>) => win?.webContents.send(evtName, args);

/**
 * 以下是实现 IPC 交互时返回值的规程
 */
export class IpcResponseBase<T> implements IpcResponse<T> {
  constructor(
    public readonly ok: boolean,
    public readonly data: T,
    public readonly flag: string,
    public readonly descriptor: string = ''
  ) {}
}

export class IpcResponseOk<T> extends IpcResponseBase<T> {
  constructor(
    public readonly data: T,
    public readonly descriptor: string = ''
  ) {
    super(true, data, 'IpcResponseOk', descriptor);
  }
}

export class IpcResponseFail<T> extends IpcResponseBase<T> {
  constructor(
    public readonly data: T,
    public readonly descriptor: string = ''
  ) {
    super(false, data, 'IpcResponseFail', descriptor);
  }
}

/**
 * 创建一个 Ipc 回复正确信息，因在 resolve 中返回
 * @param data
 * @param descriptor
 * @returns
 */
export const ok = <T>(data: T, descriptor?: string): IpcResponse<T> => new IpcResponseOk(data, descriptor);

/**
 * 创建一个 Ipc 回复错误信息，因在 reject 中返回
 * @param data
 * @param descriptor
 * @returns
 */
export const fail = <T>(data: T, descriptor?: string): IpcResponse<T> => new IpcResponseFail(data, descriptor);

type IpcPromiseCallResponse<T> = IpcResponseOk<T> | IpcResponseFail<T>;
type IpcPromiseCall<T> = (data: T, descriptor?: string) => IpcPromiseCallResponse<T> | Promise<IpcPromiseCallResponse<T>>;

/**
 * Ipc 的回复函数, 使用 r 函数将会返回一个 promise，允许你像 promise 一样调用，但 resolve 的数据会被规程化，变为 IpcResponse
 * @param callback
 * @returns
 */
export const ipcR = <T>(callback: (ok: IpcPromiseCall<T>, fail: IpcPromiseCall<T>) => ReturnType<IpcPromiseCall<T>>): Promise<IpcResponse<T>> => {
  return new Promise((resolve, reject)=> {

    const oks: IpcPromiseCall<T> = (data, descriptor?: string): ReturnType<IpcPromiseCall<T>> => resolve(ok(data, descriptor)) as unknown as ReturnType<IpcPromiseCall<T>>;

    const fails: IpcPromiseCall<T> = (data, descriptor?: string): ReturnType<IpcPromiseCall<T>> => reject(fail(data, descriptor)) as unknown as ReturnType<IpcPromiseCall<T>>;

    callback(oks, fails);
  });
}
