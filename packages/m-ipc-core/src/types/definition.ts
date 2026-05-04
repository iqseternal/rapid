/**
 * @rapid/m-ipc-core - Common Types
 *
 * 通用类型定义（所有环境可用）
 */

import { IsAny, IsUnknown, CutHead, IsUndefined } from '@suey/pkg-utils';
import type { IpcMainEvent, IpcMainInvokeEvent, IpcRendererEvent } from 'electron';

/**
 * IPC 类型：handle（双向通信，有返回值）
 */
export type IpcTypeHandle = 'handle';

/**
 * IPC 类型：on（单向通知，无返回值）
 */
export type IpcTypeOn = 'on';

/**
 * IPC 类型：both（兼容态，可用于 handle 或 on）
 */
export type IpcTypeBoth = 'both';

/**
 * IPC 完整类型（所有类型的联合）
 */
export type IpcType = IpcTypeHandle | IpcTypeOn | IpcTypeBoth;

/**
 * 根据 IPC 类型推导默认事件对象
 * - handle: IpcMainInvokeEvent
 * - on: IpcMainEvent
 * - both: IpcMainInvokeEvent | IpcMainEvent
 */
export type IpcDefaultEvent<T extends IpcType> = (
  T extends IpcTypeBoth
  ? IpcMainInvokeEvent | IpcMainEvent
  : (
    T extends IpcTypeHandle
    ? IpcMainInvokeEvent
    : IpcMainEvent
  )
);

/**
 * IPC 处理器接口（未注册的处理器）
 *
 * 通用处理器抽象，注册时决定作为 Handle 还是 On
 *
 * @template Type - 注册类型（默认 'both'，兼容态）
 * @template FirstArg - 第一个参数类型（可自定义，如 WindowService）
 * @template Channel - 通道名称
 * @template ProcessorHandler - 处理函数类型
 */
export interface IpcProcessor<
  Type extends IpcType = IpcTypeBoth,
  FirstArg extends unknown = unknown,
  Channel extends string = string,
  ProcessorHandler extends ((...args: [any, ...(any[])]) => any) = ((...args: [FirstArg, ...(any[])]) => any),
> {
  /**
   * 通道名称
   */
  readonly channel: Channel;

  /**
   * IPC 类型（'handle' | 'on' | 'both'）
   */
  readonly type: Type;

  /**
   * 中间件列表（只读）
   */
  get middlewares(): IpcMiddleware[];

  /**
   * 业务处理函数
   *
   * @description 不直接使用 ProcessorHandler 标注，避免泛型函数第一个参数推导为 any
   */
  readonly handler: ProcessorHandler;

  /**
   * 监听器函数（带中间件包装的实际执行函数）
   */
  readonly listener: (event: IpcDefaultEvent<Type>, ...args: CutHead<Parameters<ProcessorHandler>>) => Promise<Awaited<ReturnType<ProcessorHandler>>>;

  /**
   * 添加中间件（支持链式调用）
   *
   * @example
   * ```ts
   * processor.useMiddleware(loggerMiddleware, authMiddleware);
   * ```
   */
  useMiddleware: (...middlewares: IpcMiddleware[]) => this;

  /**
   * 移除中间件（支持链式调用）
   */
  revokeMiddleware: (...middlewares: IpcMiddleware[]) => this;
}

/**
 * 兼容的 IpcProcessor 类型（涵盖所有子类型）
 */
export type IpcCompatibleProcessor = IpcProcessor<IpcType, any, string, (...args: any[]) => any>;

/**
 * IPC 中间件上下文（传递给中间件的生命周期钩子）
 */
export interface IpcMiddlewareContext {
  /**
   * 通道名称
   */
  readonly channel: string;

  /**
   * IPC 类型
   */
  readonly type: IpcType;

  /**
   * 原始事件对象
   */
  readonly event: IpcMainInvokeEvent | IpcMainEvent;

  /**
   * 执行开始时间戳（毫秒）
   */
  readonly startTime: number;

  /**
   * 中间件间共享的元数据存储
   */
  readonly metadata: Map<string, any>;
}

/**
 * IPC 中间件接口（洋葱模型）
 *
 * 中间件按注册顺序形成洋葱结构：
 * - 请求阶段：从外层到内层（onBeforeEach → transformArgs）
 * - 响应阶段：从内层到外层（onSuccess/onError → onAfterEach）
 */
export interface IpcMiddleware {
  /**
   * 中间件名称（唯一标识符）
   */
  readonly name: string;

  /**
   * 前置钩子（请求阶段，洋葱外层）
   *
   * 在下一个中间件或 handler 执行之前调用
   * 可访问原始事件和参数，但不可修改
   */
  readonly onBeforeEach?: (ctx: IpcMiddlewareContext, ...args: unknown[]) => Promise<void> | void;

  /**
   * 参数转换函数（请求阶段，洋葱外层）
   *
   * 用于转换参数（如将 Event 转换为 WindowService）
   * 返回新的参数数组，传递给下一个中间件或 handler
   */
  readonly transformArgs?: (ctx: IpcMiddlewareContext, ...args: [unknown, ...unknown[]]) => Promise<[any, ...any[]]> | [any, ...any[]];


  /**
   * 错误回调（响应阶段，洋葱内层）
   *
   * 仅在 handler 或前置中间件抛出错误时调用
   *
   * @returns
   * - true: 错误已处理，停止向外冒泡
   * - false/void: 继续向外层中间件冒泡
   */
  readonly onError?: (ctx: IpcMiddlewareContext, error: Error) => Promise<boolean | void> | boolean | void;

  /**
   * 响应转换器
   *
   * 用于统一转换响应数据格式
   */
  readonly transformResponse?: <Data extends any>(ctx: IpcMiddlewareContext, response: Data) => Promise<any>;

  /**
   * 后置钩子（响应阶段，洋葱内层）
   *
   * 在 handler 执行之后调用（无论成功或失败）
   * 可访问处理结果，但不可修改
   */
  readonly onAfterEach?: (ctx: IpcMiddlewareContext, result?: any, response?: any) => Promise<void> | void;
}

/**
 * 渲染进程 IPC 调用选项
 */
export interface IpcCallerConfig {
  /**
   * 超时时间（毫秒），0 表示不超时
   */
  timeout?: number;
  
  /**
   * 重试次数
   */
  retry?: number;
  
  /**
   * 重试间隔（毫秒）
   */
  retryDelay?: number;
}
