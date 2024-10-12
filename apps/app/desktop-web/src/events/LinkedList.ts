
/**
 * 链表节点
 */
export interface LinkedNode<V> {
  /**
   * 标识当前是否是一个头节点 (头节点不携带任何数据)
   */
  isHead: true | false;
  /**
   * 节点携带的数据
   */
  value: this['isHead'] extends true ? null : V;
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
   * 向链表中插入节点, 但是位置是不定的, 只是确保在链表当中
   */
  protected abstract insertNode(...node: Node[]): void;
  /**
   * 向链表中插入元素, 但是位置是不定的, 只是确保在链表当中
   */
  public abstract insert(...values: V[]): void;

  /**
   * 以头插法, 插入节点, 确保在链表头部
   */
  protected abstract insertNodeAtHead(...nodes: Node[]): void;
  /**
   * 以头插法, 插入元素, 确保在链表头部
   */
  abstract insertAtHead(...values: V[]): void;

  /**
   * 以尾插法, 插入节点, 确保在链表尾部
   */
  protected abstract insertNodeAtTail(...nodes: Node[]): void;
  /**
   * 以尾插法, 插入元素, 确保在链表尾部
   */
  abstract insertAtTail(...values: V[]): void;

  /**
   * 删除一个节点
   */
  protected abstract deleteNode(node: Node): Node | null;
  /**
   * 删除符合 predicate 的元素节点
   */
  public abstract delete(predicate: (value: V) => boolean): V[];

  /**
   * 删除一个头部节点
   */
  protected abstract deleteNodeAtHead(): Node | null;
  /**
   * 删除一个头部元素
   */
  abstract deleteAtHead(): V | null;

  /**
   * 删除一个尾部节点
   */
  protected abstract deleteNodeAtTail(): Node | null;
  /**
   * 删除一个尾部元素
   */
  abstract deleteAtTail(): V | null;
  /**
   * 查找符合 predicate 的节点集合
   */
  protected abstract findNode(predicate: (node: Node) => boolean): Node | null;
  /**
   * 查找符合 predicate 的元素集合
   */
  public abstract find(predicate: (value: V) => boolean): V | null;
  /**
   * 从头部顺序查找符合 predicate 的节点集合
   */
  protected abstract findNodeFromHead(predicate: (value: Node) => boolean): Node | null;
  /**
   * 从头部顺序查找符合 predicate 的元素集合
   */
  abstract findFromHead(predicate: (value: V) => boolean): V | null;
  /**
   * 克隆一个新的节点
   */
  protected abstract cloneNode(node: Node): Node;
  /**
   * 克隆一个新的 LinkedList
   */
  abstract clone(): LinkedList<V, Node>;

  /**
   * 合并 otherList, 并获得一个新的 LinkedList
   */
  abstract merge(otherList: LinkedList<V, Node>): LinkedList<V, Node>;

  /**
   * forEachNode 遍历节点
   */
  protected abstract forEachNode(callback: (node: Node) => void): void;

  /**
   * forEach 遍历元素
   */
  abstract forEach(callback: (value: V) => void): void;

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


export interface SinglyLinkedNode<V> extends LinkedNode<V> {
  next: this | null;
}

/**
 * 单向链表
 */
export class SinglyLinkedList<V> extends LinkedList<V, SinglyLinkedNode<V>> {
  protected override head: SinglyLinkedNode<V> = { isHead: true, value: null as unknown as V, next: null };
  /**
   * 单向链表的最后一个节点
   */
  protected tail: SinglyLinkedNode<V> = this.head;

  override *[Symbol.iterator](): Iterator<V> {
    let node: SinglyLinkedNode<V> | null = this.head.next;

    while (node) {
      if (node.isHead) return;
      yield node.value;
      node = node.next;
    }
  }

  protected override initNode(value: V): SinglyLinkedNode<V> {
    return {
      isHead: false,
      value,
      next: null,
    }
  }

  override insertAtHead(...values: V[]): void {
    const nodes = values.map(value => this.initNode(value));
    this.insertNodeAtHead(...nodes);
  }

  protected override insertNodeAtHead(...nodes: SinglyLinkedNode<V>[]): void {
    nodes.forEach(node => {
      node.next = this.head.next;
      this.head.next = node;
    })
  }

