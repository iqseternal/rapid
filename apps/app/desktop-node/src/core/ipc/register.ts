
import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { ipcMain } from 'electron';

import type { IpcActionType, IpcActionMiddleware, IpcActionMessageType } from './declare';
import { getIpcRuntimeContext, IpcActionEvent } from './declare';
import { Printer } from '@suey/printer';

/**
 * 注册 ipc 全局中间件
 * @example
 * const middleware: IpcActionMiddleware<IpcActionEvent.Handle> = {
 *   name: 'middleware',
 *   transform(e, ...args){
 *     return [WindowService.findWindowService(e), ...args];
 *   }
 * }
 * registerGlobalMiddleware(IpcActionEvent.Handle, [middleware]);
 * registerGlobalMiddleware(IpcActionEvent.On, [middleware]);
 *
 *
 */
export function registerGlobalMiddleware<IpcActionEvent extends IpcActionEvent.Handle>(actionType: IpcActionEvent, middlewares: IpcActionMiddleware<IpcActionEvent>[]): void;
export function registerGlobalMiddleware<IpcActionEvent extends IpcActionEvent.On>(actionType: IpcActionEvent, middlewares: IpcActionMiddleware<IpcActionEvent>[]): void;
export function registerGlobalMiddleware(actionType: IpcActionEvent, middlewares: IpcActionMiddleware<IpcActionEvent>[]) {
  const runtimeContext = getIpcRuntimeContext();

  // 向一个中间件集合 push 一堆中间件
  const appendMiddlewares = <EvtActionType extends IpcActionEvent>(middlewareSet: IpcActionMiddleware<EvtActionType>[], middlewares: IpcActionMiddleware<IpcActionEvent>[]) => {
    // 防止重复注册中间件的中间件 map
    const nameMap = new Map<string, boolean>();

    middlewareSet.forEach(middleware => nameMap.set(middleware.name, true));
    middlewares.forEach(middleware => {
      // 跳过已经注册的中间件
      if (nameMap.has(middleware.name)) return;

      middlewareSet.push(middleware);
      nameMap.set(middleware.name, true);
    })
  }

  // 注册全局中间件中的 handle
  if (actionType === IpcActionEvent.Handle) {
    appendMiddlewares(runtimeContext.globalMiddlewares.handle, middlewares);
    return;
  }

  // 注册全局中间件中的 on
  if (actionType === IpcActionEvent.On) {
    appendMiddlewares(runtimeContext.globalMiddlewares.on, middlewares);
    return;
  }
}


/**
 * 注册 ipc handle 句柄
 * @example
 * const { makeIpcHandleAction } = toMakeIpcAction<[WindowService]>({
 *   handleMiddlewares: [convertWindowService] // 中间件
 * });
 *
 * export const ipcWindowMaxSize = makeIpcHandleAction(
 *   'IpcWindow/maxSize', // 句柄名称
 *   [], // 中间件
 *   async (windowService, options?: { id: number }) => { // action 执行
 *     if (options?.id) {
 *       windowService = WindowService.findWindowService(options.id);
 *     }
 *
 *     if (windowService.window.maximizable) windowService.window.maximize();
 *   }
 * );
 *
 * registerIpcHandle([ipcWindowMaxSize]);
 *
 * @param handles
 */
export const registerIpcHandle = (handles: IpcActionType<IpcActionEvent.Handle>[]) => {
  handles.forEach(handle => {
    if (handle.actionType === IpcActionEvent.Handle) {
      ipcMain.handle(handle.channel, handle.listener);
    }
  });
}
export const registerIpcHandleOnce = (handles: IpcActionType<IpcActionEvent.Handle>[]) => {
  handles.forEach(handle => {
    if (handle.actionType === IpcActionEvent.Handle) {
      ipcMain.handleOnce(handle.channel, handle.listener);
    }
  });
}
export const removeIpcHandle = (handle: IpcActionType<IpcActionEvent.Handle>) => {
  if (handle.actionType === IpcActionEvent.Handle) {
    ipcMain.removeHandler(handle.channel);
  }
}

/**
 * 注册 ipc on 句柄
 * 使用方式参见 registerIpcHandle
 */
export const registerIpcOn = (handles: IpcActionType<IpcActionEvent.On>[]) => {
  handles.forEach(handle => {
    if (handle.actionType === IpcActionEvent.On) {
      ipcMain.on(handle.channel, handle.listener);
    }
  })
}
export const registerIpcOnce = (handles: IpcActionType<IpcActionEvent.On>[]) => {
  handles.forEach(handle => {
    if (handle.actionType === IpcActionEvent.On) {
      ipcMain.once(handle.channel, handle.listener);
    }
  })
}
export const offIpcOn = (handle: IpcActionType<IpcActionEvent.On>) => {
  if (handle.actionType === IpcActionEvent.On) {
    ipcMain.off(handle.channel, handle.listener);
  }
}
