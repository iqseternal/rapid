import type { LinkedNode } from './LinkedList';
import { LinkedList } from './LinkedList';

/**
 * 单向链表的节点
 */
export interface SinglyLinkedNode<V> extends LinkedNode<V> {
  /**
   * 下一个节点的指针
   */
  next: this | null;
}

/**
 * 单向链表
 */
export class SinglyLinkedList<V> extends LinkedList<V, SinglyLinkedNode<V>> {
  protected override readonly head: SinglyLinkedNode<V> = { isHead: true, value: null as unknown as V, next: null };

  /**
   * 单向链表的最后一个节点
   */
  protected tail: SinglyLinkedNode<V> = this.head;
  protected __length = 0;

  /**
   * 使用数组初始化链表
   */
  public constructor(list: V[] = []) {
    super();
    this.insert(...list);
  }

  /**
   * 迭代器
   */
  public override *[Symbol.iterator](): Iterator<V> {
    let node: SinglyLinkedNode<V> | null = this.head.next;

    while (node) {
      if (node.isHead) return;
      yield node.value;
      node = node.next;
    }
  }

  /**
   * 查找链表中是否包含元素
   */
  public contains(value: V): boolean {
    for (const v of this) {
      if (this.comparator(v, value) === 0) return true;
    }
    return false;
  }

  /**
   * 初始化结点
   */
  protected override initNode(value: V): SinglyLinkedNode<V> {
    return {
      isHead: false,
      value,
      next: null,
    }
  }

  /**
   * 头插法, 插入元素 (多个元素按照顺序依次执行头插法)
   */
  public override insertAtHead(...values: V[]): void {
    const nodes = values.map(value => this.initNode(value));
    this.insertNodeAtHead(...nodes);
  }

  /**
   * 头插法, 插入结点
   */
  protected override insertNodeAtHead(...nodes: SinglyLinkedNode<V>[]): void {
    nodes.forEach(node => {
      node.next = this.head.next;
      this.head.next = node;
      this.__length ++;
    })
  }

  /**
   * 尾插法, 插入元素, (多个元素按照顺序依次执行尾插法)
   */
  public override insertAtTail(...values: V[]): void {
    const nodes = values.map(value => this.initNode(value));
    this.insertNodeAtTail(...nodes);
  }

  /**
   * 尾插法, 插入结点
   */
  protected override insertNodeAtTail(...nodes: SinglyLinkedNode<V>[]): void {
    nodes.forEach(node => {
      this.tail.next = node;
      this.tail = node;
      this.__length ++;
    })
  }

  /**
   * 插入结点
   */
  protected override insertNode(...nodes: SinglyLinkedNode<V>[]): void {
    this.insertNodeAtTail(...nodes);
  }

  /**
   * 插入元素
   */
  public override insert(...values: V[]) {
    this.insertAtTail(...values);
  }

  /**
   * 移除某个结点
   */
  protected override deleteNode(node: SinglyLinkedNode<V>): SinglyLinkedNode<V> | null {
    return this.deleteNodeWhere(innerNode => innerNode === node);
  }

  /**
   * 条件移除某个结点
   */
  protected override deleteNodeWhere(condition: (node: Readonly<SinglyLinkedNode<V>>) => boolean, multiple?: false): SinglyLinkedNode<V> | null;
  protected override deleteNodeWhere(condition: (node: Readonly<SinglyLinkedNode<V>>) => boolean, multiple: true): SinglyLinkedNode<V>[];
  protected override deleteNodeWhere(condition: (node: Readonly<SinglyLinkedNode<V>>) => boolean, multiple?: boolean): SinglyLinkedNode<V> | null | SinglyLinkedNode<V>[];
  protected override deleteNodeWhere(condition: (node: Readonly<SinglyLinkedNode<V>>) => boolean, multiple: boolean = false): SinglyLinkedNode<V> | null | SinglyLinkedNode<V>[] {
    let prevNode: SinglyLinkedNode<V> | null = this.head;
    const list: SinglyLinkedNode<V>[] = [];

    while (prevNode) {
      if (!prevNode.next) break;

      if (condition(prevNode.next)) {
        const node = prevNode.next;
        prevNode.next = node.next;
        node.next = null;
        this.__length --;

        list.push(node);

        if (!multiple) break;

        continue;
      }

      prevNode = prevNode.next;
    }

    if (multiple) return list;

    return list[0] ?? null;
  }

  /**
   * 移除元素
   */
  public override delete(value: V, multiple?: false): V | null;
  public override delete(value: V, multiple: true): V[];
  public override delete(value: V, multiple?: boolean): V | V[] | null;
  public override delete(value: V, multiple: boolean = false): V | V[] | null {
    return this.deleteWhere(innerNode => this.comparator(innerNode, value) === 0, multiple);
  }

  /**
   * 条件移除元素
   */
  public override deleteWhere(condition: (value: V) => boolean, multiple?: false): V | null;
  public override deleteWhere(condition: (value: V) => boolean, multiple: true): V[];
  public override deleteWhere(condition: (value: V) => boolean, multiple?: boolean): V | V[] | null;
  public override deleteWhere(condition: (value: V) => boolean, multiple: boolean = false): V | V[] | null {
    const result = this.deleteNodeWhere(innerNode => condition(innerNode.value), multiple);
    if (!multiple) return (result as SinglyLinkedNode<V>)?.value ?? null;
    else {
      return (result as SinglyLinkedNode<V>[]).map(t => t.value);
    }
  }

  /**
   * 删除第一个节点
   */
  protected override deleteNodeAtHead(): SinglyLinkedNode<V> | null {
    const node = this.head.next;
    if (!node) return null;
    this.head.next = node.next;
    node.next = null;
    return node;
  }