  override insertAtTail(...values: V[]): void {
    const nodes = values.map(value => this.initNode(value));
    this.insertNodeAtTail(...nodes);
  }
  protected override insertNodeAtTail(...nodes: SinglyLinkedNode<V>[]): void {
    nodes.forEach(node => {
      this.tail.next = node;
      this.tail = node;
    })
  }

  protected override insertNode(...nodes: SinglyLinkedNode<V>[]): void {
    this.insertNodeAtTail(...nodes);
  }

  public override insert(...values: V[]) {
    this.insertAtTail(...values);
  }

  protected override deleteNode(node: SinglyLinkedNode<V>): SinglyLinkedNode<V> | null {
    const prevNode = this.findNodeFromHead(node => node.next === node);
    if (prevNode) {
      prevNode.next = node.next;
      node.next = null;
    }
    return node;
  }

  public override delete(predicate: (value: V) => boolean): V[] {
    let result: SinglyLinkedNode<V>[] = [];

    let node: SinglyLinkedNode<V> | null = this.head;
    while (node.next) {
      if (predicate(node.next.value)) {

        const target = node.next;
        node.next = target.next;
        target.next = null;
        result.push(target);
      }
      else node = node.next;
    }

    return result.map(node => node.value);
  }

  protected override deleteNodeAtHead(): SinglyLinkedNode<V> | null {
    const node = this.head.next;
    if (!node) return null;
    this.head.next = node.next;
    node.next = null;
    return node;
  }

  override deleteAtHead(): V | null {
    const node = this.deleteNodeAtHead();
    if (!node) return null;
    return node.value;
  }

  protected override deleteNodeAtTail(): SinglyLinkedNode<V> | null {
    const node = this.findNode(node => node.next === this.tail);
    if (node) {
      this.tail = node;
      node.next = null;
    }
    return node;
  }

  override deleteAtTail(): V | null {
    const node = this.deleteNodeAtTail();
    if (!node) return null;
    return node.value;
  }

  protected override findNodeFromHead(predicate: (value: SinglyLinkedNode<V>) => boolean): SinglyLinkedNode<V> | null {
    let node: SinglyLinkedNode<V> | null = this.head.next;
    while (node) {
      if (predicate(node)) break;
    }
    return node;
  }

  override findFromHead(predicate: (value: V) => boolean): V | null {
    const node = this.findNodeFromHead(node => predicate(node.value));
    if (node) return node.value;
    return null;
  }

  protected override findNode(predicate: (value: SinglyLinkedNode<V>) => boolean): SinglyLinkedNode<V> | null {
    return this.findNodeFromHead(predicate);
  }

  public override find(predicate: (value: V) => boolean): V | null {
    return this.findFromHead(predicate);
  }

  protected override cloneNode(node: SinglyLinkedNode<V>): SinglyLinkedNode<V> {
    return this.initNode(node.value);
  }

  override clone(): LinkedList<V, SinglyLinkedNode<V>> {
    const linkedList = new SinglyLinkedList<V>();

    let node = this.head.next;
    while (node) {
      linkedList.insertNodeAtTail(this.cloneNode(node));
      node = node.next;
    }
    return linkedList;
  }

  override merge(otherList: LinkedList<V, SinglyLinkedNode<V>>): LinkedList<V, SinglyLinkedNode<V>> {
    const cloneList = this.clone();
    for (const value of otherList) cloneList.insertAtTail(value);
    return cloneList;
  }

  protected override forEachNode(callback: (node: SinglyLinkedNode<V>) => void): void {
    let node = this.head.next;
    while (node) {
      callback(node);
      node = node.next;
    }
  }

  override forEach(callback: (value: V) => void): void {
    this.forEachNode(node => callback(node.value));
  }

  public override clear(): void {
    this.head.next = null;
    this.tail = this.head;
  }

  public override isEmpty(): boolean {
    return this.head.next === null;
  }

  public override length(): number {
    let length = 0;
    this.forEachNode(() => { length ++; });
    return length;
  }
}



export interface DoubleLinkedNode<V> extends LinkedNode<V> {

  previous: this | null;
  next: this | null;
}

// @ts-ignore
export class DoubleLinkedList<V> extends LinkedList<V, DoubleLinkedNode<V>> {


  // abstract findFromLast(predicate: (node: Node) => boolean): Node | null;
}


