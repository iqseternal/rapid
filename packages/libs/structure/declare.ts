
/**
 * 比较器
 */
export interface Comparator<V> {
  /**
   * 比较器, 返回结果为
   * 0 标识相等,
   * 正数: v1 > v2,
   * 负数: v1 < v2
   */
  (v1: V, v2: V): number;
}

/**
 * stl 容器
 */
export abstract class Vessel<V> {
  /**
   * 容器的默认比较器
   *
   * if v1 === v2 return 0
   * if v1 > v2 return 1
   * if v1 < v2 return -1
   *
   * if return === 0 表示两者相等
   * if return > 0 表示 v1 > v2
   * if return < 0 表示 v1 < v2
   *
   */
  protected comparator: Comparator<V> = (v1, v2) => {
    if (v1 === v2) return 0;
    if (typeof v1 !== 'number' && typeof v1 !== 'string') return 1;
    if (typeof v2 !== 'number' && typeof v2 !== 'string') return 1;
    if (v1 > v2) return 1;
    return -1;
  };

  /**
   * 容器可被迭代
   */
  public abstract [Symbol.iterator](): Iterator<V>;

  /**
   * 获取容器的尺寸大小
   */
  public abstract size(): number;

  /**
   * 检查容器是否为空
   */
  public abstract isEmpty(): boolean;

  /**
   * 清空容器
   */
  public abstract clear(): void;

  /**
   * 查看容器中是否包含某个元素
   */
  public abstract contains(value: V): boolean;

  /**
   * 设置比较器
   */
  public setComparator(comparator: Comparator<V>): void {
    this.comparator = comparator;
  }
}

