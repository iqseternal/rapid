import { Queue } from './Queue';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  test('should be empty initially', () => {
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });

  test('should push elements to the queue', () => {
    queue.push(1, 2, 3);
    expect(queue.size()).toBe(3);
    expect(queue.front()).toBe(3);  // 队首元素应为 1
    expect(queue.back()).toBe(1);   // 队尾元素应为 3
  });

  test('should pop elements from the queue', () => {
    queue.push(1, 2, 3);
    const poppedElement = queue.pop();
    expect(poppedElement).toBe(3);
    expect(queue.size()).toBe(2);
    expect(queue.front()).toBe(2);  // 队首应变为 2
  });

  test('should return null when popping from an empty queue', () => {
    expect(queue.pop()).toBeNull();
  });

  test('should check if the queue contains an element', () => {
    queue.push(1, 2, 3);
    expect(queue.contains(2)).toBe(true);
    expect(queue.contains(4)).toBe(false);
  });

  test('should clear the queue', () => {
    queue.push(1, 2, 3);
    queue.clear();
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });
});
