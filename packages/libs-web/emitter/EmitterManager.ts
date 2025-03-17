import type { DoubleLinkedNode } from '@rapid/libs';
import { DoubleLinkedList } from '@rapid/libs';

export type EmitterKey = '*' | string | symbol | number;

export type EmitterListener = (...args: unknown[]) => Promise<any> | any;

/**
 * 停止监听事件的函数回调
 */
export type EmitterListenerOffCallback = () => void;

export type EmitterListenerSlice = {
  /** 监听是否只生效一次 */
  readonly once?: boolean;

  readonly listener: EmitterListener;
}

export type BusListenerHybrid = {
  // 预留：可做函数到链表节点的快速映射
  readonly listenerMap: WeakMap<EmitterListener, DoubleLinkedNode<EmitterListenerSlice>>;

  readonly linkedList: DoubleLinkedList<EmitterListenerSlice>;
}

export abstract class EmitterManager {
  private readonly eventMap = new Map<Exclude<EmitterKey, '*'>, BusListenerHybrid>();

  /**
   * 获取一个事件监听的混合存储对象
   */
  private getBusListenerHybrid(busName: EmitterKey): BusListenerHybrid {
    if (this.eventMap.has(busName)) return this.eventMap.get(busName)!;

    const listenerMap = new WeakMap<EmitterListener, DoubleLinkedNode<EmitterListenerSlice>>();
    const linkedList = new DoubleLinkedList<EmitterListenerSlice>();

    this.eventMap.set(busName, { listenerMap, linkedList });
    return this.eventMap.get(busName)!;
  }

  /**
   * 订阅
   * @returns
   */
  protected subscribe<Listener extends EmitterListener>(busName: EmitterKey, listener: Listener, options?: { once?: boolean }) {
    const busListenerHybrid = this.getBusListenerHybrid(busName);
    const hybridLinkedList = busListenerHybrid.linkedList;

    const v = {
      once: options?.once,
      listener
    };

    hybridLinkedList.insertAtHead(v);

    return () => {
      hybridLinkedList.deleteWhere(li => li === v);
    }
  }

  /**
   * 取消订阅
   * @returns
   */
  protected unsubscribe<Listener extends EmitterListener>(busName: EmitterKey, listener: Listener) {
    const busListenerHybrid = this.getBusListenerHybrid(busName);
    const hybridLinkedList = busListenerHybrid.linkedList;

    hybridLinkedList.deleteWhere((slice) => slice.listener === listener);
  }

  /**
   * 通知处理事件
   */
  protected async notice(busName: Exclude<EmitterKey, '*'>, ...args: any[]) {
    requestIdleCallback(() => {
      this.noticeSync(busName, ...args);
    })
  }

  /**
   * 同步通知处理事件
   */
  protected noticeSync(busName: Exclude<EmitterKey, '*'>, ...args: any[]) {
    // not allowed
    if (busName === '*') return;

    const busListenerHybrid = this.getBusListenerHybrid(busName);
    const hybridLinkedList = busListenerHybrid.linkedList;

    const usedOnceSlices: EmitterListenerSlice[] = [];

    hybridLinkedList.forEach(slice => {
      slice.listener(...args);

      if (slice.once) {
        usedOnceSlices.push(slice);
      }
    })

    usedOnceSlices.forEach(slice => {
      hybridLinkedList.delete(slice);
    })
  }

  /**
   * 删除所有事件订阅
   */
  protected clear(busName: Exclude<EmitterKey, '*'>) {
    const busListenerHybrid = this.getBusListenerHybrid(busName);
    const hybridLinkedList = busListenerHybrid.linkedList;

    hybridLinkedList.clear();
  }
}
