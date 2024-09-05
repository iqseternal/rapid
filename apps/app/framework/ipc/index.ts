
import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { ipcMain } from 'electron';
import { Exception } from '../exception';
import { toPicket } from '@suey/pkg-utils';

/** Ipc 事件类型 */
export enum EventActionType {
  Handle,
  On
}

/** 自定义 ipc action 对象 */
export type IpcActionType<
  EvtActionType extends EventActionType,
  Channel extends string = string,
  Action extends (...args: any[]) => any = (...args: any[]) => any
> = {
  channel: Channel;
  action: Action;
  actionType: EvtActionType;
  middlewares: IpcActionMiddleware<EvtActionType>[];
  /**
   * ipc 句柄的处理函数, 该函数会走中间件, 调用 action 对象的 action 方法作为返回值
   * @param e
   * @param args
   * @returns
   */
  listener: (e: IpcMainInvokeEvent | IpcMainEvent, ...args: any[]) => any;
}

/** 在中间件中 onSuccess 或者 onError 中获取当前的 action 信息的类型 */
export type IpcActionMessageType<EvtActionType extends EventActionType> = Omit<IpcActionType<EvtActionType>, 'middlewares'> & {
  event: EvtActionType extends EventActionType.Handle ? IpcMainInvokeEvent : IpcMainEvent;
}

/**
 * Ipc Action 中间件
 */
export type IpcActionMiddleware<EvtActionType extends EventActionType> = {
  /** 中间件名称 */
  name: string;
  /**
   * 转换参数, 可以利用本函数为每个子项的 action 函数提供统一的参数前缀, 因为默认情况下 electron ipc 第一个参数为 事件 e: IpcMainInvokeEvent | IpcMainEvent
   * 可能需要转换自定义对象或者 已有的 窗口对象
   *
   * @example
   * export const convertWindowService: IpcActionMiddleware<EventActionType.Handle> = {
   *   name: 'convertWindowService',
   *   transform(e, ...args) {
   *     const windowService = WindowService.findWindowService(e);
   *     return [windowService, ...args];
   *   }
   * }
   */
  transform?: (e: EvtActionType extends EventActionType.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: unknown[]) => unknown[];

  /**
   * 在 action 正式处理之前的回调函数
   */
  onBeforeEach?: (e: EvtActionType extends EventActionType.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: unknown[]) => void;
  /**
   * 在 action 处理之后的回调函数
   */
  onAfterEach?: (e: EvtActionType extends EventActionType.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: unknown[]) => void;

  /**
   * 在 action 正确处理 ipc 句柄的成功回调函数
   * @param res 正确处理的返回数据
   * @param message 返回处理当前 ipc 句柄的信息
   */
  onSuccess?: (res: any, message: IpcActionMessageType<EvtActionType>) => void;
  /**
   * 在 action 错误处理 ipc 句柄的回调函数, 改回调会产出一个异常对象, 可以中间件处理, 也可以继续往上抛, 让外面的中间件处理,
   * 如果不处理, 那么会在主进程产出一个错误.
   * @param res 错误处理时产生的异常对象
   * @param message 返回处理当前 ipc 句柄的信息
   */
  onError?: (err: Exception, message: IpcActionMessageType<EvtActionType>) => void | Exception;
}

export type IpcRegisterMiddleware = IpcActionMiddleware<EventActionType.Handle | EventActionType.On>;

export type IpcRegisterHandleMiddleware = IpcActionMiddleware<EventActionType.Handle>;

export type IpcRegisterOnMiddleware = IpcActionMiddleware<EventActionType.On>;

/** 存储注册的全局中间件 */
const runtimeContext = {
  globalMiddlewares: {
    handle: [] as IpcRegisterHandleMiddleware[],
    on: [] as IpcRegisterOnMiddleware[]
  }
}

export const getIpcRuntimeContext = () => runtimeContext;

