import { Vessel } from '../declare';
import { DoubleLinkedList, SinglyLinkedList } from '../LinkedList';

/**
 * 双端队列
 */
export class Dequeue<V> extends Vessel<V> {
  private dequeueArr: V[] = [];

  /**
   * 双端队列迭代器
   */
  public override *[Symbol.iterator]() {
    for (let i = 0; i < this.dequeueArr.length; i ++) {
      yield this.dequeueArr[i];
    }
  }

  /**
   * 检查双端队列中是否含有某个特定元素
   */
  public contains(value: V): boolean {
    for (const v of this.dequeueArr) {
      if (this.comparator(v, value) === 0) return true;
    }
    return false;
  }

  /**
   * 获取双端队列的大小
   */
  public override size() {
    return this.dequeueArr.length;
  }

  /**
   * 检查双端队列是否为空
   */
  public override isEmpty() {
    return this.size() === 0;
  }

  /**
   * 清空双端队列
   */
  public override clear() {
    this.dequeueArr = [];
  }

  /**
   * push 元素到队首
   */
  public pushFront(...value: V[]) {
    this.dequeueArr.unshift(...value);
  }

  /**
   * 弹出队首元素
   */
  public popFront(): V | null {
    if (this.dequeueArr.length === 0) return null;
    return this.dequeueArr.shift() ?? null;
  }

  /**
   * 获取队首元素
   */
  public front(): V | null {
    if (this.dequeueArr.length === 0) return null;
    return this.dequeueArr[0] ?? null;
  }

  /**
   * push 元素到队尾
   */
  public pushBack(...value: V[]) {
    this.dequeueArr.push(...value);
  }

  /**
   * 弹出队尾元素
   */
  public popBack(): V | null {
    if (this.dequeueArr.length === 0) return null;
    return this.dequeueArr.pop() ?? null;
  }

  /**
   * 获取队尾元素
   */
  public back(): V | null {
    if (this.dequeueArr.length === 0) return null;
    return this.dequeueArr[this.dequeueArr.length - 1] ?? null;
  }
}



/**
 * 双端队列: 链表实现
 */
export class LinkedDequeue<V> extends Vessel<V> {
  private readonly linkedQueue = new DoubleLinkedList<V>();

  /**
   * 双端队列迭代器
   */
  public override *[Symbol.iterator]() {
    for (const v of this.linkedQueue) {
      yield v;
    }
  }

  /**
   * 检查双端队列中是否含有某个特定元素
   */
  public contains(value: V): boolean {
    for (const v of this.linkedQueue) {
      if (this.comparator(v, value) === 0) return true;
    }
    return false;
  }

  /**
   * 获取双端队列的大小
   */
  public override size() {
    return this.linkedQueue.size();
  }

  /**
   * 检查双端队列是否为空
   */
  public override isEmpty() {
    return this.size() === 0;
  }

  /**
   * 清空双端队列
   */
  public override clear() {
    this.linkedQueue.clear();
  }

  /**
   * push 元素到队首
   */
  public pushFront(...value: V[]) {
    this.linkedQueue.insertAtHead(...value);
  }

  /**
   * 弹出队首元素
   */
  public popFront(): V | null {
    if (this.linkedQueue.size() === 0) return null;
    return this.linkedQueue.deleteAtHead() ?? null;
  }

  /**
   * 获取队首元素
   */
  public front(): V | null {
    if (this.linkedQueue.size() === 0) return null;
    return this.linkedQueue.findFromHeadWhere(() => true) ?? null;
  }

  /**
   * push 元素到队尾
   */
  public pushBack(...value: V[]) {
    this.linkedQueue.insertAtTail(...value);
  }

  /**
   * 弹出队尾元素
   */
  public popBack(): V | null {
    if (this.linkedQueue.size() === 0) return null;
    return this.linkedQueue.deleteAtTail() ?? null;
  }

  /**
   * 获取队尾元素
   */
  public back(): V | null {
    if (this.linkedQueue.length === 0) return null;
    return this.linkedQueue.findFromTailWhere(() => true) ?? null;
  }
}
