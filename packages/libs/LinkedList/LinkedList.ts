
/**
 * 链表节点
 */
export interface LinkedNode<V> {
  /**
   * 标识当前是否是一个头节点 (头节点不携带任何数据)
   */
  readonly isHead: true | false;
  /**
   * 节点携带的数据
   */
  readonly value: this['isHead'] extends true ? null : V;
}

/**
 * 链表抽象类
 */
export abstract class LinkedList<V, Node extends LinkedNode<V>> {
  /** 链表的固定头节点 */
  protected abstract readonly head: Node;

  /**
   * 迭代器：
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * for (const value of linkedList) {
   *    // value: number
   * }
   */
  public abstract [Symbol.iterator](): Iterator<V>;

  /**
   * 通过 value 初始化一个节点
   */
  protected abstract initNode(value: V): Node;

  /**
   * 以头插法, 插入节点, 确保在链表头部
   */
  protected abstract insertNodeAtHead(...nodes: Node[]): void;

  /**
   * 以头插法, 插入元素, 确保在链表头部
   */
  public abstract insertAtHead(...values: V[]): void;

  /**
   * 以尾插法, 插入节点, 确保在链表尾部
   */
  protected abstract insertNodeAtTail(...nodes: Node[]): void;

  /**
   * 以尾插法, 插入元素, 确保在链表尾部
   */
  public abstract insertAtTail(...values: V[]): void;

  /**
   * 向链表中插入节点, 但是位置是不定的, 只是确保在链表当中
   */
  protected abstract insertNode(...node: Node[]): void;

  /**
   * 向链表中插入元素, 但是位置是不定的, 只是确保在链表当中
   */
  public abstract insert(...values: V[]): void;

  /**
     * 删除一个头部节点
     */
  protected abstract deleteNodeAtHead(): Node | null;

  /**
   * 删除一个头部元素
   */
  public abstract deleteAtHead(): V | null;

  /**
   * 删除一个尾部节点
   */
  protected abstract deleteNodeAtTail(): Node | null;

  /**
   * 删除一个尾部元素
   */
  public abstract deleteAtTail(): V | null;

  /**
   * 删除一个节点
   */
  protected abstract deleteNode(node: Node): Node | null;
  /**
   * 删除符合 predicate 的元素节点
   */
  public abstract delete(predicate: (value: V) => boolean): V[];

  /**
     * 从头部顺序查找符合 predicate 的节点集合
     */
  protected abstract findNodeFromHead(predicate: (value: Node) => boolean): Node | null;

  /**
   * 从头部顺序查找符合 predicate 的元素集合
   */
  public abstract findFromHead(predicate: (value: V) => boolean): V | null;

  /**
   * 查找符合 predicate 的节点集合
   */
  protected abstract findNode(predicate: (node: Node) => boolean): Node | null;

  protected abstract findNodeAll(predicate: (value: Node) => boolean): Node[];

  /**
   * 查找符合 predicate 的元素
   */
  public abstract find(predicate: (value: V) => boolean): V | null;

  public abstract findAll(predicate: (value: V) => boolean): V[];

  /**
     * forEachNode 遍历节点
     */
  protected abstract forEachNode(callback: (node: Node) => void): void;

  /**
   * forEach 遍历元素
   */
  public abstract forEach(callback: (value: V) => void): void;

  /**
   * 克隆一个新的节点
   */
  protected abstract cloneNode(node: Node): Node;

  /**
   * 克隆一个新的 LinkedList
   */
  public abstract clone(): LinkedList<V, Node>;

  /**
   * 合并 otherList, 并获得一个新的 LinkedList
   */
  public abstract merge(otherList: LinkedList<V, Node>): LinkedList<V, Node>;

  /**
   * 清空链表
   */
  public abstract clear(): void;

  /**
   * 查看当前链表是否为空
   */
  public abstract isEmpty(): boolean;

  /**
   * 获取链表的长度
   */
  public abstract length(): number;
}
