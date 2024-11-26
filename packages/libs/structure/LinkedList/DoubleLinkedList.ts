import type { LinkedNode } from './LinkedList';
import { LinkedList } from './LinkedList';

/**
 * 双向链表的节点
 */
export interface DoubleLinkedNode<V> extends LinkedNode<V> {
  /**
   * 前一个节点
   */
  previous: this | null;

  /**
   * 下一个节点
   */
  next: this | null;
}


/**
 * 双向链表
 */
export class DoubleLinkedList<V> extends LinkedList<V, DoubleLinkedNode<V>> {
  protected override readonly head: DoubleLinkedNode<V>;

  /**
   * 可通过数组初始化部分链表结点
   */
  constructor(list: V[] = []) {
    super();
    const head: DoubleLinkedNode<V> = { isHead: true, value: null as V, previous: null, next: null };
    head.previous = head;
    head.next = head;
    this.head = head;
    this.insert(...list);
  }

  /**
   * 双链表迭代器
   */
  public override *[Symbol.iterator](): Iterator<V> {
    let node: DoubleLinkedNode<V> | null = this.head.next;

    while (node) {
      if (node.isHead) return;
      yield node.value;
      node = node.next;
    }
  }

  /**
   * 查找链表中是否含有某个元素
   */
  public override contains(value: V): boolean {
    for (const v of this) {
      if (this.comparator(v, value) === 0) return true;
    }
    return false;
  }

  /**
   * 通过 value 生成一个循环链表初始化节点
   */
  public override initNode(value: V): DoubleLinkedNode<V> {
    return {
      isHead: false,
      value,
      previous: null,
      next: null,
    }
  }

  /**
   * 插入一个节点到链表的头部
   */
  protected override insertNodeAtHead(...nodes: DoubleLinkedNode<V>[]): void {
    nodes.forEach(node => {
      node.next = null;
      node.previous = null;

      const firstNode = this.head.next;
      if (!firstNode) return;

      node.next = firstNode;
      node.previous = this.head;

      this.head.next = node;
      firstNode.previous = node;
    })
  }

  /**
   * 插入一个元素到链表的头部
   */
  public override insertAtHead(...values: V[]): void {
    const nodes = values.map(value => this.initNode(value));
    this.insertNodeAtHead(...nodes);
  }

  /**
   * 在尾部插入结点
   */
  protected override insertNodeAtTail(...nodes: DoubleLinkedNode<V>[]): void {
    nodes.forEach(node => {
      const lastNode = this.head.previous;
      if (!lastNode) return;

      node.previous = lastNode;
      node.next = this.head;

      lastNode.next = node;
      this.head.previous = node;
    })
  }

  /**
   * 在尾部插入元素
   */
  public override insertAtTail(...values: V[]): void {
    const nodes = values.map(value => this.initNode(value));
    this.insertNodeAtTail(...nodes);
  }

  /**
   * 插入一个结点, 默认尾插法
   */
  public override insertNode(...nodes: DoubleLinkedNode<V>[]): void {
    this.insertNodeAtTail(...nodes);
  }

  /**
   * 默认尾插法插入
   */
  public override insert(...values: V[]) {
    this.insertAtTail(...values);
  }

  /**
   * 获得头节点的值
   */
  public getHead(): V | null {
    return this.head.next?.value ?? null;
  }

  /**
   * 获得头节点
   */
  protected getHeadNode(): DoubleLinkedNode<V> | null {
    return this.head.next ?? null;
  }

  /**
   * 从头部查找结点
   */
  protected override findNodeFromHead(value: V): Readonly<DoubleLinkedNode<V>> | null {
    return this.findNodeFromHeadWhere(innerNode => this.comparator(innerNode.value, value) === 0);
  }

  /**
   * 从头部条件查找结点
   */
  protected override findNodeFromHeadWhere(condition: (node: Readonly<DoubleLinkedNode<V>>) => boolean): Readonly<DoubleLinkedNode<V>> | null {
    let node: DoubleLinkedNode<V> | null = this.head.next;
    while (node) {
      if (node.isHead) break;
      if (condition(node)) break;
      node = node.next;
    }
    if (node?.isHead) return null;
    return node;
  }

