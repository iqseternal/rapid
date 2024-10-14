
import { Printer } from '@suey/printer';
import type { LinkedNode } from './LinkedList';
import { LinkedList } from './LinkedList';

/**
 * 双向链表的节点
 */
export interface DoubleLinkedNode<V> extends LinkedNode<V> {

  previous: this | null;
  next: this | null;
}


/**
 * 双向链表
 */
export class DoubleLinkedList<V> extends LinkedList<V, DoubleLinkedNode<V>> {
  protected override readonly head: DoubleLinkedNode<V>;

  constructor(list: V[] = []) {
    super();
    const head: DoubleLinkedNode<V> = { isHead: true, value: null as V, previous: null, next: null };
    head.previous = head;
    head.next = head;
    this.head = head;
    this.insert(...list);
  }

  override *[Symbol.iterator](): Iterator<V> {
    let node: DoubleLinkedNode<V> | null = this.head.next;

    while (node) {
      if (node.isHead) return;
      yield node.value;
      node = node.next;
    }
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
  override insertAtHead(...values: V[]): void {
    const nodes = values.map(value => this.initNode(value));
    this.insertNodeAtHead(...nodes);
  }

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

  override insertAtTail(...values: V[]): void {
    const nodes = values.map(value => this.initNode(value));
    this.insertNodeAtTail(...nodes);
  }

  public override insertNode(...nodes: DoubleLinkedNode<V>[]): void {
    this.insertNodeAtTail(...nodes);
  }

  /**
   * 默认尾插法插入
   */
  public override insert(...values: V[]) {
    this.insertAtTail(...values);
  }

  protected override findNodeFromHead(predicate: (value: DoubleLinkedNode<V>) => boolean): DoubleLinkedNode<V> | null {
    let node: DoubleLinkedNode<V> | null = this.head.next;
    while (node) {
      if (node.isHead) break;
      if (predicate(node)) break;
      node = node.next;
    }
    if (node?.isHead) return null;
    return node;
  }

  public override findFromHead(predicate: (value: V) => boolean): V | null {
    const node = this.findNodeFromHead(node => predicate(node.value));
    if (node) return node.value;
    return null;
  }

  public findNodeFromTail(predicate: (value: DoubleLinkedNode<V>) => boolean): DoubleLinkedNode<V> | null {
    let node: DoubleLinkedNode<V> | null = this.head.previous;
    while (node) {
      if (node.isHead) break;
      if (predicate(node)) break;
      node = node.previous;
    }
    if (node?.isHead) return null;
    return node;
  }

  public findFromTail(predicate: (value: V) => boolean): V | null {
    const node = this.findNodeFromTail(node => predicate(node.value));
    if (node) return node.value;
    return null;
  }

  protected override findNode(predicate: (value: DoubleLinkedNode<V>) => boolean): DoubleLinkedNode<V> | null {
    return this.findNodeFromTail(predicate);
  }

  protected override findNodeAll(predicate: (value: DoubleLinkedNode<V>) => boolean): DoubleLinkedNode<V>[] {
    const results: DoubleLinkedNode<V>[] = [];
    let node = this.head.next;
    while (node) {
      if (node.isHead) break;
      if (predicate(node)) results.push(node);
      node = node.next;
    }
    return results;
  }

  /**
   * 默认倒序查找, 如果刚刚插入, 然后又去查询, 这将会变得快些
   */
  public override find(predicate: (value: V) => boolean): V | null {
    return this.findFromTail(predicate);
  }

  /**
   * 查找符合条件的所有元素集合
   */
  public override findAll(predicate: (value: V) => boolean): V[] {
    const nodes = this.findNodeAll(node => predicate(node.value));
    return nodes.map(node => node.value);
  }

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

  public override delete(predicate: (value: V) => boolean): V[] {
    const result: DoubleLinkedNode<V>[] = [];

    let node: DoubleLinkedNode<V> | null = this.head.next;
    while (node) {
      if (node.isHead) break;

      if (predicate(node.value)) {
        const nextNode = node.next;
        const delNode = this.deleteNode(node);
        node = nextNode;
        if (delNode) result.push(delNode);
      }
      else node = node.next;
    }

    return result.map(node => node.value);
  }

  protected override deleteNodeAtHead(): DoubleLinkedNode<V> | null {
    const headNode = this.head.next;
    if (!headNode) return null;
    return this.deleteNode(headNode);
  }

  public override deleteAtHead(): V | null {
    const node = this.deleteNodeAtHead();
    if (!node) return null;
    return node.value;
  }

  protected override deleteNodeAtTail(): DoubleLinkedNode<V> | null {
    const tailNode = this.head.previous;
    if (!tailNode) return null;
    return this.deleteNode(tailNode);
  }

  public override deleteAtTail(): V | null {
    const node = this.deleteNodeAtTail();
    if (!node) return null;
    return node.value;
  }

  protected override cloneNode(node: DoubleLinkedNode<V>): DoubleLinkedNode<V> {
    return this.initNode(node.value);
  }

  public override clone(): LinkedList<V, DoubleLinkedNode<V>> {
    const linkedList = new DoubleLinkedList<V>();

    let node = this.head.next;
    while (node) {
      if (node.isHead) break;
      linkedList.insertNodeAtTail(this.cloneNode(node));
      node = node.next;
    }
    return linkedList;
  }

  public override merge(otherList: LinkedList<V, DoubleLinkedNode<V>>): LinkedList<V, DoubleLinkedNode<V>> {
    const cloneList = this.clone();
    for (const value of otherList) cloneList.insertAtTail(value);
    return cloneList;
  }

  public override forEachNode(callback: (node: DoubleLinkedNode<V>) => void): void {
    let node = this.head.next;
    while (node) {
      if (node.isHead) break;
      const nextNode = node.next;
      callback(node);
      node = nextNode;
    }
  }

  public override forEach(callback: (value: V) => void): void {
    this.forEachNode(node => callback(node.value));
  }

  public override clear(): void {
    let node = this.head.next;

    while (node) {
      if (node.isHead) return;

      const nextNode = node.next;
      node.next = null;
      node.previous = null;

      node = nextNode;
    }

    this.head.next = this.head;
    this.head.previous = this.head;
  }

  public override isEmpty(): boolean {
    return this.head.next === this.head;
  }

  public override length(): number {
    let length = 0;
    this.forEachNode(() => { length ++; });
    return length;
  }
}
