/**
 * @rapid/m-ipc-core - Renderer Process
 *
 * 渲染进程 IPC 调用器（仅在渲染进程中可用）
 */

import type { IpcCompatibleProcessor, IpcInvokeOptions } from '../types';
import { ipcRenderer } from 'electron';
import type { MutateProcessorRecord } from '../types/transformation';


/**
 * 渲染进程 IPC 调用器类
 *
 * 提供面向对象的渲染进程 IPC 调用方式
 */
export declare class IpcCaller<IpcProcessorSheet extends Record<string, IpcCompatibleProcessor>> {
  /**
   * 创建 IPC 调用器实例
   *
   * @param defaultOptions - 默认调用选项
   */
  constructor(defaultOptions?: IpcInvokeOptions);

  /**
   * 类型安全的 IPC 调用（invoke/handle）
   *
   * @template Args - 参数数组类型
   * @template Return - 返回值类型
   *
   * @param channel - 通道名称
   * @param args - 参数数组
   * @param options - 调用选项（会合并默认选项）
   * @returns Promise<Return>
   */
  invoke<Args extends any[] = any[], Return = any>(channel: string, args: Args, options?: IpcInvokeOptions): Promise<Return>;

  /**
   * 发送 IPC 消息（send/on，单向通信）
   *
   * @template Args - 参数数组类型
   *
   * @param channel - 通道名称
   * @param args - 参数数组
   * @returns this（支持链式调用）
   */
  send<Args extends any[] = any[]>(channel: string, args: Args): this;

  /**
   * 监听 IPC 消息
   *
   * @template Args - 参数数组类型
   *
   * @param channel - 通道名称
   * @param callback - 回调函数
   * @returns 取消监听的函数
   */
  on<Args extends any[] = any[]>(channel: string, callback: (...args: Args) => void): () => void;

  /**
   * 监听一次 IPC 消息
   *
   * @template Args - 参数数组类型
   *
   * @param channel - 通道名称
   * @param callback - 回调函数
   * @returns this（支持链式调用）
   */
  once<Args extends any[] = any[]>(channel: string, callback: (...args: Args) => void): this;

  /**
   * 移除监听器
   *
   * @param channel - 通道名称
   * @param callback - 要移除的回调函数
   * @returns this（支持链式调用）
   */
  off(channel: string, callback: Function): this;

  /**
   * 移除所有监听器
   *
   * @param channel - 通道名称（可选，不提供则移除所有通道的监听器）
   * @returns this（支持链式调用）
   */
  removeAllListeners(channel?: string): this;

  /**
   * 检查是否有监听器
   *
   * @param channel - 通道名称
   * @returns 监听器数量
   */
  listenerCount(channel: string): number;

  /**
   * 获取调用器配置信息
   */
  getConfig(): Required<IpcInvokeOptions>;

  /**
   * 更新默认配置
   *
   * @param options - 新的默认选项
   * @returns this（支持链式调用）
   */
  setConfig(options: IpcInvokeOptions): this;
}

/**
 * 便捷函数：创建 IPC 调用器实例
 *
 * @param options - 默认调用选项
 * @returns IpcCaller 实例
 */
export declare function createIpcCaller(options?: IpcInvokeOptions): IpcCaller<Record<string, IpcCompatibleProcessor>>;
