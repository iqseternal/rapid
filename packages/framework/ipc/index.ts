
import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { ipcMain } from 'electron';
import { Exception } from '../exception';
import { toPicket } from '@rapid/libs/common';

export enum EventActionType {
  Handle,
  On
}

export type IpcActionType<
  EvtActionType extends EventActionType,
  Channel extends string = string,
  Action extends (...args: unknown[]) => any = (...args: unknown[]) => any
> = {
  channel: Channel;
  action: Action;
  actionType: EvtActionType;
  middlewares: IpcActionMiddleware<EvtActionType>[];
}

export type IpcActionMiddleware<EvtActionType extends EventActionType> = {
  name: string;

  transform?: (e: EvtActionType extends EventActionType.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: unknown[]) => unknown[];

  onBeforeEach?: (e: EvtActionType extends EventActionType.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: unknown[]) => void;
  onAfterEach?: (e: EvtActionType extends EventActionType.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: unknown[]) => void;

  onSuccess?: (
    res: any,
    message: Omit<(
      IpcActionType<
        EvtActionType extends EventActionType.Handle
          ? EventActionType.Handle
          : EventActionType.On
      >
    ), 'middlewares'> & {
      event: EvtActionType extends EventActionType.Handle
        ? IpcMainInvokeEvent
        : IpcMainEvent
    }
  ) => void;
  onError?: (
    err: Exception,
    message: Omit<(
      IpcActionType<
        EvtActionType extends EventActionType.Handle
          ? EventActionType.Handle
          : EventActionType.On
      >
    ), 'middlewares'> & {
      event: EvtActionType extends EventActionType.Handle
        ? IpcMainInvokeEvent
        : IpcMainEvent
    }
  ) => void | Exception;
}


export interface IpcRegisterMiddleware {
  name: string;
  transform?: (e: IpcMainInvokeEvent | IpcMainEvent, ...args: unknown[]) => unknown[];

  onBeforeEach?: (e: IpcMainInvokeEvent | IpcMainEvent, ...args: unknown[]) => void;
  onAfterEach?: (e: IpcMainInvokeEvent | IpcMainEvent, ...args: unknown[]) => void;

  onError?: (
    err: Exception,
    message: Omit<IpcActionType<EventActionType>, 'middlewares'> & {
      event: IpcMainInvokeEvent | IpcMainEvent
    }
  ) => void | Exception;
  onSuccess?: (
    res: any,
    message: Omit<IpcActionType<EventActionType>, 'middlewares'> & {
      event: IpcMainInvokeEvent | IpcMainEvent
    }
  ) => void;
}
export interface IpcRegisterHandleMiddleware extends IpcRegisterMiddleware {
  transform?: (e: IpcMainInvokeEvent, ...args: unknown[]) => unknown[];

  onBeforeEach?: (e: IpcMainInvokeEvent, ...args: unknown[]) => void;
  onAfterEach?: (e: IpcMainInvokeEvent, ...args: unknown[]) => void;
}
export interface IpcRegisterOnMiddleware extends IpcRegisterMiddleware {
  transform?: (e: IpcMainEvent, ...args: unknown[]) => unknown[];

  onBeforeEach?: (e: IpcMainEvent, ...args: unknown[]) => void;
  onAfterEach?: (e: IpcMainEvent, ...args: unknown[]) => void;
}

const runtimeContext = {
  globalMiddlewares: {
    handle: [] as IpcRegisterHandleMiddleware[],
    on: [] as IpcRegisterOnMiddleware[]
  }
}
export const getIpcRuntimeContext = () => runtimeContext;

export function toMakeIpcAction<
  HandleCutArgs extends any[] = [IpcMainInvokeEvent],
  OnCutArgs extends any[] = [IpcMainEvent],
>(payload?: {
  handleMiddlewares?: IpcActionMiddleware<EventActionType.Handle>[];
  onMiddlewares?: IpcActionMiddleware<EventActionType.On>[]
}) {
  const {
    handleMiddlewares = [],
    onMiddlewares = []
  } = payload ?? {};

  const makeAction = <
    EvtActionType extends EventActionType
  >(
    evtActionType: EvtActionType
  ) => {
    return <
      CutArgs extends any[] = (EvtActionType extends EventActionType.Handle ? HandleCutArgs : OnCutArgs),
      Channel extends string = string,
      Fn extends (...args: [...CutArgs, ...any[]]) => any = (...args: [...CutArgs, ...any[]]) => any
    >(
      channel: Channel,
      middlewares: IpcActionMiddleware<EvtActionType>[],
      fn: Fn
    ) => {

      return {
        channel,
        action: fn,
        actionType: evtActionType,
        middlewares: [...(evtActionType === EventActionType.Handle ? handleMiddlewares : onMiddlewares), ...middlewares] as IpcActionMiddleware<EvtActionType>[]
      };
    }
  }

  const makeIpcHandleAction = makeAction(EventActionType.Handle);
  const makeIpcOnAction = makeAction(EventActionType.On);

  return { makeAction, makeIpcHandleAction, makeIpcOnAction };
}

/**
 * 注册 ipc 全局中间件
 * @param actionType
 * @param middlewares
 */
