import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { Exception, isException } from '../../exceptions';
import { toNil, Nil } from '@rapid/libs';
import type { IpcActionType, IpcActionMiddleware, IpcActionMessageType } from './declare';
import { getIpcRuntimeContext, IpcActionEvent } from './declare';

/**
 * 获得制作 ipc 句柄的函数
 *
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
 *
 * @example
 * const middleware: IpcActionMiddleware<IpcActionEvent.Handle> = {
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
 *
 * @example
 * const middleware: IpcActionMiddleware<IpcActionEvent.Handle> = {
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
 */
export function toMakeIpcAction<
  HandleCutArgs extends any[] = [IpcMainInvokeEvent],
  OnCutArgs extends any[] = [IpcMainEvent],
>(payload?: {
  handleMiddlewares?: IpcActionMiddleware<IpcActionEvent.Handle>[];
  onMiddlewares?: IpcActionMiddleware<IpcActionEvent.On>[]
}) {
  const { handleMiddlewares = [], onMiddlewares = [] } = payload ?? {};

  /**
   * 初始化创建 action 对象的函数
   * @returns
   */
  const initMakeAction = <EvtActionType extends IpcActionEvent>(evtActionType: EvtActionType) => {

    return <
      Channel extends string,
      CutArgs extends (EvtActionType extends IpcActionEvent.Handle ? HandleCutArgs : OnCutArgs),
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
        middlewares: [...(evtActionType === IpcActionEvent.Handle ? handleMiddlewares : onMiddlewares), ...middlewares] as IpcActionMiddleware<EvtActionType>[],
        listener: async (e: IpcMainEvent | IpcMainInvokeEvent, ...args: unknown[]) => {
          const runtimeContext = getIpcRuntimeContext();

          const globalMiddlewares = (evtActionType === IpcActionEvent.Handle ? runtimeContext.globalMiddlewares.handle : runtimeContext.globalMiddlewares.on);

          return findHandleHandlingGuard(globalMiddlewares, action, e, ...args);
        }
      } as const;

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
     *    //
     *  }
     * );
     *
     * @param evtActionType
     */
    makeIpcHandleAction: initMakeAction(IpcActionEvent.Handle),
    /**
     * 制作一个 On 句柄
     * @example
     * const { makeIpcOnAction } = toMakeIpcAction();
     * const handle = makeIpcOnAction(
     *  '句柄',
     *  [],
     *  async () => {
     *    //
     *  }
     * );
     *
     * @param evtActionType
     */
    makeIpcOnAction: initMakeAction(IpcActionEvent.On)
  } as const;
}

/**
 * 处理一个 `action`, 来解决对应的 ipc 句柄
 */
