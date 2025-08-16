import { DoubleLinkedList } from './DoubleLinkedList';

describe('DoubleLinkedList', () => {
  let list: DoubleLinkedList<number>;

  beforeEach(() => {
    list = new DoubleLinkedList<number>([1, 2, 3]);
  });

  describe('constructor', () => {
    it('构造函数初始化', () => {
      expect([...list]).toEqual([1, 2, 3]);
    });
  });

  describe('迭代', () => {
    it('迭代器', () => {
      expect([...list]).toEqual([1, 2, 3]);
    });

    it('forEach', () => {
      const values: number[] = [];
      list.forEach(value => values.push(value));
      expect(values).toEqual([1, 2, 3]);
    });
  });

  describe('contains', () => {
    it('迭代器', () => {
      expect(list.contains(1)).toEqual(true);
      expect(list.contains(0)).toEqual(false);
    });
  });

  describe('insert', () => {
    it('插入单个元素-首', () => {
      list.insertAtHead(4);
      expect(list.size()).toBe(4);
      expect(list.length).toBe(4);
      expect([...list]).toEqual([4, 1, 2, 3]);
    });

    it('插入多个元素-首', () => {
      list.insertAtHead(0, 4);
      expect(list.size()).toBe(5);
      expect(list.length).toBe(5);
      expect([...list]).toEqual([4, 0, 1, 2, 3]);
    });

    it('插入单个元素-尾', () => {
      list.insertAtTail(4);
      expect(list.size()).toBe(4);
      expect(list.length).toBe(4);
      expect([...list]).toEqual([1, 2, 3, 4]);
    });

    it('插入多个元素-尾', () => {
      list.insertAtTail(0, 4);
      expect(list.size()).toBe(5);
      expect(list.length).toBe(5);
      expect([...list]).toEqual([1, 2, 3, 0, 4]);
    });

    it('插入单个元素-默认', () => {
      list.insert(4);
      expect(list.size()).toBe(4);
      expect(list.length).toBe(4);
      expect([...list]).toEqual([1, 2, 3, 4]);
    });

    it('插入多个元素-默认', () => {
      list.insert(0, 4);
      expect(list.size()).toBe(5);
      expect(list.length).toBe(5);
      expect([...list]).toEqual([1, 2, 3, 0, 4]);
    });
  });

  describe('find', () => {
    it('从头查找元素', () => {
      expect(list.findFromHead(2)).toBe(2);
      expect(list.findFromHead(4)).toBe(null);
    });

    it('从头查找条件查找元素', () => {
      expect(list.findFromHeadWhere(x => x === 2)).toBe(2);
      expect(list.findFromHeadWhere(x => x === 4)).toBe(null);
    });

    it('从尾查找元素', () => {
      expect(list.findFromTail(2)).toBe(2);
      expect(list.findFromTail(4)).toBe(null);
    });

    it('从尾查找条件查找元素', () => {
      expect(list.findFromTailWhere(x => x === 2)).toBe(2);
      expect(list.findFromTailWhere(x => x === 4)).toBe(null);
    });


    it('查找元素', () => {
      expect(list.find(2)).toBe(2);
      expect(list.find(4)).toBe(null);
    });

    it('条件查找元素', () => {
      expect(list.findWhere(x => x === 2)).toBe(2);
      expect(list.findWhere(x => x === 4)).toBe(null);
    });

    it('查找所有元素', () => {
      expect(list.findAll(2)).toEqual([2]);
      expect(list.findAll(4)).toEqual([]);
      list.insert(2);
      expect(list.findAll(2)).toEqual([2, 2]);
    });

    it('条件查找所有元素', () => {
      expect(list.findAllWhere(x => x === 2)).toEqual([2]);
      expect(list.findAllWhere(x => x === 4)).toEqual([]);
      list.insert(2);
      expect(list.findAllWhere(x => x === 2)).toEqual([2, 2]);
    });
  });

  describe('delete', () => {
    it('删除某个元素', () => {
      list.delete(2);
      expect(list.find(2)).toBeNull();
      expect(list.size()).toEqual(2);
      expect(list.length).toEqual(2);
    });

    it('删除多个元素', () => {
      list.insert(2);
      list.delete(2, true);
      expect(list.find(2)).toBeNull();
      expect(list.size()).toEqual(2);
      expect(list.length).toEqual(2);
    });

    it('条件删除某个元素', () => {
      list.deleteWhere(x => x === 2);
      expect(list.find(2)).toBeNull();
      expect(list.size()).toEqual(2);
      expect(list.length).toEqual(2);
    });

    it('条件删除多个元素', () => {
      list.insert(2);
      list.deleteWhere(x => x === 2, true);
      expect(list.find(2)).toBeNull();
      expect(list.size()).toEqual(2);
      expect(list.length).toEqual(2);
    });

    it('删除首元素', () => {
      const head = list.deleteAtHead();
      expect(head).toEqual(1);
      expect(list.size()).toEqual(2);
      expect(list.length).toEqual(2);
    });

    it('删除尾元素', () => {
      const tail = list.deleteAtTail();
      expect(tail).toEqual(3);
      expect(list.size()).toEqual(2);
      expect(list.length).toEqual(2);
    });
  });

  describe('clear', () => {
    it('清空链表', () => {
      list.clear();
      expect(list.isEmpty()).toEqual(true);
      expect(list.size()).toEqual(0);
      expect(list.length).toEqual(0);
    });
  });

  describe('isEmpty', () => {
    it('判断链表是否为空', () => {
      expect(list.isEmpty()).toBe(false);
      list.clear();
      expect(list.isEmpty()).toBe(true);
    });
  });
});
