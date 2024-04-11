import { computed, ref, isRef } from 'vue';
import type { Ref, UnwrapRef } from 'vue';

export interface StorageStackOptions<T, Other> {
  preStack: T[];
  otherStack?: Other[];
  nextStack: T[];
}

export type JudgeIsCanControlStack<T, Other> = (item: T, other?: Other) => boolean;

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
export function useStorageStack<T, Other>(options: StorageStackOptions<T, Other>) {
  const preStack = ref(options.preStack);
  const otherStack = options.otherStack ?? [];
  const nextStack = ref(options.nextStack);

  /**
   * 入栈到 nextStack 中
   * @param judgeIsCanControl
   * @returns
   */
  function pushStack(judgeIsCanControl: JudgeIsCanControlStack<typeof preStack.value[number], Other>) {
    if (!preStack.value.length) return;
    const current = preStack.value[preStack.value.length - 1];
    const other = otherStack[preStack.value.length - 1] ?? void 0;

    if (judgeIsCanControl(current, other)) {
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
  function popStack(judgeIsCanControl: JudgeIsCanControlStack<typeof nextStack.value[number], Other>) {
    if (!nextStack.value.length) return;
    const current = nextStack.value[0];
    const other = otherStack[preStack.value.length] ?? void 0;

    if (judgeIsCanControl(current, other)) {
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
