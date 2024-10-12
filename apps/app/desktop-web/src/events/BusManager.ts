import { Printer } from '@suey/printer';

export type BusKey = '*' | string | symbol | number;

export type BusListener = (...args: unknown[]) => Promise<any> | any;

/**
 * 停止监听事件的函数回调
 */
export type BusListenerOffCallback = () => void;

export type BusListenerSubscribeHeadNode = {
  head: true;
  previous: null | BusListenerSubscribeHeadNode | BusListenerSubscribeNode;
  current: null;
  next: null | BusListenerSubscribeHeadNode | BusListenerSubscribeNode;
}

export type BusListenerSubscribeNode = {
  /** 标识当前是否是一个头指针 */
  head: false;
  /** 上一个 */
  previous: null | BusListenerSubscribeHeadNode | BusListenerSubscribeNode;
  current: {
    /** 监听是否只生效一次 */
    once?: boolean;

    listener: BusListener;

    remove: BusListenerOffCallback;
  };
  /** 下一个 */
  next: null | BusListenerSubscribeHeadNode | BusListenerSubscribeNode;
}

export abstract class BusManager {
  private readonly listenerMap = new Map<Exclude<BusKey, '*'>, BusListenerSubscribeHeadNode>();

  /**
   * 初始化链表访问
   * @returns
   */
  private initListenerLink(evtName: BusKey) {
    if (this.listenerMap.has(evtName)) return this.listenerMap.get(evtName)!;

    const head: BusListenerSubscribeHeadNode = { head: true, previous: null, current: null, next: null };
    head.previous = head;
    head.next = head;

    this.listenerMap.set(evtName, head);
    return head;
  }

  /**
   * 订阅
   * @returns
   */
  protected subscribe<Listener extends BusListener>(evtName: BusKey, listener: Listener, options?: { once?: boolean }) {
    const head = this.initListenerLink(evtName);
    const newSubscribeNode: BusListenerSubscribeNode = {
      head: false,
      previous: null,
      current: {
        once: options?.once,
        listener,
        remove: () => {
          if (newSubscribeNode.previous && newSubscribeNode.next) {
            const previous = newSubscribeNode.previous;
            const next = newSubscribeNode.next;

            previous.next = next;
            next.previous = previous;
          }
        }
      },
      next: null,
    };

    const lastSubscribeNode = head.previous ?? head;
    // 尾插
    lastSubscribeNode.next = newSubscribeNode;
    newSubscribeNode.previous = lastSubscribeNode;
    newSubscribeNode.next = head;
    head.previous = newSubscribeNode;
    return newSubscribeNode.current.remove;
  }

  /**
   * 取消订阅
   * @returns
   */
  protected unsubscribe<Listener extends BusListener>(evtName: BusKey, listener: Listener) {
    const head = this.listenerMap.get(evtName);
    if (!head) return;

    let next = head.next;
    while (next) {
      if (next.head) return;

      if (next.current.listener === listener) {
        next.current.remove();
      }

      next = next.next;
    }
  }

  /**
   * 通知处理事件
   */
  protected async notice(evtName: Exclude<BusKey, '*'>, ...args: any[]) {
    requestIdleCallback(() => {
      this.noticeSync(evtName, ...args);
    })
  }

  /**
   * 同步通知处理事件
   */
  protected noticeSync(evtName: Exclude<BusKey, '*'>, ...args: any[]) {
    // not allowed
    if (evtName === '*') {

      Printer.printError('不应该通知所有事件进行回调');

      return;
    }

    const head = this.listenerMap.get(evtName);
    if (!head) return;

    let next = head.next;
    while (next) {
      if (next.head) return;

      const listener = next.current.listener;
      listener(...args);

      if (next.current.once) {
        next.current.remove();
      }

      next = next.next;
    }
  }

  /**
   * 删除所有事件订阅
   */
  protected clear() {
    this.listenerMap.clear();
  }
}
