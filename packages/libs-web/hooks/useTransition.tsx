import type { DependencyList } from 'react';
import { useCallback } from 'react';
import { useShallowReactive } from './useReactive';

export type StartTransitionFunction = () => Promise<void>;

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
 *   // todo:
 * }, []);
 *
 * <div
 *    onClick={startRequest}
 * >
 * </div>
 *
 */
export function useTransition(callback: StartTransitionFunction, deps: DependencyList) {
  const [state] = useShallowReactive({
    isPending: false
  })

  const startTransition = useCallback(async (callback: StartTransitionFunction) => {
    state.isPending = true;

    await callback();

    state.isPending = false;
  }, []);

  const transition = useCallback(() => {

    return startTransition(callback);
  }, deps);

  return [state, transition, startTransition] as const;
}
