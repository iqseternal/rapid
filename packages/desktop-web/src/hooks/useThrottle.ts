import { useTimeout } from './useTimeout';
import { ref } from 'vue';

/**
 * 节流函数
 * @param fn
 * @param wait
 * @returns
 */
export function useThrottle(fn: (...args: any[]) => void, wait = 10) {
  const { perTimeout, cancelTimeout, timer } = useTimeout();

  const isCanExecute = ref(true);

  const throttleFn = (...args: any[]) => {
    if (!isCanExecute.value) return;

    fn(...args);

    /**
     * wait 毫秒内不能再次执行 fn
     */
    isCanExecute.value = false;
    perTimeout(() => {
      isCanExecute.value = true;
    }, wait);
  }

  return throttleFn;
}

export const useThrottleHook = useThrottle;