  /**
   * 删除第一个元素
   */
  public override deleteAtHead(): V | null {
    const node = this.deleteNodeAtHead();
    if (!node) return null;
    return node.value;
  }

  /**
   * 删除尾结点
   */
  protected override deleteNodeAtTail(): SinglyLinkedNode<V> | null {
    let node: SinglyLinkedNode<V> | null = this.head;
    while (node) {
      const nextNode = node.next;
      if (nextNode) {
        if (nextNode === this.tail) {
          break;
        }
      }
      node = nextNode;
    }

    if (node) {
      const tailNode = node.next;
      this.tail = node;
      node.next = null;
      return tailNode;
    }
    return null;
  }

  /**
   * 删除尾元素
   */
  public override deleteAtTail(): V | null {
    const node = this.deleteNodeAtTail();
    if (!node) return null;
    return node.value;
  }

  /**
   * 查找一个结点
   */
  protected override findNodeFromHead(value: V): Readonly<SinglyLinkedNode<V>> | null {
    return this.findNodeFromHeadWhere(innerNode => this.comparator(innerNode.value, value) === 0);
  }

  /**
   * 条件查找
   */
  protected override findNodeFromHeadWhere(condition: (node: Readonly<SinglyLinkedNode<V>>) => boolean): Readonly<SinglyLinkedNode<V>> | null {
    let node: SinglyLinkedNode<V> | null = this.head.next;
    while (node) {
      if (condition(node)) break;
      node = node.next;
    }
    return node;
  }

  /**
   * 查找某个元素
   */
  public override findFromHead(value: V): V | null {
    const node = this.findNodeFromHead(value);
    if (node) return node.value;
    return null;
  }

  /**
   * 条件查找某个元素
   */
  public override findFromHeadWhere(condition: (node: V) => boolean): V | null {
    const node = this.findNodeFromHeadWhere(node => condition(node.value));
    if (node) return node.value;
    return null;
  }

  /**
   * 查找某个结点
   */
  protected override findNode(value: V): Readonly<SinglyLinkedNode<V>> | null {
    return this.findNodeFromHead(value);
  }

  /**
   * 条件查找某个元素
   */
  protected override findNodeWhere(condition: (node:Readonly<SinglyLinkedNode<V>>) => boolean): Readonly<SinglyLinkedNode<V>> | null {
    return this.findNodeFromHeadWhere(condition);
  }

  /**
   * 查找所有结点
   */
  protected override findNodeAll(value: V): Readonly<SinglyLinkedNode<V>>[] {
    return this.findNodeAllWhere(innerNode => this.comparator(innerNode.value, value) === 0);
  }

  /**
   * 条件查找所有结点
   */
  protected override findNodeAllWhere(condition: (node: Readonly<SinglyLinkedNode<V>>) => boolean): Readonly<SinglyLinkedNode<V>>[] {
    const results: SinglyLinkedNode<V>[] = [];

    let node = this.head.next;
    while (node) {
      if (node.isHead) break;
      if (condition(node)) {
        results.push(node);
      }
      node = node.next;
    }

    return results;
  }

  /**
   * 查找某个元素
   */
  public override find(value: V): V | null {
    const node = this.findNode(value);
    if (node) return node.value;
    return null;
  }

  /**
   * 条件查找某个元素
   */
  public override findWhere(condition: (value: V) => boolean): V | null {
    const node = this.findNodeWhere(innerNode => condition(innerNode.value));
    if (node) return node.value;
    return null;
  }

  /**
   * 查找所有元素集合
   */
  public override findAll(value: V): V[] {
    const nodes = this.findNodeAll(value);
    return nodes.map(node => node.value);
  }

  /**
   * 查找所有元素集合
   */
  public override findAllWhere(condition: (value: V) => boolean): V[] {
    const nodes = this.findNodeAllWhere(innerNode => condition(innerNode.value));
    return nodes.map(node => node.value);
  }

  /**
   * clone 某个结点
   */
  protected override cloneNode(node: SinglyLinkedNode<V>): SinglyLinkedNode<V> {
    return this.initNode(node.value);
  }

  /**
   * clone 当前链表
   */
  public override clone(): LinkedList<V, SinglyLinkedNode<V>> {
    const linkedList = new SinglyLinkedList<V>();

    let node = this.head.next;
    while (node) {
      linkedList.insertNodeAtTail(this.cloneNode(node));
      node = node.next;
    }
    return linkedList;
  }

  /**
   * 合并链表并返回一个新的链表集合
   */
  public override merge(otherList: LinkedList<V, SinglyLinkedNode<V>>): LinkedList<V, SinglyLinkedNode<V>> {
    const cloneList = this.clone();
    for (const value of otherList) cloneList.insertAtTail(value);
    return cloneList;
  }

  /**
   * forEach 结点
   */
  protected override forEachNode(callback: (node: Readonly<SinglyLinkedNode<V>>) => void): void {
    let node = this.head.next;
    while (node) {
      if (node.isHead) return;
      callback(node);
      node = node.next;
    }
  }

  /**
   * forEach 元素
   */
  public override forEach(callback: (value: V) => void): void {
    this.forEachNode(node => callback(node.value));
  }

  /**
   * 清空链表
   */
  public override clear(): void {
    let node = this.head.next;
    while (node) {
      const nextNode = node.next;
      node.next = null;
      node = nextNode;
      this.__length --;
    }

    this.head.next = null;
    this.tail = this.head;
  }

  /**
   * 返回当前链表是否为空
   */
  public override isEmpty(): boolean {
    return this.head.next === null;
  }

  /**
   * 返回当前链表的大小
   */
  public override size(): number {
    return this.length;
  }

  /**
   * 返回当前链表的大小
   */
  public override get length() {
    return this.__length;
  }
}
