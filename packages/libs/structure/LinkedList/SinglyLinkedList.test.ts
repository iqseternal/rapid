import { SinglyLinkedList } from './SinglyLinkedList';

describe('SinglyLinkedList', () => {
  let list: SinglyLinkedList<number>;
  const data = [1, 2, 3];

  beforeEach(() => {
    list = new SinglyLinkedList<number>([...data]);
  });

  describe('构造函数', () => {
    it('应该按照给定元素初始化', () => {
      expect([...list]).toEqual([1, 2, 3]);
    });
  });

  describe('迭代测试', () => {
    it('手动迭代', () => {
      // 手动迭代
      const iterator = list[Symbol.iterator]();
      expect(iterator.next().value).toEqual(1);
      expect(iterator.next().value).toEqual(2);
      expect(iterator.next().value).toEqual(3);
      expect(iterator.next().done).toBe(true);
    });

    it('迭代器', () => {
      expect([...list]).toEqual([1, 2, 3]);
    })

    it('forEach', () => {
      const values: number[] = [];
      list.forEach(value => values.push(value));
      expect(values).toEqual([1, 2, 3]);
    })
  });

  describe('contains', () => {
    it('已有元素', () => {
      expect(list.contains(1)).toEqual(true);
      expect(list.contains(2)).toEqual(true);
      expect(list.contains(3)).toEqual(true);
    })

    it('未有元素', () => {
      expect(list.contains(4)).toEqual(false);
      expect(list.contains(5)).toEqual(false);
      expect(list.contains(6)).toEqual(false);
    })
  })

  describe('insertAtHead', () => {
    it('单个元素', () => {
      list.insertAtHead(0);
      expect([...list]).toEqual([0, 1, 2, 3]);
    });

    it('多个元素', () =>{
      list.insertAtHead(0, 4);
      expect([...list]).toEqual([4, 0, 1, 2, 3]);
    })
  });

  describe('insertAtTail', () => {
    it('单个元素', () => {
      list.insertAtTail(4);
      expect([...list]).toEqual([1, 2, 3, 4]);
    });

    it('多个元素', () =>{
      list.insertAtTail(4, 5);
      expect([...list]).toEqual([1, 2, 3, 4, 5]);
    })
  });

  describe('delete', () => {
    it('删除指定元素', () => {
      const v = list.delete(2);
      expect(v).toEqual(2);
      expect([...list]).toEqual([1, 3]);
    });

    it('条件删除元素', () => {
      const vs = list.deleteWhere(v => v >= 2, true);

      expect(vs).toEqual([2, 3]);
      expect([...list]).toEqual([1]);
    })
  });

  describe('find', () => {
    it('查找某个元素', () => {
      expect(list.find(2)).toEqual(2);
      expect(list.find(4)).toBeNull();

      expect(list.findFromHead(2)).toEqual(2);
      expect(list.findFromHead(4)).toBeNull();
    });

    it('条件查找某个元素', () => {
      expect(list.findWhere(v => v === 2)).toEqual(2);
      expect(list.findWhere(v => v === 4)).toBeNull();

      expect(list.findFromHeadWhere(v => v === 2)).toEqual(2);
      expect(list.findFromHeadWhere(v => v === 4)).toBeNull();
    });

    it('查找符合要求的所有元素集合', () => {
      expect(list.findAll(2)).toEqual([2]);
    });

    it('条件查找符合要求的所有元素集合', () => {
      expect(list.findAllWhere(v => v >= 2)).toEqual([2, 3]);
    });
  });

  describe('clear', () => {
    it('清空链表所有元素', () => {
      list.clear();
      expect(list.isEmpty()).toBe(true);
      expect(list.size()).toBe(0);
      expect(list.length).toBe(0);
      expect([...list].length).toBe(0);
    });
  });

  describe('isEmpty', () => {
    it('空链表', () => {
      list.clear();
      expect(list.isEmpty()).toBe(true);
    });

    it('非空', () => {
      expect(list.isEmpty()).toBe(false);
    });
  });

  describe('length', () => {
    it('是否返回正确的长度', () => {
      expect(list.size()).toBe(3);
      expect(list.length).toBe(3);

      list.insert(1);

      expect(list.size()).toBe(4);
      expect(list.length).toBe(4);

      list.insert(1, 2);

      expect(list.size()).toBe(6);
      expect(list.length).toBe(6);

      list.delete(1, true);

      expect(list.size()).toBe(3);
      expect(list.length).toBe(3);

      list.deleteWhere(v => v < 100, true);

      expect(list.size()).toBe(0);
      expect(list.length).toBe(0);
    });
  });

  describe('clone', () => {
    it('克隆链表', () => {
      const clonedList = list.clone();

      expect(clonedList === list).toBe(false);
      expect(clonedList.size()).toBe(list.size());
      expect([...clonedList]).toEqual([...list]);
    });
  });

  describe('merge', () => {
    it('合并链表', () => {
      const otherList = new SinglyLinkedList<number>([4, 5]);
      const mergedList = list.merge(otherList);

      expect(mergedList === otherList).toBe(false);
      expect(mergedList === list).toBe(false);
      expect([...mergedList]).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
