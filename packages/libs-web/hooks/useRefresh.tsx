import { useUpdate } from 'ahooks';
import { useCallback, useEffect, useRef } from 'react';

/**
 * 更新组件的 Hook, 当一个组件中的变量(引用)被 state 记录, 但是又不想 setState 这个变量的时候, 就可以使用这个
 *
 * @example
 *
 * const refresh = useRefresh();
 *
 * refresh(); // 重新渲染当前组件
 *
 */
export const useRefresh = useUpdate;

/**
 * 安全刷新组件的 Hook, 当组件未挂载时, 不会触发刷新
 *
 * @example
 *
 * const safeRefresh = useSafeRefresh();
 *
 * safeRefresh(); // 重新渲染当前组件
 *
 * 当组件卸载时, 不会触发刷新
 */
export function useSafeRefresh() {
  const isMounted = useRef(false);

  const refresh = useRefresh();

  const safeRefresh = useCallback(() => {
    if (!isMounted.current) return;

    refresh();
  }, [refresh]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return safeRefresh;
}
