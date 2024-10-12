import type { BusKey, BusListener } from './BusManager';
import { BusManager } from './BusManager';

export class Bus extends BusManager {
  /**
   * 异步发射一个事件
   */
  async send(evtName: BusKey, ...args: any[]) {
    super.notice(evtName, ...args);
  }

  /**
   * 同步发射一个事件
   */
  sendSync(evtName: BusKey, ...args: any[]) {
    super.noticeSync(evtName,...args);
  }

  /**
   * 监听一个事件
   */
  on<Listener extends BusListener>(evtName: BusKey, listener: Listener, options?: { once?: boolean }) {
    return super.subscribe(evtName, listener, options);
  }

  once<Listener extends BusListener>(evtName: BusKey, listener: Listener) {
    return super.subscribe(evtName, listener, { once: true });
  }

  /**
   * 移除监听某个事件
   */
  off<Listener extends BusListener>(evtName: BusKey, listener: Listener) {
    super.unsubscribe(evtName, listener);
  }

  /**
   * 移除所有监听
   */
  clear() {
    super.clear();
  }
}

export const bus = new Bus();






