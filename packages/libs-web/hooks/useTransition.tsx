import type { DependencyList } from 'react';
import { useCallback } from 'react';
import { useShallowReactive } from './useReactive';

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
 *   const [err, res] = await toPicket(req);
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
    isPending: false
  })

  const startTransition = useCallback(async (callback: () => Promise<void>) => {
    shallowState.isPending = true;
    await callback();
    shallowState.isPending = false;
  }, []);

  const transition = useCallback((...args: Parameters<StartTransitionFn>) => {
    return startTransition(() => callback(...args)) as ReturnType<StartTransitionFn>;
  }, deps);

  return [
    shallowState as Readonly<typeof shallowState>,
    transition as unknown as StartTransitionFn,
    startTransition
  ] as const;
}
