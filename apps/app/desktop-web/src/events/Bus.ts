import type { BusKey, BusListener } from './BusManager';
import { BusManager } from './BusManager';

export interface BusEvents {
  '*': any[];

  [Key: string | symbol]: any[];
}

export class Bus extends BusManager {
  /**
   * 异步发射一个事件
   */
  async send(busName: BusKey, ...args: any[]) {
    await super.notice(busName, ...args);
  }

  /**
   * 同步发射一个事件
   */
  sendSync(busName: BusKey, ...args: any[]) {
    super.noticeSync(busName,...args);
  }

  /**
   * 监听一个事件
   */
  on<Listener extends BusListener>(busName: BusKey, listener: Listener, options?: { once?: boolean }) {
    return super.subscribe(busName, listener, options);
  }

  once<Listener extends BusListener>(busName: BusKey, listener: Listener) {
    return super.subscribe(busName, listener, { once: true });
  }

  /**
   * 移除监听某个事件
   */
  off<Listener extends BusListener>(busName: BusKey, listener: Listener) {
    super.unsubscribe(busName, listener);
  }

  /**
   * 移除所有监听
   */
  override clear(busName: string) {
    super.clear(busName);
  }
}

export const bus = new Bus();






