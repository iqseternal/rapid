import { Comparator } from '../declare';
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

  constructor(list: V[] = []) {
    super();
    this.insert(...list);
  }

  public override *[Symbol.iterator](): Iterator<V> {
    let node: SinglyLinkedNode<V> | null = this.head.next;

    while (node) {
      if (node.isHead) return;
      yield node.value;
      node = node.next;
    }
  }

  public override contains(value: V): boolean {
    for (const v of this) {
      if (this.comparator(v, value) === 0) return true;
    }
  }

  protected override initNode(value: V): SinglyLinkedNode<V> {
    return {
      isHead: false,
      value,
      next: null,
    }
  }

  public override insertAtHead(...values: V[]): void {
    const nodes = values.map(value => this.initNode(value));
    this.insertNodeAtHead(...nodes);
  }

  protected override insertNodeAtHead(...nodes: SinglyLinkedNode<V>[]): void {
    nodes.forEach(node => {
      node.next = this.head.next;
      this.head.next = node;
    })
  }

  public override insertAtTail(...values: V[]): void {
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
    let prevNode: SinglyLinkedNode<V> | null = this.head;
    while (prevNode) {
      if (prevNode.next) {
        if (prevNode.next === node) {
          prevNode.next = prevNode.next.next;
          break;
        }
      }

      prevNode = prevNode.next;
    }

    return node;
  }

  public override delete(value: V): V[] {
    const result: SinglyLinkedNode<V>[] = [];

    let node: SinglyLinkedNode<V> | null = this.head;
    while (node.next) {
      if (this.comparator(value, node.next.value) === 0) {
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

  public override deleteAtHead(): V | null {
    const node = this.deleteNodeAtHead();
    if (!node) return null;
    return node.value;
  }

  protected override deleteNodeAtTail(): SinglyLinkedNode<V> | null {
    let node: SinglyLinkedNode<V> | null = this.head;
    while (node) {
      const nextNode = node;
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

  public override deleteAtTail(): V | null {
    const node = this.deleteNodeAtTail();
    if (!node) return null;
    return node.value;
  }

  protected override findNodeFromHead(value: V): SinglyLinkedNode<V> | null {
    let node: SinglyLinkedNode<V> | null = this.head.next;
    while (node) {
      if (this.comparator(node.value, value) === 0) break;
      node = node.next;
    }
    return node;
  }

  public override findFromHead(value: V): V | null {
    const node = this.findNodeFromHead(value);
    if (node) return node.value;
    return null;
  }

  protected override findNode(value: V): SinglyLinkedNode<V> | null {
    return this.findNodeFromHead(value);
  }

  protected override findNodeAll(value: V): SinglyLinkedNode<V>[] {
    const results: SinglyLinkedNode<V>[] = [];

    let node = this.head.next;
    while (node) {
      if (node.isHead) break;
      if (this.comparator(node.value, value) === 0) {
        results.push(node);
      }
      node = node.next;
    }

    return results;
  }

  public override find(value: V): V | null {
    const node = this.findNode(value);
    if (node) return node.value;
    return null;
  }

  public override findAll(value: V): V[] {
    const nodes = this.findNodeAll(value);
    return nodes.map(node => node.value);
  }

  protected override cloneNode(node: SinglyLinkedNode<V>): SinglyLinkedNode<V> {
    return this.initNode(node.value);
  }

  public override clone(): LinkedList<V, SinglyLinkedNode<V>> {
    const linkedList = new SinglyLinkedList<V>();

    let node = this.head.next;
    while (node) {
      linkedList.insertNodeAtTail(this.cloneNode(node));
      node = node.next;
    }
    return linkedList;
  }

  public override merge(otherList: LinkedList<V, SinglyLinkedNode<V>>): LinkedList<V, SinglyLinkedNode<V>> {
    const cloneList = this.clone();
    for (const value of otherList) cloneList.insertAtTail(value);
    return cloneList;
  }

  protected override forEachNode(callback: (node: SinglyLinkedNode<V>) => void): void {
    let node = this.head.next;
    while (node) {
      if (node.isHead) return;
      callback(node);
      node = node.next;
    }
  }

  public override forEach(callback: (value: V) => void): void {
    this.forEachNode(node => callback(node.value));
  }

  public override clear(): void {
    let node = this.head.next;
    while (node) {
      const nextNode = node.next;
      node.next = null;
      node = nextNode;
    }

    this.head.next = null;
    this.tail = this.head;
  }

  public override isEmpty(): boolean {
    return this.head.next === null;
  }

  public override size(): number {
    let length = 0;
    this.forEachNode(() => { length ++; });
    return length;
  }
}
