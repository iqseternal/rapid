import { DoubleLinkedList } from './DoubleLinkedList';

describe('DoubleLinkedList', () => {
  let list: DoubleLinkedList<number>;

  beforeEach(() => {
    list = new DoubleLinkedList<number>([1, 2, 3]);
  });

  describe('constructor', () => {
    it('should initialize the list with given elements', () => {
      const values: number[] = [];
      list.forEach(value => values.push(value));
      expect(values).toEqual([1, 2, 3]);
    });
  });

  describe('insert', () => {
    it('should insert elements at list', () => {
      list.insertAtHead(0);
      expect(list.length()).toBe(4);
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
});