export function registerGlobalMiddleware<EventActionType extends EventActionType.Handle>(actionType: EventActionType, middlewares: IpcRegisterHandleMiddleware[]): void;
export function registerGlobalMiddleware<EventActionType extends EventActionType.On>(actionType: EventActionType, middlewares: IpcRegisterOnMiddleware[]): void;
export function registerGlobalMiddleware(actionType: EventActionType, middlewares: IpcRegisterMiddleware[]) {
  if (actionType === EventActionType.Handle) {
    const handleMiddlewares = middlewares as IpcRegisterHandleMiddleware[];

    handleMiddlewares.forEach(middleware => {
      if (runtimeContext.globalMiddlewares.handle.some(item => item.name === middleware.name)) {
        return;
      }

      runtimeContext.globalMiddlewares.handle.push(middleware);
    })

    return;
  }

  if (actionType === EventActionType.On) {
    const handleMiddlewares = middlewares as IpcRegisterOnMiddleware[];

    handleMiddlewares.forEach(middleware => {
      if (runtimeContext.globalMiddlewares.on.some(item => item.name === middleware.name)) {
        return;
      }

      runtimeContext.globalMiddlewares.on.push(middleware);
    })

    return;
  }
}


const execMiddleware = async (globalMiddlewares: IpcRegisterMiddleware[], handle: IpcActionType<EventActionType>, ...ipcArgs: unknown[]) => {
  const [e, ...args] = ipcArgs as [IpcMainInvokeEvent | IpcMainEvent, ...unknown[]];

  let convertArgs: unknown[] = [e, ...args];
  let err: any = void 0;

  // 开始
  globalMiddlewares.forEach(middleware => {
    middleware.onBeforeEach?.(e, ...args);
  })
  // 转换参数
  globalMiddlewares.forEach(middleware => {
    if (!middleware.transform) return;

    try {
      convertArgs = middleware.transform.apply(void 0, convertArgs);
    } catch(error) {
      err = error;
    }
  })

  // 获取自身内部中间件
  const middlewares = handle.middlewares;

  middlewares.forEach(middleware => {
    middleware.onBeforeEach?.(e, ...args);
  })
  middlewares.forEach(middleware => {
    if (!middleware.transform) return;

    try {
      convertArgs = middleware.transform.apply(void 0, convertArgs);
    } catch(error) {
      err = error;
    }
  })

  const [error, res] = await toPicket(handle.action.apply({}, convertArgs));
  err = error;

  // 如果是自定义异常
  if (err) {
    for (let i = 0;i < middlewares.length;i ++) {
      const middleware = middlewares[i];

      if (!middleware.onError) continue;

      const error = middleware.onError(err as Exception, {
        channel: handle.channel,
        actionType: handle.actionType as any,
        action: handle.action,
        event: e as any
      })

      err = error as Error;
      if (!err) break;
    }

    if (err) {
      for (let i = 0;i < globalMiddlewares.length;i ++) {
        const middleware = globalMiddlewares[i];

        if (!middleware.onError) continue;
        const error = middleware.onError(err as Exception, {
          channel: handle.channel,
          actionType: handle.actionType as any,
          action: handle.action,
          event: e
        })

        err = error as Error;
        if (!err) break;
      }
    }
  }

  middlewares.forEach(middleware => {
    if (!middleware.onSuccess) return;
    middleware.onSuccess(res, {
      channel: handle.channel,
      actionType: handle.actionType as any,
      action: handle.action,
      event: e as any
    });
  })
  globalMiddlewares.forEach(middleware => {
    if (!middleware.onSuccess) return;
    middleware.onSuccess(res, {
      channel: handle.channel,
      actionType: handle.actionType,
      action: handle.action,
      event: e
    })
  })

  middlewares.forEach(middleware => {
    if (!middleware.onAfterEach) return;
    middleware.onAfterEach(e, ...args);
  })
  globalMiddlewares.forEach(middleware => {
    if (!middleware.onAfterEach) return;
    middleware.onAfterEach(e, ...args);
  })

  return res;
}

/**
 * 注册 ipc handle 句柄
 * @param handles
 */
export const registerIpcHandle = (handles: IpcActionType<EventActionType.Handle>[]) => {
  handles.forEach(handle => {
    ipcMain.handle(handle.channel, async (e: IpcMainInvokeEvent, ...args: unknown[]) => {
      const globalMiddlewares = runtimeContext.globalMiddlewares.handle;
      return execMiddleware(globalMiddlewares, handle, e, ...args);
    })
  })
}
export const registerIpcHandleOnce = (handles: IpcActionType<EventActionType.Handle>[]) => {
  handles.forEach(handle => {
    ipcMain.handleOnce(handle.channel, async (e: IpcMainInvokeEvent, ...args: unknown[]) => {
      const globalMiddlewares = runtimeContext.globalMiddlewares.handle;
      return execMiddleware(globalMiddlewares, handle, e, ...args);
    })
  })
}


export const removeIpcHandle = (channel: string) => {
  ipcMain.removeHandler(channel);
}

/**
 * 注册 ipc on 句柄
 * @param middlewares
 * @param handles
 */
export const registerIpcOn = (handles: IpcActionType<EventActionType.On>[]) => {
  handles.forEach(handle => {
    ipcMain.on(handle.channel, async (e: IpcMainInvokeEvent, ...args: unknown[]) => {
      const globalMiddlewares = runtimeContext.globalMiddlewares.on;
      return execMiddleware(globalMiddlewares, handle, e, ...args);
    })
  })
}
export const registerIpcOnce = (handles: IpcActionType<EventActionType.On>[]) => {
  handles.forEach(handle => {
    ipcMain.once(handle.channel, async (e: IpcMainInvokeEvent, ...args: unknown[]) => {
      const globalMiddlewares = runtimeContext.globalMiddlewares.on;
      return execMiddleware(globalMiddlewares, handle, e, ...args);
    })
  })
}
