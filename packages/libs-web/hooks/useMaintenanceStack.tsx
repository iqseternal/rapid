
import { useShallowReactive } from './useReactive';
import { useCallback, useEffect, useState } from 'react';

export interface MaintenanceStackOptions<T, Other> {
  maintenanceStack: T[];

  storageStack?: T[];

  otherStack?: Other[];
}

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
   * 入栈到 maintenanceStack 中
   * @returns
   */
  const pushMaintenanceStack = useCallback(function innerPushStack(judgeIsCanBeControl: JudgeIsCanBeControlStack<T, Other>) {
    if (!storageStack.length) return;

    const current = storageStack[0];
    const other = otherStack[maintenanceStack.length] ?? void 0;

    if (judgeIsCanBeControl(current, other, maintenanceStack.length)) {
      storageStack.shift();
      maintenanceStack.push(current);

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
  }
}