/**
 * 获得制作 ipc 句柄的函数
 * @example
 * const { makeIpcHandleAction } = toMakeIpcAction();
 * const ipcHandle = makeIpcHandleAction(
 *   '句柄名称',
 *   [],
 *   async (e) => {
 *     const res = '';
 *
 *
 *     return res;
 *   }
 * )
 * @example
 * const middleware: IpcActionMiddleware<EventActionType.Handle> = {
 *   name: 'middleware',
 *   transform(e, ...args){
 *     return [WindowService.findWindowService(e), ...args];
 *   }
 * }
 *
 * const { makeIpcHandleAction } = toMakeIpcAction();
 * const ipcHandle = makeIpcHandleAction(
 *   '句柄名称',
 *   [middleware], // 为某个单独句柄设置中间件
 *   async (e: WindowService) => {
 *     const res = '';
 *
 *
 *     return res;
 *   }
 * )
 * @example
 * const middleware: IpcActionMiddleware<EventActionType.Handle> = {
 *   name: 'middleware',
 *   transform(e, ...args){
 *     return [WindowService.findWindowService(e), ...args]; // 转换事件 e 为 WindowService
 *   }
 * }
 *
 * // 为这个函数所有创建中间件
 * const { makeIpcHandleAction } = toMakeIpcAction<[WindowService]>({ // 在这里能够提供所有句柄回调头部参数的类型
 *   handleMiddlewares: [middleware]
 * });
 * const ipcHandle = makeIpcHandleAction(
 *   '句柄名称',
 *   [],
 *   async (e) => { // e: WindowService
 *     const res = '';
 *
 *     return res;
 *   }
 * )
 *
 *
 * @param payload
 */
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

  /**
   * 初始化创建 action 对象的函数
   * @returns
   */
  const initMakeAction = <
    EvtActionType extends EventActionType
  >(
    evtActionType: EvtActionType
  ) => {
    return <
      Channel extends string,
      CutArgs extends (EvtActionType extends EventActionType.Handle ? HandleCutArgs : OnCutArgs),
      Fn extends (...args: [...CutArgs, ...any[]]) => any
    >(
      channel: Channel,
      middlewares: IpcActionMiddleware<EvtActionType>[],
      handleCallback: Fn
    ) => {

      const action = {
        channel,
        action: handleCallback,
        actionType: evtActionType,
        middlewares: [...(evtActionType === EventActionType.Handle ? handleMiddlewares : onMiddlewares), ...middlewares] as IpcActionMiddleware<EvtActionType>[],
        listener: async (e: IpcMainEvent | IpcMainInvokeEvent, ...args: unknown[]) => {
          const globalMiddlewares = (
            evtActionType === EventActionType.Handle
              ? runtimeContext.globalMiddlewares.handle
              : runtimeContext.globalMiddlewares.on
          );

          return runningIpcAction(globalMiddlewares, action, e, ...args);
        }
      };

      return action;
    }
  }

  return {
    /**
     * 制作一个 action 句柄, 无论是 handle 还是 on 句柄
     * @example
     * const { intMakeAction } = toMakeIpcAction();
     * const handle = intMakeAction(
     *  '句柄',
     *  [],
     *  async () => {
     *  }
     * );
     *
     * @param evtActionType
     */
    initMakeAction,
    /**
     * 制作一个 handle 句柄
     * @example
     * const { makeIpcHandleAction } = toMakeIpcAction();
     * const handle = makeIpcHandleAction(
     *  '句柄',
     *  [],
     *  async () => {
     *    // TODO
     *  }
     * );
     *
     * @param evtActionType
     */
    makeIpcHandleAction: initMakeAction(EventActionType.Handle),
    /**
     * 制作一个 On 句柄
     * @example
     * const { makeIpcOnAction } = toMakeIpcAction();
     * const handle = makeIpcOnAction(
     *  '句柄',
     *  [],
     *  async () => {
     *    // TODO
     *  }
     * );
     *
     * @param evtActionType
     */
    makeIpcOnAction: initMakeAction(EventActionType.On)
  };
}

/**
 * 注册 ipc 全局中间件
 * @example
 * const middleware: IpcActionMiddleware<EventActionType.Handle> = {
 *   name: 'middleware',
 *   transform(e, ...args){
 *     return [WindowService.findWindowService(e), ...args];
 *   }
 * }
 * registerGlobalMiddleware(EventActionType.Handle, [middleware]);
 * registerGlobalMiddleware(EventActionType.On, [middleware]);
 *
 *
 */
export function registerGlobalMiddleware<EventActionType extends EventActionType.Handle>(actionType: EventActionType, middlewares: IpcRegisterHandleMiddleware[]): void;
export function registerGlobalMiddleware<EventActionType extends EventActionType.On>(actionType: EventActionType, middlewares: IpcRegisterOnMiddleware[]): void;
export function registerGlobalMiddleware(actionType: EventActionType, middlewares: IpcRegisterMiddleware[]) {
  // 向一个中间件集合 push 一堆中间件
  const appendMiddlewares = (middlewareSet: IpcRegisterMiddleware[], middlewares: IpcRegisterMiddleware[]) => {
    middlewares.forEach(middleware => {
      // 跳过已经注册的中间件
      if (middlewareSet.some(item => item.name === middleware.name)) return;

      middlewareSet.push(middleware);
    })
  }

  // 注册全局中间件中的 handle
  if (actionType === EventActionType.Handle) {
    appendMiddlewares(runtimeContext.globalMiddlewares.handle, middlewares);
    return;
  }

  // 注册全局中间件中的 on
  if (actionType === EventActionType.On) {
    appendMiddlewares(runtimeContext.globalMiddlewares.on, middlewares);
    return;
  }
}

