import { ref } from 'vue';
import type { Ref } from 'vue';

export interface StorageStackOptions<T> {
  preStack: T[] | Ref<T[]>;
  nextStack: T[] | Ref<T[]>;
}

export type JudgeIsCanControlStack<T> = (item: T) => boolean;

/**
 * 维护两个数组栈
 * 在页面左上角有所体现功能
 *
 * [1, 2, 3] [4, 5, 6]
 *
 * 无论是从左到右入栈还是从右往左, 元素的顺序不会发生变化
 *
 * 例如可能发生的变化
 * [1, 2] [3, 4, 5, 6]
 * [1, 2, 3, 4, 5] [6]
 * [] [1, 2, 3, 4, 5, 6]
 *
 * @param options
 * @returns
 */
export function useStorageStack<T>(options: StorageStackOptions<T>) {
  const preStack = ref(options.preStack) as Ref<T[]>;
  const nextStack = ref(options.nextStack) as Ref<T[]>;

  /**
   * 入栈到 nextStack 中
   * @param judgeIsCanControl
   * @returns
   */
  function pushStack(judgeIsCanControl: JudgeIsCanControlStack<T>) {
    if (!preStack.value.length) return;
    const current = preStack.value[preStack.value.length - 1];

    if (judgeIsCanControl(current)) {
      preStack.value.pop();
      nextStack.value.unshift(current);
      pushStack(judgeIsCanControl);
    }
  }

  /**
   * 从 nextStack 中出栈
   * @param judgeIsCanControl
   * @returns
   */
  function popStack(judgeIsCanControl: JudgeIsCanControlStack<T>) {
    if (!nextStack.value.length) return;
    const current = nextStack.value[0];

    if (judgeIsCanControl(current)) {
      nextStack.value.shift();
      preStack.value.push(current);
      popStack(judgeIsCanControl);
    }
  }

  return {
    preStack, nextStack,
    pushStack, popStack
  }
}
