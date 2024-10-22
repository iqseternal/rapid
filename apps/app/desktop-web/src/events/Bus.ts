import type { BusKey, BusListener } from './BusManager';
import { BusManager } from './BusManager';

export type BusEvent = {
  [Key: BusKey]: BusListener;
}

export class Bus<BEvent extends BusEvent> extends BusManager {

  /**
   * 异步发射一个事件
   */
  async send<BKey extends keyof BEvent>(busName: BKey, ...args: Parameters<BEvent[BKey]>) {
    await super.notice(busName, ...args);
  }

  /**
   * 同步发射一个事件
   */
  sendSync<BKey extends keyof BEvent>(busName: BKey, ...args: Parameters<BEvent[BKey]>) {
    super.noticeSync(busName,...args);
  }

  /**
   * 监听一个事件
   */
  on<BKey extends keyof BEvent>(busName: BKey, listener: BEvent[BKey], options?: { once?: boolean }) {
    return super.subscribe(busName, listener, options);
  }

  once<BKey extends keyof BEvent>(busName: BKey, listener: BEvent[BKey]) {
    return super.subscribe(busName, listener, { once: true });
  }

  /**
   * 移除监听某个事件
   */
  off<BKey extends keyof BEvent>(busName: BKey, listener: BEvent[BKey]) {
    super.unsubscribe(busName, listener);
  }

  /**
   * 移除所有监听
   */
  override clear<BKey extends keyof BEvent>(busName: BKey) {
    super.clear(busName);
  }
}

export const bus = new Bus<Rapid.Bus.BusEvent>();
