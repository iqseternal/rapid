import type { DependencyList } from 'react';
import { useCallback } from 'react';
import { useNormalState, useShallowReactive } from './useReactive';

/**
 * 开始某个异步任务的函数类型
 */
export type StartTransitionFunction = (...args: any[]) => Promise<any>;

/**
 * 类似 react 19. useTransition
 *
 * @example
 *
 * const [error, setError] = useState(null);
 * const [requestPendingState, startRequest, startTransition] = useTransition(async () => {
 *   const [err, res] = await toNil(req);
 *
 *   if (err) return;
 *
 *   //
 * }, []);
 *
 * <div
 *    onClick={startRequest}
 * >
 * </div>
 *
 */
export function useTransition<StartTransitionFn extends StartTransitionFunction>(callback: StartTransitionFn, deps: DependencyList) {
  const [normalState] = useNormalState({
    times: 0
  })
  const [shallowState] = useShallowReactive({
    isPending: false
  })

  /**
   * 执行一个异步任务, 状态会和 hook 公用 pending 保持一致
   */
  const transition = useCallback(async <Data extends any = void>(callback: () => Promise<Data>): Promise<Data> => {
    normalState.times ++;
    if (normalState.times >= 1) shallowState.isPending = true;

    const data = await callback();
    normalState.times --;

    if (normalState.times === 0) shallowState.isPending = false;
    return data;
  }, []);

  /**
   * 执行本次异步任务
   */
  const startWithTransition = useCallback(((...args) => {
    return transition(() => callback(...args));
  }) as StartTransitionFn, deps);

  return [
    shallowState as Readonly<typeof shallowState>,

    startWithTransition,

    transition
  ] as const;
}
