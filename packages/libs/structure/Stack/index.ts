import { Vessel, Comparator } from '../declare';

/**
 * 数据结构：栈
 */
export class Stack<V> extends Vessel<V> {
  private stackArr: V[] = [];

  /**
   * 迭代器, 按照出栈顺序迭代栈
   */
  public override *[Symbol.iterator]() {
    const len = this.size();
    for (let i = len - 1; i >= 0; i--) {
      yield this.stackArr[i];
    }
  }

  /**
   * 检查栈中是否有制定元素
   */
  public override contains(value: V): boolean {
    for (const v of this.stackArr) {
      if (this.comparator(v, value) === 0) return true;
    }
    return false;
  }

  /**
   * 返回栈的尺寸
   */
  public override size() {
    return this.stackArr.length;
  }

  /**
   * 返回栈是否为空
   */
  public override isEmpty() {
    return this.size() === 0;
  }

  /**
   * 清空栈
   */
  public override clear() {
    this.stackArr = [];
  }

  /**
   * 压栈
   */
  public push(...value: V[]): void {
    this.stackArr.push(...value);
  }

  /**
   * 访问栈顶元素, 但是不弹出改元素
   */
  public top(): V | null {
    return this.stackArr[this.stackArr.length - 1];
  }

  /**
   * 弹出栈顶元素
   * @returns
   */
  public pop(): V | null {
    return this.stackArr.pop() ?? null;
  }
}
