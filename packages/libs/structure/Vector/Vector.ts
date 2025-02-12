import { Comparator, Vessel } from '../declare';

export class Vector<V> extends Array<V> {

  /**
   * 在指定位置插入元素
   * @param index 插入的位置
   * @param value 要插入的元素
   */
  public insert(index: number, value: V): void {
    super.splice(index, 0, value);
  }

  /**
   * 删除指定位置的元素
   * @param index 要删除的位置
   */
  public erase(index: number): void {
    super.splice(index, 1);
  }

  /**
   * 交换两个元素的位置
   * @param i 第一个元素的索引
   * @param j 第二个元素的索引
   */
  public swap(i: number, j: number): void {
    [super[i], super[j]] = [super[j], super[i]];
  }

  /**
   * 重写 toString
   */
  public override toString(): string {
    return `Vector(${this.join(', ')})`;
  }
}
