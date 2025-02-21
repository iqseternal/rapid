import type { DependencyList } from 'react';
import { useCallback } from 'react';
import { useNormalState, useShallowReactive } from './useReactive';

/**
 * 开始某个异步任务的函数类型
 */
export type StartTransitionFunction = (...args: any[]) => Promise<void>;

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
  const [shallowState] = useShallowReactive({
    pending: false
  })

  /**
   * 执行本次异步任务, 应该在本函数（callback）中处理好异步错误
   */
  const startWithTransition = useCallback<StartTransitionFn>((async (...args: Parameters<StartTransitionFn>) => {
    if (shallowState.pending) return;

    let error: any = void 0;

    shallowState.pending = true;

    await callback(...args).catch(err => {
      error = err;
    });

    shallowState.pending = false;

    if (error) return Promise.reject(error);
  }) as StartTransitionFn, deps);

  return [
    shallowState as Readonly<typeof shallowState>,

    startWithTransition
  ] as const;
}
