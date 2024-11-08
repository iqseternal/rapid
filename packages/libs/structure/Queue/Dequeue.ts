import { Vessel } from '../declare';

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
  public override contains(value: V): boolean {
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