import { Vessel } from '../declare';
import { SinglyLinkedList } from '../LinkedList';

export abstract class StackType<V> extends Vessel<V> {
  /**
   * 检查栈中是否有制定元素
   */
  public abstract contains(value: V): boolean;

  /**
   * 压栈
   */
  public abstract push(value: V): void;

  /**
   * 弹出栈顶元素
   * @returns
   */
  public abstract pop(): V | null;

  /**
   * 访问栈顶元素, 但是不弹出元素
   */
  public abstract top(): V | null;
}

/**
 * 数据结构：栈
 */
export class Stack<V> extends StackType<V> {
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
  public override push(...value: V[]): void {
    this.stackArr.push(...value);
  }

  /**
   * 访问栈顶元素, 但是不弹出元素
   */
  public override top(): V | null {
    return this.stackArr[this.stackArr.length - 1];
  }

  /**
   * 弹出栈顶元素
   * @returns
   */
  public override pop(): V | null {
    return this.stackArr.pop() ?? null;
  }
}

/**
 * 数据结构：链栈
 */
export class LinkedStack<V> extends StackType<V> {
  private readonly linked = new SinglyLinkedList<V>();

  /**
   * 压栈
   */
  public override push(...value: V[]): void {
    for (const v of value) {
      this.linked.insertAtHead(v);
    }
  }

  /**
   * 访问栈顶元素, 但是不弹出元素
   */
  public override top() {
    return this.linked.findFromHeadWhere(() => true);
  }

  /**
   * 弹出栈顶元素
   * @returns
   */
  public override pop(): V | null {
    return this.linked.deleteAtHead();
  }

  /**
   * 迭代器, 按照出栈顺序迭代栈
   */
  public override *[Symbol.iterator](): Iterator<V> {
    for (const v of this.linked) {
      yield v;
    }
  }

  /**
   * 清空栈
   */
  public override clear(): void {
    this.linked.clear();
  }

  /**
   * 返回栈的尺寸
   */
  public override size(): number {
    return this.linked.size();
  }

  /**
   * 返回栈是否为空
   */
  public override isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * 检查栈中是否有制定元素
   */
  public override contains(value: V): boolean {
    for (const v of this.linked) {
      if (this.comparator(v, value) === 0) return true;
    }
    return false;
  }
}
