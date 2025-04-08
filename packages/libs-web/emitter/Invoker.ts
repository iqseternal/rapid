import type { InvokerKey, InvokerHandler, ExtractInvokerHandler, ExtractParameters, ExtractReturnType } from './InvokerManager';
import { InvokerManager } from './InvokerManager';

/**
 * 总线事件管理 (等待函数执行获得返回结果
 */
export class Invoker<Entries extends Record<InvokerKey, InvokerHandler>> extends InvokerManager<Entries> {

  /**
   * 注册一个事件的执行函数
   */
  public handle<K extends keyof Entries>(key: K, handler: ExtractInvokerHandler<Entries[K]>) {
    super.handle(key, handler);
  }

  /**
   * 发送事件, 并获取执行的返回结果
   */
  public invoke<K extends keyof Entries>(key: K, ...args: ExtractParameters<Entries[K]>): ExtractReturnType<Entries[K]> {
    return super.invoke(key, ...args);
  }
}
