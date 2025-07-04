import { Vessel } from '../declare';

/**
 * 优先级队列
 */
export class PriorityQueue<V> extends Vessel<V> {

  private priorityQueueArr: [undefined, ...V[]] = [void 0];
  private length: number = 0;

  /**
   * 迭代单调队列, 但使用迭代器迭代队列会导致元素被清空
   * 外部不允许对优先级队列使用迭代器
   */
  protected override *[Symbol.iterator](): Iterator<V> {
    while (this.length) {
      const v = this.pop();
      if (v) yield v;
    }
  }

  /**
   * 队首
   */
  public top(): V | null {
    if (this.length === 0) return null;
    return this.priorityQueueArr[1];
  }

  /**
   * 放入元素到单调队列中
   */
  public push(...values: V[]): void {
    values.forEach(value => {
      this.priorityQueueArr[++ this.length] = value;
      this.swim(this.length);
    })
  }

  /**
   * 弹出队首
   */
  public pop(): V | null {
    if (this.length === 0) return null;
    const value = this.priorityQueueArr[1];
    this.swap(1, this.length);
    this.priorityQueueArr[this.length] = void 0;
    this.length --;
    this.sink(1);
    return value;
  }

  /**
   * 上浮
   */
  private swim(index: number) {
    while (index > 1) {
      const cur = this.priorityQueueArr[index];
      const parent = this.priorityQueueArr[index >> 1];

      if (!cur || !parent) return;
      if (this.comparator(cur, parent) >= 0) return;

      this.swap(index, index >> 1);

      index = index >> 1;
    }
  }

  /**
   * 下沉
   */
  private sink(index: number) {
    if (index <= 0) return;

    while (2 * index <= this.length) {
      let k = index * 2;

      if (k + 1 <= this.length) {
        const left = this.priorityQueueArr[k];
        const right = this.priorityQueueArr[k + 1];

        if (!left || !right) return;

        if (this.comparator(left, right) > 0) {
          k ++;
        }
      }

      const current = this.priorityQueueArr[index];
      const child = this.priorityQueueArr[k];
      if (!current || !child) return;

      if (this.comparator(current, child) > 0) {
        this.swap(index, k);
        index = k;
        continue;
      }

      break;
    }
  }

  /**
   * 交换元素
   */
  private swap(i: number, j: number) {
    if (i <= 0 || i > this.length) return;
    if (j <= 0 || j > this.length) return;
    const t = this.priorityQueueArr[i];
    this.priorityQueueArr[i] = this.priorityQueueArr[j];
    this.priorityQueueArr[j] = t;
  }

  /**
   * 清空单调队列
   */
  public override clear() {
    this.priorityQueueArr = [void 0];
    this.length = 0;
  }

  /**
   * 检测单调队列是否为空
   */
  public override isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * 获得单调队列的大小
   */
  public override size(): number {
    return this.length;
  }
}
