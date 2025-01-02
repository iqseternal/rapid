import { Vessel, Comparator } from '../declare';

/**
 * 普通队列
 */
export class Queue<V> extends Vessel<V> {
  private queueArr: V[] = [];

  /**
   * 队列迭代器
   */
  public override *[Symbol.iterator]() {
    for (let i = 0; i < this.queueArr.length; i ++) {
      yield this.queueArr[i];
    }
  }

  /**
   * 检查队列中是否含有某个元素
   */
  public contains(value: V): boolean {
    for (const v of this.queueArr) {
      if (this.comparator(v, value) === 0) return true;
    }
    return false;
  }

  /**
   * 获取队列的 size
   */
  public override size() {
    return this.queueArr.length;
  }

  /**
   * 检查当前队列是否为空
   */
  public override isEmpty() {
    return this.size() === 0;
  }

  /**
   * 清空当前队列
   */
  public override clear() {
    this.queueArr = [];
  }

  /**
   * push 元素到队列中
   */
  public push(...value: V[]) {
    this.queueArr.push(...value);
  }

  /**
   * 从队列中弹出队首
   */
  public pop(): V | null {
    return this.queueArr.shift() ?? null;
  }

  /**
   * 从队列中获取队首
   */
  public front(): V | null {
    if (this.queueArr.length === 0) return null;
    return this.queueArr[0]!;
  }

  /**
   * 从队列中获取队尾
   */
  public back(): V | null {
    if (this.queueArr.length === 0) return null;
    return this.queueArr[this.queueArr.length - 1]!;
  }
}