/**
 * 处理一个 action, 来解决对应的 ipc 句柄
 * @param globalMiddlewares 全局中间件集合
 * @param action 被创建的 action 对象
 * @param ipcArgs ipc 传递的参数列表
 */
async function runningIpcAction(globalMiddlewares: IpcRegisterMiddleware[], action: IpcActionType<EventActionType>, ...ipcArgs: unknown[]) {
  const [e, ...args] = ipcArgs as [IpcMainInvokeEvent | IpcMainEvent, ...unknown[]];

  // action 回调信息
  const actionMessage: IpcActionMessageType<EventActionType.Handle | EventActionType.On> = {
    channel: action.channel,
    actionType: action.actionType as any,
    action: action.action,
    event: e as any,
    listener: action.listener
  }

  let convertArgs: unknown[] = [e, ...args];
  let err: any = void 0;

  // 开始
  globalMiddlewares.forEach(middleware => middleware?.onBeforeEach?.(e, ...args));
  // 转换参数
  globalMiddlewares.forEach(middleware => {
    if (!middleware.transform) return;

    try {
      convertArgs = middleware.transform.apply(void 0, convertArgs);
    } catch(error) {
      err = error;
    }
  })

  // 还没有得到 action 处理, 全局中间件就已经出现错误
  if (err) throw err;

  // 获取自身内部中间件
  const middlewares = action.middlewares;

  middlewares.forEach(middleware => middleware?.onBeforeEach?.(e, ...args));
  middlewares.forEach(middleware => {
    if (!middleware.transform) return;

    try {
      convertArgs = middleware.transform.apply(void 0, convertArgs);
    } catch(error) {
      err = error;
    }
  })

  // 内部中间件处理出现错误了
  if (err) throw err;

  // action 正式处理 ipc 句柄
  const [error, res] = await toPicket(action.action.apply({}, convertArgs));
  err = error;

  // 如果是自定义异常
  if (err && err instanceof Exception) {
    for (let i = 0;i < middlewares.length;i ++) {
      const middleware = middlewares[i];
      if (!middleware.onError) continue;

      const error = middleware.onError(err, actionMessage);

      err = error as Error;
      // 如果中间件没有返回异常, 那么代表这个异常被处理了
      if (!err) break;
    }

    if (err) {
      for (let i = 0;i < globalMiddlewares.length;i ++) {
        const middleware = globalMiddlewares[i];
        if (!middleware.onError) continue;

        const error = middleware.onError(err, actionMessage);

        err = error as Error;
        // 如果中间件没有返回异常, 那么代表这个异常被处理了
        if (!err) break;
      }
    }
  }

  if (!error) {
    middlewares.forEach(middleware => middleware?.onSuccess?.(res, actionMessage));
    globalMiddlewares.forEach(middleware => middleware?.onSuccess?.(res, actionMessage));
  }

  middlewares.forEach(middleware => middleware?.onAfterEach?.(e, ...args));
  globalMiddlewares.forEach(middleware => middleware?.onAfterEach?.(e, ...args));

  // 异常没有被处理
  if (err) throw err;

  return res;
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
export const registerIpcHandle = (handles: IpcActionType<EventActionType.Handle>[]) => {
  handles.forEach(handle => ipcMain.handle(handle.channel, handle.listener));
}
export const registerIpcHandleOnce = (handles: IpcActionType<EventActionType.Handle>[]) => {
  handles.forEach(handle => ipcMain.handleOnce(handle.channel, handle.listener));
}
export const removeIpcHandle = (handle: IpcActionType<EventActionType.Handle>) => {
  ipcMain.removeHandler(handle.channel);
}

/**
 * 注册 ipc on 句柄
 */
export const registerIpcOn = (handles: IpcActionType<EventActionType.On>[]) => {
  handles.forEach(handle => ipcMain.on(handle.channel, handle.listener))
}
export const registerIpcOnce = (handles: IpcActionType<EventActionType.On>[]) => {
  handles.forEach(handle => ipcMain.once(handle.channel, handle.listener))
}
export const offIpcOnce = (handle: IpcActionType<EventActionType.Handle>) => {
  ipcMain.off(handle.channel, handle.listener);
}
