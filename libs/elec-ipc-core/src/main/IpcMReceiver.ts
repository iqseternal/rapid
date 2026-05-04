/**
 * @rapid/m-ipc-core - Main Process
 *
 * 主进程 IPC 管理器
 */

import { ipcMain } from 'electron';
import type { IpcMiddleware, IpcCompatibleProcessor } from '../types';
import type { AbstractPrinter } from '../types';
import { IpcAbstractReceiver } from '../base';

/**
 * IPC 管理器
 */
export class IpcMReceiver extends IpcAbstractReceiver {
  private readonly handleProcessors: Map<string, IpcCompatibleProcessor>;
  private readonly onProcessors: Map<string, IpcCompatibleProcessor>;

  /**
   * 创建 IPC 管理器
   */
  public constructor(
    options?: {
      middlewares?: IpcMiddleware[];
      printer?: AbstractPrinter;
    }
  ) {
    super({
      middlewares: options?.middlewares,
      printer: options?.printer,
    });

    this.handleProcessors = new Map();
    this.onProcessors = new Map();
  }

  /**
   * 注册 Handle 类型的 Processor
   * @param processors - Handle 类型的 Processor 数组
   * @returns this（支持链式调用）
   */
  public registerHandle(...processors: IpcCompatibleProcessor[]): this {
    for (const processor of processors) {
      // 如果已存在，先移除旧的监听器
      if (this.handleProcessors.has(processor.channel)) {
        ipcMain.removeHandler(processor.channel);
      }



      // 注册新的 handler
      ipcMain.handle(processor.channel, processor.listener);

      // 存储 processor 引用
      this.handleProcessors.set(processor.channel, processor);
    }
    return this;
  }

  /**
   * 强制将任意 Processor 注册为 Handle 类型
   * 注意：这会忽略 processor 的 type 属性，强制作为 handle 注册
   * @param processors - 任意类型的 Processor 数组
   * @returns this（支持链式调用）
   */
  public registerAsHandle(...processors: IpcCompatibleProcessor[]): this {
    return this.registerHandle(processors as any);
  }

  /**
   * 注册 On 类型的 Processor
   * @param processors - On 类型的 Processor 数组
   * @returns this（支持链式调用）
   */
  public registerOn(...processors: IpcCompatibleProcessor[]): this {
    for (const processor of processors) {
      // 如果已存在，先移除旧的监听器
      if (this.onProcessors.has(processor.channel)) {
        ipcMain.removeAllListeners(processor.channel);
      }

      // 注册新的 listener
      ipcMain.on(processor.channel, processor.listener);

      // 存储 processor 引用
      this.onProcessors.set(processor.channel, processor);
    }
    return this;
  }

  /**
   * 强制将任意 Processor 注册为 On 类型
   * 注意：这会忽略 processor 的 type 属性，强制作为 on 注册
   * @param processors - 任意类型的 Processor 数组
   * @returns this（支持链式调用）
   */
  public registerAsOn(...processors: IpcCompatibleProcessor[]): this {
    return this.registerOn(...processors);
  }

  /**
   * 注册一次性 Handle 类型的 Processor
   * 注册后只会响应一次请求，然后自动移除
   * @param processors - Handle 类型的 Processor 数组
   * @returns this（支持链式调用）
   */
  public registerHandleOnce(processors: IpcCompatibleProcessor[]): this {
    for (const processor of processors) {
      // 如果已存在，先移除旧的监听器
      if (this.handleProcessors.has(processor.channel)) {
        ipcMain.removeHandler(processor.channel);
      }

      // 注册一次性 handler
      ipcMain.handleOnce(processor.channel, async (event, ...args) => {
        // 执行后从 Map 中删除
        this.handleProcessors.delete(processor.channel);
        return processor.listener(event, ...args);
      });

      // 存储 processor 引用（虽然是一次性的，但仍保留引用以便查询）
      this.handleProcessors.set(processor.channel, processor);
    }
    return this;
  }

  /**
   * 移除指定的 Handle Processor
   * @param processorOrChannel - Processor 对象或通道名称
   * @returns this（支持链式调用）
   */
  public removeHandle(processorOrChannel: string | IpcCompatibleProcessor): this {
    const channel = typeof processorOrChannel === 'string' ? processorOrChannel : processorOrChannel.channel;

    if (this.handleProcessors.has(channel)) {
      ipcMain.removeHandler(channel);
      this.handleProcessors.delete(channel);
    }
    return this;
  }

  /**
   * 移除指定的 On Processor
   * @param processorOrChannel - Processor 对象或通道名称
   * @returns this（支持链式调用）
   */
  public removeOn(processorOrChannel: string | IpcCompatibleProcessor): this {
    const channel = typeof processorOrChannel === 'string' ? processorOrChannel : processorOrChannel.channel;

    if (this.onProcessors.has(channel)) {
      ipcMain.removeAllListeners(channel);
      this.onProcessors.delete(channel);
    }
    return this;
  }

  /**
   * 清空所有已注册的 Processors
   * 会移除所有的 Handle 和 On 监听器
   * @returns this（支持链式调用）
   */
  public clearAll(): this {
    // 移除所有 Handle 监听器
    for (const channel of this.handleProcessors.keys()) {
      ipcMain.removeHandler(channel);
    }

    // 移除所有 On 监听器
    for (const channel of this.onProcessors.keys()) {
      ipcMain.removeAllListeners(channel);
    }

    // 清空 Map
    this.handleProcessors.clear();
    this.onProcessors.clear();

    return this;
  }

  /**
   * 获取已注册的 Handle 数量
   * @returns Handle 数量
   */
  public getHandleCount(): number {
    return this.handleProcessors.size;
  }

  /**
   * 获取已注册的 On 数量
   * @returns On 数量
   */
  public getOnCount(): number {
    return this.onProcessors.size;
  }

  /**
   * 获取所有已注册的 Processor 总数
   * @returns Processor 总数
   */
  public getTotalCount(): number {
    return this.handleProcessors.size + this.onProcessors.size;
  }
}

export const ipcMReceiver = new IpcMReceiver();
