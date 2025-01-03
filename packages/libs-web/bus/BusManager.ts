import { Printer } from '@suey/printer';
import type { DoubleLinkedNode } from '@rapid/libs';
import { DoubleLinkedList } from '@rapid/libs';

export type BusKey = '*' | string | symbol | number;

export type BusListener = (...args: unknown[]) => Promise<any> | any;

/**
 * 停止监听事件的函数回调
 */
export type BusListenerOffCallback = () => void;

export type BusListenerSlice = {
  /** 监听是否只生效一次 */
  once?: boolean;

  listener: BusListener;
}

export type BusListenerHybrid = {
  // 预留：可做函数到链表节点的快速映射
  listenerMap: WeakMap<BusListener, DoubleLinkedNode<BusListenerSlice>>;

  linkedList: DoubleLinkedList<BusListenerSlice>;
}

export abstract class BusManager {
  private readonly eventMap = new Map<Exclude<BusKey, '*'>, BusListenerHybrid>();

  /**
   * 获取一个事件监听的混合存储对象
   */
  private getBusListenerHybrid(busName: BusKey): BusListenerHybrid {
    if (this.eventMap.has(busName)) return this.eventMap.get(busName)!;

    const listenerMap = new WeakMap<BusListener, DoubleLinkedNode<BusListenerSlice>>();
    const linkedList = new DoubleLinkedList<BusListenerSlice>();

    this.eventMap.set(busName, { listenerMap, linkedList });
    return this.eventMap.get(busName)!;
  }

  /**
   * 订阅
   * @returns
   */
  protected subscribe<Listener extends BusListener>(busName: BusKey, listener: Listener, options?: { once?: boolean }) {
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
  protected unsubscribe<Listener extends BusListener>(busName: BusKey, listener: Listener) {
    const busListenerHybrid = this.getBusListenerHybrid(busName);
    const hybridLinkedList = busListenerHybrid.linkedList;

    hybridLinkedList.deleteWhere((slice) => slice.listener === listener);
  }

  /**
   * 通知处理事件
   */
  protected async notice(busName: Exclude<BusKey, '*'>, ...args: any[]) {
    requestIdleCallback(() => {
      this.noticeSync(busName, ...args);
    })
  }

  /**
   * 同步通知处理事件
   */
  protected noticeSync(busName: Exclude<BusKey, '*'>, ...args: any[]) {
    // not allowed
    if (busName === '*') {
      Printer.printError('不应该通知所有事件进行回调');
      return;
    }

    const busListenerHybrid = this.getBusListenerHybrid(busName);
    const hybridLinkedList = busListenerHybrid.linkedList;

    const usedOnceSlices: BusListenerSlice[] = [];

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
  protected clear(busName: Exclude<BusKey, '*'>) {
    const busListenerHybrid = this.getBusListenerHybrid(busName);
    const hybridLinkedList = busListenerHybrid.linkedList;

    hybridLinkedList.clear();
  }
}