  /**
   * 从头部查找元素
   */
  public override findFromHead(value: V): V | null {
    const node = this.findNodeFromHead(value);
    if (node) return node.value;
    return null;
  }

  /**
   * 从头部条件查找元素
   */
  public override findFromHeadWhere(condition: (value: V) => boolean): V | null {
    const node = this.findNodeFromHeadWhere(innerNode => condition(innerNode.value));
    if (node) return node.value;
    return null;
  }


  /**
   * 获得尾结点的值
   */
  public getTail(): V | null {
    return this.head.previous?.value ?? null;
  }

  /**
   * 获得尾结点
   */
  protected getTailNode(): DoubleLinkedNode<V> | null {
    return this.head.previous ?? null;
  }

  /**
   * 从尾部查找结点
   */
  public findNodeFromTail(value: V): Readonly<DoubleLinkedNode<V>> | null {
    return this.findNodeFromTailWhere(innerNode => this.comparator(innerNode.value, value) === 0);
  }

  /**
   * 从尾部条件查找结点
   */
  public findNodeFromTailWhere(condition: (node: Readonly<DoubleLinkedNode<V>>) => boolean): Readonly<DoubleLinkedNode<V>> | null {
    let node: DoubleLinkedNode<V> | null = this.head.previous;
    while (node) {
      if (node.isHead) break;
      if (condition(node)) break;
      node = node.previous;
    }
    if (node?.isHead) return null;
    return node;
  }

  /**
   * 从尾部查找元素
   */
  public findFromTail(value: V): V | null {
    const node = this.findNodeFromTail(value);
    if (node) return node.value;
    return null;
  }

  /**
   * 从尾部条件查找元素
   */
  public findFromTailWhere(condition: (node: Readonly<DoubleLinkedNode<V>>) => boolean): V | null {
    const node = this.findNodeFromTailWhere(condition);
    if (node) return node.value;
    return null;
  }

  /**
   * 查找结点
   */
  protected override findNode(value: V): Readonly<DoubleLinkedNode<V>> | null {
    return this.findNodeFromTail(value);
  }

  /**
   * 条件查找结点
   */
  protected override findNodeWhere(condition: (node: Readonly<DoubleLinkedNode<V>>) => boolean): Readonly<DoubleLinkedNode<V>> | null {
    return this.findNodeFromTailWhere(condition);
  }


  /**
   * 查找所有符合比较器的结点
   * @protected
   */
  protected override findNodeAll(value: V): Readonly<DoubleLinkedNode<V>>[] {
    return this.findNodeAllWhere(innerNode => this.comparator(innerNode.value, value) === 0);
  }

  /**
   * 查找所有符合条件的结点
   */
  protected override findNodeAllWhere(condition: (node: Readonly<DoubleLinkedNode<V>>) => boolean): Readonly<DoubleLinkedNode<V>>[] {
    const results: DoubleLinkedNode<V>[] = [];
    this.forEachNode(node => {
      if (condition(node)) {
        results.push(node);
      }
    })
    return results;
  }

  /**
   * 默认倒序查找, 如果刚刚插入, 然后又去查询, 这将会变得快些
   */
  public override find(value: V): V | null {
    return this.findFromTail(value);
  }

  /**
   * 默认倒序查找, 如果刚刚插入, 然后又去查询, 这将会变得快些
   */
  public override findWhere(condition: (value: V) => boolean): V | null {
    const node = this.findNodeFromTailWhere(innerNode => condition(innerNode.value));
    if (node) return node.value;
    return null;
  }

  /**
   * 查找符合条件的所有元素集合
   */
  public override findAll(value: V): V[] {
    const nodes = this.findNodeAll(value);
    return nodes.map(node => node.value);
  }

  /**
   * 查找符合条件的所有元素集合
   */
  public override findAllWhere(condition: (value: V) => boolean): V[] {
    const nodes = this.findNodeAllWhere(innerNode => condition(innerNode.value));
    return nodes.map(node => node.value);
  }

