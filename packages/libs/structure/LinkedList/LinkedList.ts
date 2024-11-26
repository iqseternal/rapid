import { Vessel } from '../declare';

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
export abstract class LinkedList<V, Node extends LinkedNode<V>> extends Vessel<V> {
  /**
   * 链表的固定头节点
   *
   */
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
  public abstract [Symbol.iterator](): Iterator<Readonly<V>>;

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
   * 删除符合 condition 的节点
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.deleteNodeWhere((node) => node.value > 10);
   */
  protected abstract deleteNodeWhere(condition: (node: Readonly<Node>) => boolean): Node | null;

  /**
   * 删除符合 value 的元素节点
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.delete(10);
   */
  public abstract delete(value: V): V | null;

  /**
   * 删除符合 condition 的元素节点
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.deleteWhere((value) => value > 10);
   */
  public abstract deleteWhere(condition: (value: V) => boolean): V | null;

  /**
   * 从头部顺序查找符合 value 的节点
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.findNodeFromHead(10);
   */
  protected abstract findNodeFromHead(value: V): Readonly<Node> | null;

  /**
   * 从头部顺序查找符合 condition 的节点
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.findNodeFromHeadWhere((node) => node.value > 10);
   */
  protected abstract findNodeFromHeadWhere(condition: (node: Readonly<Node>) => boolean): Readonly<Node> | null;

  /**
   * 从头部顺序查找符合 value 的元素
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.findFromHead(10);
   */
  public abstract findFromHead(value: V): V | null;

  /**
   * 从头部顺序查找符合 condition 的元素
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.findFromHeadWhere((value) => value > 10);
   */
  public abstract findFromHeadWhere(condition: (value: V) => boolean): V | null;

  /**
   * 查找符合 value 的节点
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.findNode(10);
   */
  protected abstract findNode(value: V): Node | null;

  /**
   * 查找符合 condition 的节点
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.findNodeWhere((node) => node.value > 10);
   */
  protected abstract findNodeWhere(condition: (node: Readonly<Node>) => boolean): Readonly<Node> | null;

  /**
   * 查找符合 value 的节点集合
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.findNodeAll(10);
   */
  protected abstract findNodeAll(value: V): Node[];

  /**
   * 查找符合 condition 的节点集合
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.findNodeAllWhere((node) => node.value > 10);
   */
  protected abstract findNodeAllWhere(condition: (node: Readonly<Node>) => boolean): Readonly<Node>[];

  /**
   * 查找符合 value 的元素
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.find(10);
   */
  public abstract find(value: V): V | null;

  /**
   * 查找符合 condition 的元素
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.findWhere((value) => value > 10);
   */
  public abstract findWhere(condition: (value: V) => boolean): V | null;

  /**
   * 查找符合 value 的元素集合
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.findAll(10);
   */
  public abstract findAll(value: V): V[];

  /**
   * 查找符合 condition 的元素集合
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.findAllWhere((value) => value > 10);
   */
  public abstract findAllWhere(condition: (value: V) => boolean): V[];

  /**
   * forEachNode 遍历节点
   *
   * @example
   *
   * const linkedList = new LinkedList<number>();
   *
   * linkedList.forEachNode((node) => {
   *    // node: Readonly<Node>
   * });
   */
  protected abstract forEachNode(callback: (node: Readonly<Node>) => void): void;

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
}
