import { useTimeout } from './useTimeout';

/**
 * 这是一个防抖
 * @param fn
 * @param wait
 * @returns
 */
export const useDebounce = (fn: (...args: any[]) => void, wait = 300) => {
  const { perTimeout, cancelTimeout } = useTimeout();

  return () => {
    cancelTimeout();

    perTimeout(() => fn && fn(), wait);
  };
};

export const useDebounceHook = useDebounce;
