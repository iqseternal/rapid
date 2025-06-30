import { EmitterManager, ExtractParameters, ExtractReturnType } from './EmitterManager';

export class Emitter<Entries extends Record<string | symbol, any>> extends EmitterManager<Entries> {
  /**
   * 异步发射一个事件
   */
  public emit<K extends keyof Entries>(busName: K, data: Entries[K]) {
    return super.notice(busName, data);
  }

  /**
   * 监听一个事件
   */
  public on<K extends keyof Entries>(busName: K, listener: (data: Entries[K]) => void | Promise<void>, options?: { once?: boolean }) {
    return super.subscribe(busName, listener, options);
  }

  /**
   * 监听一个事件（只触发一次）
   */
  public once<K extends keyof Entries>(busName: K, listener: (data: Entries[K]) => void | Promise<void>) {
    return super.subscribe(busName, listener, { once: true });
  }

  /**
   * 移除监听某个事件
   */
  public off<K extends keyof Entries>(busName: K, listener: (data: Entries[K]) => void | Promise<void>) {
    super.unsubscribe(busName, listener);
  }

  /**
   * 移除所有监听
   */
  public override clear() {
    super.clear();
  }
}


