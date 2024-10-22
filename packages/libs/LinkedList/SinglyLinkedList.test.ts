import { SinglyLinkedList } from './SinglyLinkedList';

describe('SinglyLinkedList Iterator', () => {
  let linkedList: SinglyLinkedList<number>;

  beforeEach(() => {
    linkedList = new SinglyLinkedList<number>();
  });

  it('should iterate over all values', () => {
    linkedList.insert(1);
    linkedList.insert(2);
    linkedList.insert(3);

    const iterator = linkedList[Symbol.iterator]();

    expect(iterator.next().value).toEqual(1);
    expect(iterator.next().value).toEqual(2);
    expect(iterator.next().value).toEqual(3);
    expect(iterator.next().done).toBe(true);
  });
});

describe('SinglyLinkedList', () => {
  let list: SinglyLinkedList<number>;

  beforeEach(() => {
    list = new SinglyLinkedList<number>([1, 2, 3]);
  });

  describe('constructor', () => {
    it('should initialize the list with given elements', () => {
      const values: number[] = [];
      list.forEach(value => values.push(value));
      expect(values).toEqual([1, 2, 3]);
    });
  });

  describe('insertAtHead', () => {
    it('should insert elements at the head of the list', () => {
      list.insertAtHead(0);
      const values: number[] = [];
      list.forEach(value => values.push(value));
      expect(values).toEqual([0, 1, 2, 3]);
    });
  });

  describe('insertAtTail', () => {
    it('should insert elements at the tail of the list', () => {
      list.insertAtTail(4);
      const values: number[] = [];
      list.forEach(value => values.push(value));
      expect(values).toEqual([1, 2, 3, 4]);
    });
  });

  describe('delete', () => {
    it('should delete elements by predicate', () => {
      list.delete(value => value === 2);
      expect(list.find(value => value === 2)).toBeNull();
      expect(list.length()).toBe(2);
    });
  });

  describe('find', () => {
    it('should find elements by predicate', () => {
      expect(list.find(value => value === 2)).toBe(2);
    });
  });

  describe('forEach', () => {
    it('should iterate over each element', () => {
      const values: number[] = [];
      list.forEach(value => values.push(value));
      expect(values).toEqual([1, 2, 3]);
    });
  });

  describe('clear', () => {
    it('should clear all elements from the list', () => {
      list.clear();
      expect(list.isEmpty()).toBe(true);
      expect(list.length()).toBe(0);
    });
  });

  describe('isEmpty', () => {
    it('should return true if the list is empty', () => {
      list.clear();
      expect(list.isEmpty()).toBe(true);
    });

    it('should return false if the list is not empty', () => {
      expect(list.isEmpty()).toBe(false);
    });
  });

  describe('length', () => {
    it('should return the number of elements in the list', () => {
      expect(list.length()).toBe(3);
    });
  });

  describe('deleteAtHead', () => {
    it('should delete the element at the head of the list', () => {
      expect(list.deleteAtHead()).toBe(1);
      expect(list.length()).toBe(2);
    });
  });

  describe('deleteAtTail', () => {
    it('should delete the element at the tail of the list', () => {
      expect(list.deleteAtTail()).toBe(3);
      expect(list.length()).toBe(2);
    });
  });

  describe('clone', () => {
    it('should clone the list', () => {
      const clonedList = list.clone();
      expect(clonedList.length()).toBe(list.length());
    });
  });

  describe('merge', () => {
    it('should merge two lists', () => {
      const otherList = new SinglyLinkedList<number>([4, 5]);
      const mergedList = list.merge(otherList);
      const values: number[] = [];
      mergedList.forEach(value => values.push(value));
      expect(values).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
