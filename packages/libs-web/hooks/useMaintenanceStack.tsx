
import { useShallowReactive } from './useReactive';
import { useCallback, useEffect, useState } from 'react';

/**
 * 维护站的 options
 *
 * T: 维护的元素类型
 * Other: 辅助判断元素是否可以被操作的数组类型
 *
 */
export interface MaintenanceStackOptions<T, Other> {
  /**
   * 当前的主栈
   */
  maintenanceStack: T[];

  /**
   * 被存储的栈, 该栈是从 maintenanceStack 中剔除过来的
   */
  storageStack?: T[];

  /**
   * 辅助栈, 用户辅助是否可以操作
   */
  otherStack?: Other[];
}

/**
 * 条件判断函数, 判断当前状况是否可以控制当前元素的压栈或者出栈
 */
export type JudgeIsCanBeControlStack<T, Other> = (item: T, other: Other | undefined, index: number) => boolean;


/**
 * 维护栈
 * 栈1：[1, 2, 3, 4, 5, 6]
 * 栈2：[]
 *
 * 根据条件, 可以 push 主栈1, 或者弹出 主栈进入栈2
 *
 * 会出现：
 * 栈1：[1, 2, 3]
 * 栈2：[4, 5, 6]
 *
 * 运行中, 顺序一定是固定的
 *
 *
 * @returns
 */
export function useMaintenanceStack<T, Other>(options: MaintenanceStackOptions<T, Other>) {
  const [maintenanceStack] = useShallowReactive(options.maintenanceStack);
  const [storageStack] = useShallowReactive(options.storageStack ?? []);

  const [otherStack] = useState(options.otherStack ?? []);

  /**
   * 入栈到 maintenanceStack 中, 需要从存储的栈中取出, 并且要从 0 下标开始取
   * @returns
   */
  const pushMaintenanceStack = useCallback(function innerPushStack(judgeIsCanBeControl: JudgeIsCanBeControlStack<T, Other>) {
    if (!storageStack.length) return;

    // 存储栈中的元素: 当前控制元素
    const current = storageStack[0];
    // 辅助栈中的额外数据
    const other = otherStack[maintenanceStack.length] ?? void 0;
    // 判断当前元素是否可以被控制
    if (judgeIsCanBeControl(current, other, maintenanceStack.length)) {
      storageStack.shift();
      maintenanceStack.push(current);

      // 如果成功了, 那么继续下一个
      innerPushStack(judgeIsCanBeControl);
    }
  }, []);

  /**
   * 从 maintenanceStack 中出栈
   * @returns
   */
  const popMaintenanceStack = useCallback(function innerPopStack(judgeIsCanBeControl: JudgeIsCanBeControlStack<T, Other>) {
    if (!maintenanceStack.length) return;

    const current = maintenanceStack[maintenanceStack.length - 1];
    const other = otherStack[maintenanceStack.length - 1] ?? void 0;

    if (judgeIsCanBeControl(current, other, maintenanceStack.length - 1)) {
      maintenanceStack.pop();
      storageStack.unshift(current);

      innerPopStack(judgeIsCanBeControl);
    }
  }, []);

  return {
    maintenanceStack, storageStack, otherStack,

    pushMaintenanceStack, popMaintenanceStack
  } as const;
}
