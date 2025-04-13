
import { EffectManager } from './EffectManager';

export type EmitterKey = '*' | string | symbol | number;

export type ExtractParameters<T> = T extends (...args: infer P) => any ? P : never;
export type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

export type EmitterListener<T> = (data: T) => void | Promise<void>;

/**
 * 停止监听事件的函数回调
 */
export type EmitterListenerOffCallback = () => void;

export type EmitterListenerSlice<T> = {
  /** 监听是否只生效一次 */
  readonly once?: boolean;

  readonly listener: EmitterListener<T>;
}

/**
 * 总线事件管理
 */
export abstract class EmitterManager<Entries extends Record<string | symbol, any>> {
  private readonly effectManager = new EffectManager<{
    [Key in keyof Entries]: EmitterListenerSlice<Entries[Key]>;
  }>();

  public constructor() {
    this.effectManager.setComparator((a, b) => {
      return a.listener === b.listener;
    })
  }

  /**
   * 订阅
   * @returns
   */
  protected subscribe<K extends keyof Entries>(busName: K, listener: EmitterListener<Entries[K]>, options?: { once?: boolean }): EmitterListenerOffCallback {
    const slice: EmitterListenerSlice<Entries[K]> = {
      once: options?.once,
      listener
    };
    this.effectManager.combine(busName, slice);

    return () => {
      this.effectManager.eliminate(busName, slice);
    }
  }

  /**
   * 取消订阅
   * @returns
   */
  protected unsubscribe<K extends keyof Entries>(busName: K, listener: EmitterListener<Entries[K]>) {
    this.effectManager.eliminate(busName, { listener });
  }

  /**
   * 通知处理事件
   */
  protected async notice<K extends keyof Entries>(busName: K, data: Entries[K]) {
    if (busName === '*') {
      console.error('不允许通知所有事件');
      return;
    }

    const listeners = this.effectManager.getEffects(busName);
    if (listeners.length === 0) return;

    // 使用 Set 来存储需要删除的 once 监听器，提高查找效率
    const onceListenersToRemove = new Set<EmitterListenerSlice<Entries[K]>>();
    const promises: Promise<void>[] = [];

    // 遍历执行监听器
    for (const slice of listeners) {
      const result = slice.listener(data);
      if (result instanceof Promise) {
        promises.push(result);
      }

      if (slice.once) {
        onceListenersToRemove.add(slice);
      }
    }

    // 批量删除 once 监听器
    if (onceListenersToRemove.size > 0) {
      const newListeners = listeners.filter(slice => !onceListenersToRemove.has(slice));
      this.effectManager.setEffects(busName, newListeners);
    }

    // 等待所有异步监听器完成
    if (promises.length > 0) await Promise.allSettled(promises);
  }

  /**
   * 清空所有事件
   */
  protected clear() {
    this.effectManager.clear();
  }
}