async function findHandleHandling(globalMiddlewares: IpcActionMiddleware<IpcActionEvent>[], action: IpcActionType<IpcActionEvent>, ...ipcArgs: unknown[]) {
  const [e, ...args] = ipcArgs as [IpcMainInvokeEvent | IpcMainEvent, ...unknown[]];

  // action 回调信息
  const actionMessage: IpcActionMessageType<IpcActionEvent> = {
    channel: action.channel,
    actionType: action.actionType as any,
    action: action.action,
    event: e as any,
    listener: action.listener
  } as const;

  let convertArgs = [e, ...args] as Parameters<Required<IpcActionMiddleware<IpcActionEvent>>['transformArgs']>;
  let err: Nil.NilRefusedReasonType<any> | undefined = void 0;

  // 开始
  for (let i = 0; i < globalMiddlewares.length; i++) {
    if (err) break;
    const middleware = globalMiddlewares[i];
    if (!middleware.onBeforeEach) continue;

    const [error] = await toNil(middleware.onBeforeEach(...convertArgs));
    if (error) {
      err = error;
      break;
    }
  }
  if (err) return Promise.reject(err.reason);

  // 转换参数
  for (let i = 0; i < globalMiddlewares.length; i++) {
    if (err) break;
    const middleware = globalMiddlewares[i];
    if (!middleware.transformArgs) continue;

    const [error, args] = await toNil(middleware.transformArgs(...convertArgs));
    if (error) {
      err = error;
      break;
    }
    convertArgs = args as Parameters<Required<IpcActionMiddleware<IpcActionEvent>>['transformArgs']>;
  }
  if (err) return Promise.reject(err.reason);

  // 获取自身内部中间件
  const middlewares = action.middlewares;

  // 内部 beforeEach
  for (let i = 0; i < middlewares.length; i++) {
    if (err) break;

    const middleware = middlewares[i];
    if (!middleware.onBeforeEach) continue;

    const [error] = await toNil(middleware.onBeforeEach(e, ...convertArgs));
    if (error) {
      err = error;
      break;
    }
  }
  if (err) return Promise.reject(err.reason);

  // 内部 transform
  for (let i = 0; i < middlewares.length; i++) {
    if (err) break;
    const middleware = middlewares[i];
    if (!middleware.transformArgs) continue;

    const [error, args] = await toNil(middleware.transformArgs(...convertArgs));

    if (error) {
      err = error;
      break;
    }
    convertArgs = args as Parameters<Required<IpcActionMiddleware<IpcActionEvent>>['transformArgs']>;
  }
  if (err) return Promise.reject(err.reason);

  // action 正式处理 ipc 句柄
  const [error, res] = await toNil(Promise.resolve(action.action(...convertArgs)));
  err = error;

  // onError 周期
  if (err && isException(err.reason)) {
    let isResolved = false;

    // 内部 onError
    for (let i = 0; i < middlewares.length; i++) {
      const middleware = middlewares[i];
      if (!middleware.onError) continue;

      const [error, exp] = await toNil(middleware.onError(err.reason, actionMessage));
      if (error) {
        return Promise.reject(err.reason);
      }

      if (!exp) {
        isResolved = true;
        continue;
      }
    }

    if (isResolved) {
      err = void 0;
    }

    // 全局 onError
    if (err) {
      for (let i = 0; i < globalMiddlewares.length; i++) {
        const middleware = globalMiddlewares[i];
        if (!middleware.onError) continue;

        const [error, exp] = await toNil(middleware.onError(err.reason, actionMessage));
        if (error) {
          return Promise.reject(err.reason);
        }

        if (!exp) {
          isResolved = true;
          continue;
        }
      }
    }

    if (isResolved) {
      err = void 0;
    }
  }

  // 异常没有被处理
  if (err) return Promise.reject(err.reason);

  // 执行期间没有出错 onSuccess
  if (!error) {
    middlewares.forEach(middleware => middleware?.onSuccess?.(res, actionMessage));
    globalMiddlewares.forEach(middleware => middleware?.onSuccess?.(res, actionMessage));
  }

  middlewares.forEach(middleware => middleware?.onAfterEach?.(e, ...args));
  globalMiddlewares.forEach(middleware => middleware?.onAfterEach?.(e, ...args));

  return res;
}

/**
 * 处理一个 `action`, 来解决对应的 ipc 句柄, 并处理响应
 */
async function findHandleHandlingGuard(globalMiddlewares: IpcActionMiddleware<IpcActionEvent>[], action: IpcActionType<IpcActionEvent>, ...ipcArgs: unknown[]) {
  let response = findHandleHandling(globalMiddlewares, action, ...ipcArgs);

  // 获取自身内部中间件
  const middlewares = action.middlewares;

  // 内部 transformResponse
  for (let i = 0; i < middlewares.length; i++) {
    const middleware = middlewares[i];
    if (!middleware.transformResponse) continue;

    const [err, res] = await toNil(middleware.transformResponse(response));
    if (err) return Promise.reject(err.reason);

    response = res;
  }

  // 全局 transformResponse
  for (let i = 0; i < globalMiddlewares.length; i++) {
    const middleware = globalMiddlewares[i];
    if (!middleware.transformResponse) continue;

    const [err, res] = await toNil(middleware.transformResponse(response));
    if (err) return Promise.reject(err.reason);

    response = res;
  }

  // 返回响应
  return response;
}
