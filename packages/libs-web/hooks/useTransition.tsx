import type { DependencyList } from 'react';
import { useCallback, useState } from 'react';
import { produce } from 'immer';
import { useAsyncLayoutEffect, useAsyncEffect } from './useAsyncEffect';
import { useShallowReactive } from './useReactive';


export type StartTransitionFunction = () => Promise<unknown>;

/**
 * 类似 react 19. useTransition
 *
 * @example
 *
 * const [error, setError] = useState(null);
 * const [isPendingState, startTransition] = useTransition();
 *
 * const handleSubmit = () => {
 *   // 启动异步 actions
 *   startTransition(async () => {
 *     const error = await updateName(name);
 *     if (error) {
 *       setError(error);
 *       return;
 *     }
 *     redirect("/path");
 *   })
 * };
 *
 */
export function useTransition(callback: StartTransitionFunction, deps: DependencyList) {
  const [state] = useShallowReactive({
    isPending: false
  })

  const startTransition = useCallback(async () => {
    state.isPending = true;

    await callback();

    state.isPending = false;
  }, deps);

  return [state, startTransition] as const;
}
