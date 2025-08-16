
import { Stack } from './index';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  test('should be empty initially', () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
  });

  test('should push elements correctly', () => {
    stack.push(1, 2, 3);
    expect(stack.size()).toBe(3);
    expect(stack.top()).toBe(3);
  });

  test('should pop elements correctly', () => {
    stack.push(1, 2, 3);
    const poppedElement = stack.pop();
    expect(poppedElement).toBe(3);
    expect(stack.size()).toBe(2);
    expect(stack.top()).toBe(2);
  });

  test('should return null when popping from an empty stack', () => {
    expect(stack.pop()).toBeNull();
  });

  test('should check if contains an element', () => {
    stack.push(1, 2, 3);
    expect(stack.contains(2)).toBe(true);
    expect(stack.contains(4)).toBe(false);
  });

  test('should clear the stack', () => {
    stack.push(1, 2, 3);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
  });

  test('should iterate over the stack in LIFO order', () => {
    stack.push(1, 2, 3);
    const iteratedValues: number[] = [];
    for (const value of stack) {
      iteratedValues.push(value);
    }
    expect(iteratedValues).toEqual([3, 2, 1]);
  });

  test('should handle equality for objects with custom comparator', () => {
    const stack = new Stack();

    const customComparator = (v1: any, v2: any) => {
      if (v1.id === v2.id) return 0;
      return v1.id > v2.id ? 1 : -1;
    };
    stack.setComparator(customComparator);

    const obj2 = { id: 2 };
    const obj3 = { id: 3 };

    const obj1 = { id: 1 };
    stack.push(obj1, obj2, obj3);

    expect(stack.contains({ id: 2 })).toBe(true);
    expect(stack.pop()).toEqual(obj3);
    expect(stack.pop()).toEqual(obj2);
    expect(stack.pop()).toEqual(obj1);
  });

  test('should handle comparison when objects are not equal using custom comparator', () => {
    const stack = new Stack();

    const customComparator = (v1: any, v2: any) => {
      return v1.value === v2.value ? 0 : (v1.value > v2.value ? 1 : -1);
    };
    stack.setComparator(customComparator);

    const obj1 = { value: 10 };
    const obj2 = { value: 20 };
    stack.push(obj1, obj2);

    expect(stack.top()).toBe(obj2);
    stack.pop();
    expect(stack.top()).toBe(obj1);
  });
});
