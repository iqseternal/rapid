import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { Exception, isException, ExceptionErrorMsgData } from 'rd/base/common/exceptions';

/** Ipc 事件类型 */
export const enum IpcActionEvent {
  Handle,
  On
}

/** 自定义 ipc action 对象 */
export type IpcActionType<EvtActionType extends IpcActionEvent, Channel extends string = string, Action extends (...args: any[]) => any = (...args: any[]) => any> = {
  /**
   * 句柄名称
   */
  readonly channel: Channel;

  /**
   * 编写的 Action 回调, 可以让其他 Action 进行调用
   */
  readonly action: Action;

  /**
   * Action Type
   */
  readonly actionType: EvtActionType;

  /**
   * 中间件列表
   */
  readonly middlewares: IpcActionMiddleware<EvtActionType>[];

  /**
   * ipc 句柄的处理函数, 该函数会走中间件, 调用 action 对象的 action 方法作为返回值
   */
  readonly listener: (e: IpcMainInvokeEvent | IpcMainEvent, ...args: any[]) => Promise<any>;
}

/** 在中间件中 onSuccess 或者 onError 中获取当前的 action 信息的类型 */
export type IpcActionMessageType<EvtActionType extends IpcActionEvent> = Omit<IpcActionType<EvtActionType>, 'middlewares'> & {
  readonly event: EvtActionType extends IpcActionEvent.Handle ? IpcMainInvokeEvent : IpcMainEvent;
}

/**
 * Ipc Action 中间件
 */
export type IpcActionMiddleware<EvtActionType extends IpcActionEvent> = {
  /**
   * 中间件名称
   */
  readonly name: string;

  /**
   * 转换参数, 可以利用本函数为每个子项的 action 函数提供统一的参数前缀, 因为默认情况下 electron ipc 第一个参数为 事件 e: IpcMainInvokeEvent | IpcMainEvent
   * 可能需要转换自定义对象或者 已有的 窗口对象
   *
   * @example
   * export const convertWindowService: IpcActionMiddleware<IpcActionEvent.Handle> = {
   *   name: 'convertWindowService',
   *   transformArgs(e, ...args) {
   *     const windowService = WindowService.findWindowService(e);
   *     return [windowService, ...args];
   *   }
   * }
   */
  readonly transformArgs?: (e: EvtActionType extends IpcActionEvent.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: any[]) => Promise<any[]>;

  /**
   * 转换响应
   */
  readonly transformResponse?: <Data>(response: Promise<Data>) => Promise<any>;

  /**
   * 在 action 正式处理之前的回调函数
   */
  readonly onBeforeEach?: (e: EvtActionType extends IpcActionEvent.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: any[]) => Promise<void>;

  /**
   * 在 action 处理之后的回调函数
   */
  readonly onAfterEach?: (e: EvtActionType extends IpcActionEvent.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: any[]) => Promise<void>;

  /**
   * 在 action 正确处理 ipc 句柄的成功回调函数
   * @param res 正确处理的返回数据
   * @param message 返回处理当前 ipc 句柄的信息
   */
  readonly onSuccess?: (res: any, message: IpcActionMessageType<EvtActionType>) => Promise<void>;

  /**
   * 在 action 错误处理 ipc 句柄的回调函数, 改回调会产出一个异常对象, 可以中间件处理, 也可以继续往上抛, 让外面的中间件处理,
   * 如果不处理, 那么会在主进程产出一个错误.
   * @param res 错误处理时产生的异常对象
   * @param message 返回处理当前 ipc 句柄的信息
   */
  readonly onError?: (err: Exception<ExceptionErrorMsgData>, message: IpcActionMessageType<EvtActionType>) => Promise<void | Exception<ExceptionErrorMsgData>>;
}

/** 存储注册的全局中间件 */
const runtimeContext = {
  globalMiddlewares: {
    handle: [] as IpcActionMiddleware<IpcActionEvent.Handle>[],
    on: [] as IpcActionMiddleware<IpcActionEvent.On>[]
  },
  registered: {
    handle: new Set<string>(),
    on: new Set<string>()
  }
} as const;

export const getIpcRuntimeContext = () => runtimeContext;
