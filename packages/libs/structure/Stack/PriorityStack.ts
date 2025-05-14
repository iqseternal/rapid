import { LinkedStack, Stack } from './Stack';

/**
 * 单调栈
 */
export class PriorityStack<V> extends Stack<V> {

  /**
   * 单调栈压栈会根据比较器规则自动弹栈出不符合的元素
   */
  public override push(...values: V[]): void {
    values.forEach(value => {
      if (this.isEmpty()) {
        super.push(value);
        return;
      }

      const element = this.top();
      if (!element) return;

      if (this.comparator(element, value) > 0) {
        this.pop();
        super.push(value);
        return;
      }

      super.push(value);
    })
  }
}

/**
 * 单调栈
 */
export class PriorityLinkedStack<V> extends LinkedStack<V> {
  /**
   * 单调栈压栈会根据比较器规则自动弹栈出不符合的元素
   */
  public override push(...values: V[]): void {
    values.forEach(value => {
      if (this.isEmpty()) {
        super.push(value);
        return;
      }

      const element = this.top();
      if (!element) return;

      if (this.comparator(element, value) > 0) {
        this.pop();
        super.push(value);
        return;
      }

      super.push(value);
    })
  }
}