  /**
   * 删除某个结点
   */
  public override deleteNode(node: DoubleLinkedNode<V>): DoubleLinkedNode<V> | null {
    const previousNode = node.previous;
    const nextNode = node.next;

    if (previousNode && nextNode) {
      previousNode.next = nextNode;
      nextNode.previous = previousNode;

      if (!node.isHead) {
        node.previous = null;
        node.next = null;
      }
      return node;
    }
    return null;
  }

  /**
   * 删除某个结点
   */
  public override deleteNodeWhere(condition: (node: Readonly<DoubleLinkedNode<V>>) => boolean): DoubleLinkedNode<V> | null {
    const node = this.findNodeWhere(condition) as DoubleLinkedNode<V>;
    if (node) return this.deleteNode(node);
    return null;
  }

  /**
   * 删除元素
   */
  public override delete(value: V): V | null {
    return this.deleteNodeWhere(innerNode => this.comparator(innerNode.value, value) === 0)?.value ?? null;
  }

  /**
   * 条件删除元素
   */
  public override deleteWhere(condition: (value: V) => boolean): V | null {
    return this.deleteNodeWhere(innerNode => condition(innerNode.value))?.value ?? null;
  }

  /**
   * 删除头部结点
   */
  protected override deleteNodeAtHead(): DoubleLinkedNode<V> | null {
    const headNode = this.head.next;
    if (!headNode) return null;
    return this.deleteNode(headNode);
  }

  /**
   * 删除头部元素
   */
  public override deleteAtHead(): V | null {
    const node = this.deleteNodeAtHead();
    if (!node) return null;
    return node.value;
  }

  /**
   * 删除尾部结点
   */
  protected override deleteNodeAtTail(): DoubleLinkedNode<V> | null {
    const tailNode = this.head.previous;
    if (!tailNode) return null;
    return this.deleteNode(tailNode);
  }

  /**
   * 删除尾部元素
   */
  public override deleteAtTail(): V | null {
    const node = this.deleteNodeAtTail();
    if (!node) return null;
    return node.value;
  }

  /**
   * 创建一个 node 副本, 包含 value, 但是指针 为 null
   */
  protected override cloneNode(node: DoubleLinkedNode<V>): DoubleLinkedNode<V> {
    return this.initNode(node.value);
  }

  /**
   * clone 当前链表
   */
  public override clone(): LinkedList<V, DoubleLinkedNode<V>> {
    const linkedList = new DoubleLinkedList<V>();
    this.forEach(v => linkedList.insertAtTail(v));
    return linkedList;
  }

  /**
   * 合并两个链表, 并返回一个新的链表
   */
  public override merge(otherList: LinkedList<V, DoubleLinkedNode<V>>): LinkedList<V, DoubleLinkedNode<V>> {
    const cloneList = this.clone();
    for (const value of otherList) cloneList.insertAtTail(value);
    return cloneList;
  }

  /**
   * 遍历当前双链表
   */
  public override forEachNode(callback: (node: Readonly<DoubleLinkedNode<V>>) => void): void {
    let node = this.head.next;
    while (node) {
      if (node.isHead) break;
      const nextNode = node.next;
      callback(node);
      node = nextNode;
    }
  }

  /**
   * 遍历当前双链表
   */
  public override forEach(callback: (value: V) => void): void {
    this.forEachNode(node => callback(node.value));
  }

  /**
   * 清空当前双链表
   */
  public override clear(): void {
    let node = this.head.next;

    while (node) {
      if (node.isHead) break;
      const nextNode = node.next;

      node.next = null;
      node.previous = null;

      node = nextNode;
    }

    this.head.next = this.head;
    this.head.previous = this.head;
  }

  /**
   * 返回当前双链表是否为空
   */
  public override isEmpty(): boolean {
    return this.head.next === this.head && this.head.previous === this.head;
  }

  /**
   * 返回当前双链表的长度
   */
  public override size(): number {
    let length = 0;
    this.forEachNode(() => { length++; });
    return length;
  }
}
