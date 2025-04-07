import { EmitterManager, ExtractParameters, ExtractReturnType } from './EmitterManager';

export class Emitter<
  BusSyncEntries extends Record<string | symbol, any>,
  BusAsyncEntries extends Record<string | symbol, (...args: any[]) => any>
> extends EmitterManager<BusSyncEntries, BusAsyncEntries> {

  /**
   * 异步发射一个事件
   */
  public async emit<K extends keyof BusSyncEntries>(busName: K, data: BusSyncEntries[K]) {
    await super.notice(busName, data);
  }

  /**
   * 监听一个事件
   */
  public on<K extends keyof BusSyncEntries>(
    busName: K,
    listener: (data: BusSyncEntries[K]) => void | Promise<void>,
    options?: { once?: boolean }
  ) {
    return super.subscribe(busName, listener, options);
  }

  /**
   * 监听一个事件（只触发一次）
   */
  public once<K extends keyof BusSyncEntries>(
    busName: K,
    listener: (data: BusSyncEntries[K]) => void | Promise<void>
  ) {
    return super.subscribe(busName, listener, { once: true });
  }

  /**
   * 移除监听某个事件
   */
  public off<K extends keyof BusSyncEntries>(
    busName: K,
    listener: (data: BusSyncEntries[K]) => void | Promise<void>
  ) {
    super.unsubscribe(busName, listener);
  }

  /**
   * 移除所有监听
   */
  public override clear<K extends keyof BusSyncEntries | keyof BusAsyncEntries>(busName: K) {
    super.clear(busName);
  }

  /**
   * 注册一个事件处理器
   */
  public handle<K extends keyof BusAsyncEntries>(
    busName: K,
    handler: (...args: ExtractParameters<BusAsyncEntries[K]>) => ExtractReturnType<BusAsyncEntries[K]>
  ) {
    super.handle(busName, handler);
  }

  /**
   * 检查是否存在事件处理器
   */
  public hasInvoke<K extends keyof BusAsyncEntries>(busName: K): boolean {
    return super.hasInvoke(busName);
  }

  /**
   * 调用事件处理器并等待结果
   */
  public invoke<K extends keyof BusAsyncEntries>(
    busName: K,
    ...args: ExtractParameters<BusAsyncEntries[K]>
  ): ExtractReturnType<BusAsyncEntries[K]> {
    return super.invoke(busName, ...args);
  }
}


