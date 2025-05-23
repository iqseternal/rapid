import { RefObject, useEffect } from 'react';
import { useNormalState, useRefresh, useResizeObserver, useShallowReactive } from '@rapid/libs-web';
import { isUndefined } from '@rapid/libs';

/**
 * 收纳盒
 */
export function useStorageBox<T>(containerRef: RefObject<HTMLElement>, list: T[]) {
  const refresh = useRefresh();

  type OtherMoreInfo = {
    sourceWidth: number;

    offsetLeftWidth: number;
  }
  type JudgeIsCanBeControlStack<T, Other> = (item: T, other: Other | undefined, index: number) => boolean;

  const [normalState] = useNormalState(() => ({
    maintenanceStack: list as T[],
    storageStack: [] as T[],

    otherStack: [] as (OtherMoreInfo | undefined)[],
  }))

  //
  const [shallowStatusState] = useShallowReactive({
    isCalcDone: false
  })

  // resizeObserver
  const [resizeObserver] = useResizeObserver(containerRef, () => {
    const container = containerRef.current;
    if (!container) return;

    const presetMaintenanceStackLen = normalState.maintenanceStack.length;
    const presetStorageStackLen = normalState.storageStack.length;

    function pushMaintenanceStack(judgeIsCanBeControl: JudgeIsCanBeControlStack<T, OtherMoreInfo>) {
      if (!normalState.storageStack.length) return;

      // 存储栈中的元素: 当前控制元素
      const current = normalState.storageStack[0];
      // 辅助栈中的额外数据
      const other = normalState.otherStack[normalState.maintenanceStack.length] ?? void 0;

      // 判断当前元素是否可以被控制
      if (judgeIsCanBeControl(current, other, normalState.maintenanceStack.length)) {
        normalState.storageStack.shift();
        normalState.maintenanceStack.push(current);

        // 如果成功了, 那么继续下一个
        pushMaintenanceStack(judgeIsCanBeControl);
      }
    }

    function popMaintenanceStack(judgeIsCanBeControl: JudgeIsCanBeControlStack<T, OtherMoreInfo>) {
      if (!normalState.maintenanceStack.length) return;

      const current = normalState.maintenanceStack[normalState.maintenanceStack.length - 1];
      const other = normalState.otherStack[normalState.maintenanceStack.length - 1] ?? void 0;

      if (judgeIsCanBeControl(current, other, normalState.maintenanceStack.length - 1)) {
        normalState.maintenanceStack.pop();
        normalState.storageStack.unshift(current);

        popMaintenanceStack(judgeIsCanBeControl);
      }
    }

    // 什么条件添加到展示栈中
    pushMaintenanceStack((_, other) => {
      if (!other) return false;
      return container.clientWidth >= other.offsetLeftWidth;
    });

    popMaintenanceStack((_, other) => {
      if (!other) return false;
      return container.clientWidth < other.offsetLeftWidth;
    });

    if (
      presetMaintenanceStackLen !== normalState.maintenanceStack.length ||
      presetStorageStackLen !== normalState.maintenanceStack.length
    ) {
      refresh();
    }
  }, []);

  useEffect(() => {

    return () => {
      resizeObserver.disconnect();
    }
  }, []);

  // 计算元素宽度 以及 它距离最作放的距离
  useEffect(() => {
    if (!containerRef.current) return;

    let columnGap = parseInt(getComputedStyle(containerRef.current).columnGap);
    if (Number.isNaN(columnGap)) columnGap = 0;

    // 处理元素宽度
    for (let i = 0; i < normalState.maintenanceStack.length && i < containerRef.current.children.length; i++) {
      const child = containerRef.current.children[i];
      if (!(child instanceof HTMLElement)) continue;
      if (!normalState.otherStack[i]) normalState.otherStack[i] = { sourceWidth: child.clientWidth, offsetLeftWidth: 0 };
    }

    if (normalState.otherStack.length) {
      if (normalState.otherStack[0]) normalState.otherStack[0].offsetLeftWidth = normalState.otherStack[0].sourceWidth + 50;
    }

    for (let i = 1; i < normalState.maintenanceStack.length && i < containerRef.current.children.length; i++) {
      if (normalState.otherStack.length === 0) continue;

      if (isUndefined(normalState.otherStack)) continue;
      if (isUndefined(normalState.otherStack?.[i])) continue;
      if (isUndefined(normalState.otherStack?.[i - 1])) continue;

      const tOther = normalState.otherStack[i], ptOther = normalState.otherStack[i - 1];
      if (isUndefined(tOther)) continue;
      if (isUndefined(ptOther)) continue;

      tOther.offsetLeftWidth = ptOther.offsetLeftWidth + columnGap + tOther.sourceWidth;
    }

    shallowStatusState.isCalcDone = true;

    return () => {
      normalState.otherStack.fill(void 0);
      shallowStatusState.isCalcDone = false;
    }
  }, []);

  return [
    shallowStatusState,
    normalState.maintenanceStack,
    normalState.storageStack
  ] as const;
}
