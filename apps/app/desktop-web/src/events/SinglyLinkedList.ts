
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
    const prevNode = this.findNodeFromHead(node => node.next === node);
    if (prevNode) {
      prevNode.next = node.next;
      node.next = null;
    }
    return node;
  }

  public override delete(predicate: (value: V) => boolean): V[] {
    const result: SinglyLinkedNode<V>[] = [];

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

  public override deleteAtHead(): V | null {
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

  public override deleteAtTail(): V | null {
    const node = this.deleteNodeAtTail();
    if (!node) return null;
    return node.value;
  }

  protected override findNodeFromHead(predicate: (value: SinglyLinkedNode<V>) => boolean): SinglyLinkedNode<V> | null {
    let node: SinglyLinkedNode<V> | null = this.head.next;
    while (node) {
      if (predicate(node)) break;
      node = node.next;
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

  protected override findNodeAll(predicate: (value: SinglyLinkedNode<V>) => boolean): SinglyLinkedNode<V>[] {
    const results: SinglyLinkedNode<V>[] = [];

    let node = this.head.next;
    while (node) {
      if (node.isHead) break;

      if (predicate(node)) {
        results.push(node);
      }

      node = node.next;
    }

    return results;
  }

  public override find(predicate: (value: V) => boolean): V | null {
    const node = this.findNode(node => predicate(node.value));
    if (node) return node.value;
    return null;
  }

  public override findAll(predicate: (value: V) => boolean): V[] {
    const nodes = this.findNodeAll(node => predicate(node.value));
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

  public override length(): number {
    let length = 0;
    this.forEachNode(() => { length ++; });
    return length;
  }
}
