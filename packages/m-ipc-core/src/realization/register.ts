import { ipcMain } from 'electron';
import type { IpcActionType, IpcActionMiddleware } from './declare';
import { getIpcRuntimeContext, IpcActionEvent } from './declare';

const ipcRuntimeContext = getIpcRuntimeContext();

/**
 * 注册 ipc 全局中间件
 *
 * @example
 * const middleware: IpcActionMiddleware<IpcActionEvent.Handle> = {
 *   name: 'middleware',
 *   transform(e, ...args){
 *     return [WindowService.findWindowService(e), ...args];
 *   }
 * }
 *
 * registerGlobalMiddleware(IpcActionEvent.Handle, [middleware]);
 */
export function registerGlobalMiddleware<IpcActionEvent extends IpcActionEvent.Handle>(actionType: IpcActionEvent, middlewares: IpcActionMiddleware<IpcActionEvent>[]): void;
/**
 * 注册 ipc 全局中间件
 *
 * @example
 * const middleware: IpcActionMiddleware<IpcActionEvent.Handle> = {
 *   name: 'middleware',
 *   transform(e, ...args){
 *     return [WindowService.findWindowService(e), ...args];
 *   }
 * }
 *
 * registerGlobalMiddleware(IpcActionEvent.On, [middleware]);
 */
export function registerGlobalMiddleware<IpcActionEvent extends IpcActionEvent.On>(actionType: IpcActionEvent, middlewares: IpcActionMiddleware<IpcActionEvent>[]): void;

export function registerGlobalMiddleware(actionType: IpcActionEvent, middlewares: IpcActionMiddleware<IpcActionEvent>[]) {
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
    appendMiddlewares(ipcRuntimeContext.globalMiddlewares.handle, middlewares);
    return;
  }

  // 注册全局中间件中的 on
  if (actionType === IpcActionEvent.On) {
    appendMiddlewares(ipcRuntimeContext.globalMiddlewares.on, middlewares);
    return;
  }
}


/**
 * 注册 ipc handle 句柄
 *
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
 */
export const registerIpcHandle = (handles: IpcActionType<IpcActionEvent.Handle>[]) => {
  handles.forEach(handle => {
    if (handle.actionType === IpcActionEvent.Handle) {
      if (ipcRuntimeContext.registered.handle.has(handle.channel)) {
        ipcMain.removeHandler(handle.channel);

        throw new Error(`重复注册ipc句柄 handle: ${handle.channel}`);
      }
      ipcRuntimeContext.registered.handle.add(handle.channel);
      ipcMain.handle(handle.channel, handle.listener);
    }
  });
}

/**
 * 注册 ipc handleOnce 句柄, 该句柄只会生效一次
 *
 * @example
 * const { makeIpcHandleAction } = toMakeIpcAction();
 *
 * export const ipcWindowMaxSize = makeIpcHandleAction(...);
 *
 * registerIpcHandleOnce([ipcWindowMaxSize]);
 */
export const registerIpcHandleOnce = (handles: IpcActionType<IpcActionEvent.Handle>[]) => {
  handles.forEach(handle => {
    if (handle.actionType === IpcActionEvent.Handle) {
      if (ipcRuntimeContext.registered.handle.has(handle.channel)) {
        ipcMain.removeHandler(handle.channel);

        throw new Error(`重复注册ipc句柄 handleOnce: ${handle.channel}`);
      }
      ipcMain.handleOnce(handle.channel, handle.listener);
    }
  });
}

/**
 * 移除 ipc handle 句柄
 *
 * @example
 *
 * const { makeIpcHandleAction } = toMakeIpcAction();
 *
 * const ipcWindowMaxSize = makeIpcHandleAction(...);
 *
 * registerIpcHandle([ipcWindowMaxSize]);
 *
 * // 移除句柄
 * removeIpcHandle(ipcWindowMaxSize);
 *
 *
 */
export const removeIpcHandle = (handle: IpcActionType<IpcActionEvent.Handle>) => {
  if (handle.actionType === IpcActionEvent.Handle) {
    const deleted = ipcRuntimeContext.registered.handle.delete(handle.channel);
    ipcMain.removeHandler(handle.channel);

    if (deleted) throw new Error(`移除了一个未注册的句柄 handle: ${handle.channel}`);
  }
}

/**
 * 注册 ipc on 句柄
 *
 * 使用方式参见 registerIpcHandle
 */
export const registerIpcOn = (handles: IpcActionType<IpcActionEvent.On>[]) => {
  handles.forEach(handle => {
    if (handle.actionType === IpcActionEvent.On) {
      if (ipcRuntimeContext.registered.on.has(handle.channel)) {
        ipcMain.removeListener(handle.channel, handle.listener);

        throw new Error(`重复注册ipc句柄 on: ${handle.channel}`);
      }
      ipcMain.on(handle.channel, handle.listener);
    }
  })
}

/**
 * 注册 ipc once 句柄
 *
 * 使用方式参见 registerIpcHandleOnce
 */
export const registerIpcOnce = (handles: IpcActionType<IpcActionEvent.On>[]) => {
  handles.forEach(handle => {
    if (handle.actionType === IpcActionEvent.On) {
      if (ipcRuntimeContext.registered.on.has(handle.channel)) {
        ipcMain.removeListener(handle.channel, handle.listener);

        throw new Error(`重复注册ipc句柄 once: ${handle.channel}`);
      }
      ipcMain.once(handle.channel, handle.listener);
    }
  })
}

/**
 * 移除 ipc on 句柄
 *
 * 使用方式参见 removeIpcHandle
 */
export const offIpcOn = (handle: IpcActionType<IpcActionEvent.On>) => {
  if (handle.actionType === IpcActionEvent.On) {
    const deleted = ipcRuntimeContext.registered.on.delete(handle.channel);
    ipcMain.off(handle.channel, handle.listener);
    if (deleted) throw new Error(`移除了一个未注册的句柄 on: ${handle.channel}`);
  }
}
