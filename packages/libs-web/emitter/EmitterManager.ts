export type EmitterKey = '*' | string | symbol | number;

export type ExtractParameters<T> = T extends (...args: infer P) => any ? P : never;
export type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

export type EmitterListener<T> = (data: T) => void | Promise<void>;
export type EmitterHandler<T extends (...args: any[]) => any> = (...args: ExtractParameters<T>) => ExtractReturnType<T>;

/**
 * 停止监听事件的函数回调
 */
export type EmitterListenerOffCallback = () => void;

export type EmitterListenerSlice<T> = {
  /** 监听是否只生效一次 */
  readonly once?: boolean;

  readonly listener: EmitterListener<T>;
}

export type EmitterHandlerSlice<T extends (...args: any[]) => any> = {
  readonly handler: EmitterHandler<T>;
}


export abstract class EmitterManager<BusAsyncEntries extends Record<string | symbol, any>, BusSyncEntries extends Record<string | symbol, (...args: any[]) => any>> {
  private readonly eventMap = new Map<Exclude<EmitterKey, '*'>, EmitterListenerSlice<any>[]>();
  private readonly handleMap = new Map<Exclude<EmitterKey, '*'>, EmitterHandlerSlice<any>>();

  private getListeners<K extends keyof BusAsyncEntries>(busName: K): EmitterListenerSlice<BusAsyncEntries[K]>[] {
    if (!this.eventMap.has(busName)) {
      const listeners: EmitterListenerSlice<BusAsyncEntries[K]>[] = [];
      this.eventMap.set(busName, listeners);
      return listeners;
    }

    const listeners = this.eventMap.get(busName);
    if (Array.isArray(listeners)) return [];
    throw new Error("Invalid");
  }

  private getHandler<K extends keyof BusSyncEntries>(busName: K): EmitterHandlerSlice<BusSyncEntries[K]> | undefined {
    return this.handleMap.get(busName);
  }

  /**
   * 订阅
   * @returns
   */
  protected subscribe<K extends keyof BusAsyncEntries>(busName: K, listener: EmitterListener<BusAsyncEntries[K]>, options?: { once?: boolean }): EmitterListenerOffCallback {
    const listeners = this.getListeners(busName);
    const slice: EmitterListenerSlice<BusAsyncEntries[K]> = {
      once: options?.once,
      listener
    };
    listeners.push(slice);

    return () => {
      const listeners = this.getListeners(busName);
      const index = listeners.indexOf(slice);
      if (index !== -1) listeners.splice(index, 1);

    };
  }

  /**
   * 取消订阅
   * @returns
   */
  protected unsubscribe<K extends keyof BusAsyncEntries>(busName: K, listener: EmitterListener<BusAsyncEntries[K]>) {
    const listeners = this.getListeners(busName);
    const index = listeners.findIndex(slice => slice.listener === listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  /**
   * 通知处理事件
   */
  protected async notice<K extends keyof BusSyncEntries>(busName: K, data: BusSyncEntries[K]) {
    await this.noticeSync(busName, data);
  }

  /**
   * 同步通知处理事件
   */
  protected async noticeSync<K extends keyof BusSyncEntries>(busName: K, data: BusSyncEntries[K]) {
    if (busName === '*') {
      console.error('不允许通知所有事件');
      return;
    }

    const listeners = this.getListeners(busName);
    if (listeners.length === 0) return;

    // 使用 Set 来存储需要删除的 once 监听器，提高查找效率
    const onceListenersToRemove = new Set<EmitterListenerSlice<BusSyncEntries[K]>>();
    const promises: Promise<void>[] = [];

    // 遍历执行监听器
    for (const slice of listeners) {
      try {
        const result = slice.listener(data);
        if (result instanceof Promise) {
          promises.push(result);
        }

        if (slice.once) {
          onceListenersToRemove.add(slice);
        }
      } catch (error) {
        console.error(`Error in event listener for ${String(busName)}:`, error);
      }
    }

    // 等待所有异步监听器完成
    if (promises.length > 0) {
      await Promise.allSettled(promises);
    }

    // 批量删除 once 监听器
    if (onceListenersToRemove.size > 0) {
      const newListeners = listeners.filter(slice => !onceListenersToRemove.has(slice));
      this.eventMap.set(busName, newListeners);
    }
  }

  /**
   * 删除所有事件订阅
   */
  protected clear<K extends keyof BusSyncEntries | keyof BusAsyncEntries>(busName: K) {
    this.eventMap.delete(busName);
    this.handleMap.delete(busName);
  }


  protected handle<K extends keyof BusAsyncEntries>(busName: K, handler: EmitterHandler<BusAsyncEntries[K]>) {
    this.handleMap.set(busName, { handler });
  }

  protected hasInvoke<K extends keyof BusAsyncEntries>(busName: K): boolean {
    return this.handleMap.has(busName);
  }

  protected invoke<K extends keyof BusAsyncEntries>(
    busName: K,
    ...args: ExtractParameters<BusAsyncEntries[K]>
  ): ExtractReturnType<BusAsyncEntries[K]> {
    const handlerSlice = this.getHandler(busName);
    if (!handlerSlice) {
      throw new Error(`No handler registered for event: ${String(busName)}`);
    }
    return handlerSlice.handler(...args);
  }
}
