import { Dequeue } from './Dequeue';
import { Comparator } from '../declare';

describe('Dequeue', () => {
  let dequeue: Dequeue<number>;

  beforeEach(() => {
    dequeue = new Dequeue<number>();
  });

  test('should be empty initially', () => {
    expect(dequeue.isEmpty()).toBe(true);
    expect(dequeue.size()).toBe(0);
  });

  test('should push elements to the front of the dequeue', () => {
    dequeue.pushFront(1, 2, 3);
    expect(dequeue.size()).toBe(3);
    expect(dequeue.front()).toBe(1);  // 队首元素应为 3
    expect(dequeue.back()).toBe(3);   // 队尾元素应为 1
  });

  test('should push elements to the back of the dequeue', () => {
    dequeue.pushBack(1, 2, 3);
    expect(dequeue.size()).toBe(3);
    expect(dequeue.front()).toBe(1);  // 队首元素应为 1
    expect(dequeue.back()).toBe(3);   // 队尾元素应为 3
  });

  test('should pop elements from the front of the dequeue', () => {
    dequeue.pushFront(1, 2, 3);
    const poppedElement = dequeue.popFront();
    expect(poppedElement).toBe(1);  // 队首元素 3 被弹出
    expect(dequeue.size()).toBe(2);
    expect(dequeue.front()).toBe(2);  // 队首应变为 2
  });

  test('should pop elements from the back of the dequeue', () => {
    dequeue.pushBack(1, 2, 3);
    const poppedElement = dequeue.popBack();
    expect(poppedElement).toBe(3);  // 队尾元素 3 被弹出
    expect(dequeue.size()).toBe(2);
    expect(dequeue.back()).toBe(2);   // 队尾应变为 2
  });

  test('should return null when popping from an empty dequeue', () => {
    expect(dequeue.popFront()).toBeNull();
    expect(dequeue.popBack()).toBeNull();
  });

  test('should check if the dequeue contains an element', () => {
    dequeue.pushFront(1, 2, 3);
    expect(dequeue.contains(2)).toBe(true);
    expect(dequeue.contains(4)).toBe(false);
  });

  test('should clear the dequeue', () => {
    dequeue.pushFront(1, 2, 3);
    dequeue.clear();
    expect(dequeue.isEmpty()).toBe(true);
    expect(dequeue.size()).toBe(0);
  });

  test('should handle custom comparators for Dequeue', () => {
    const customComparator: Comparator<number> = (v1, v2) => v1 - v2;
    dequeue.setComparator(customComparator);
    dequeue.pushFront(3, 1, 2);

    const iteratedValues: number[] = [];
    for (const value of dequeue) {
      iteratedValues.push(value);
    }
    expect(iteratedValues).toEqual([3, 1, 2]);
  });
});