import type { BusKey, BusListener } from './BusManager';
import { BusManager } from './BusManager';

export interface BusEvent {
  [Key: BusKey]: unknown;
}

export class Bus<BEvent extends BusEvent> extends BusManager {

  /**
   * 异步发射一个事件
   */
  public async emit<BKey extends keyof BEvent>(busName: BKey, data: BEvent[BKey]) {
    await super.notice(busName, data);
  }

  /**
   * 监听一个事件
   */
  public on<BKey extends keyof BEvent>(busName: BKey, listener: (data: BEvent[BKey]) => (void | Promise<void>), options?: { once?: boolean }) {
    return super.subscribe(busName, listener, options);
  }

  public once<BKey extends keyof BEvent>(busName: BKey, listener: (data: BEvent[BKey]) => (void | Promise<void>)) {
    return super.subscribe(busName, listener, { once: true });
  }

  /**
   * 移除监听某个事件
   */
  public off<BKey extends keyof BEvent>(busName: BKey, listener: (data: BEvent[BKey]) => (void | Promise<void>)) {
    super.unsubscribe(busName, listener);
  }

  /**
   * 移除所有监听
   */
  public override clear<BKey extends keyof BEvent>(busName: BKey) {
    super.clear(busName);
  }
}


