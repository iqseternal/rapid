
import { EffectManager } from './EffectManager';

export type InvokerKey = '*' | string | symbol | number;

export type InvokerHandler = (...args: any[]) => any;

export type ExtractParameters<T> = T extends (...args: infer P) => any ? P : never;
export type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

export type ExtractInvokerHandler<T extends (...args: any[]) => any> = (...args: ExtractParameters<T>) => ExtractReturnType<T>;

/**
 * 总线事件管理 (等待函数执行获得返回结果
 */
export abstract class InvokerManager<Entries extends Record<InvokerKey, InvokerHandler>> {

  private readonly effectManager = new Map<keyof Entries, InvokerHandler>();

  /**
   * 注册一个事件的执行函数
   */
  protected handle<K extends keyof Entries>(key: K, handler: ExtractInvokerHandler<Entries[K]>) {
    this.effectManager.set(key, handler);
  }

  /**
   * 发送事件, 并获取执行的返回结果
   */
  protected invoke<K extends keyof Entries>(key: K, ...args: ExtractParameters<Entries[K]>): ExtractReturnType<Entries[K]> {

    const handler = this.effectManager.get(key);

    if (!handler) throw new Error(`no handler registered for event: ${String(key)}`);

    return handler(...args);
  }
}
