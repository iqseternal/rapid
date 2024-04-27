import type { ComputedGetter, WatchCallback, WatchStopHandle } from 'vue';
import { watch, computed } from 'vue';

/**
 *
 * 条件使用, 当出发 ref, reactive 会出发副作用, 但有时, 希望某一次的响应式被取消, 不会出发副作用
 *
 * @returns
 */
export function useNoEffect<V>(getter: ComputedGetter<V>) {
  let pauseHandle = false;

  /**
   * 暂停某次监听
   */
  const pauseHandler = () => {
    pauseHandle = true;
  }

  let stopHandle: WatchStopHandle | undefined = void 0;

  /**
   * 监听
   * @param callback
   * @returns
   */
  const customWatch = (callback: WatchCallback<V, V>) => {
    if (stopHandle) return;

    stopHandle = watch<V>(getter, (...args) => {
      if (pauseHandle) {
        pauseHandle = false;
        return;
      }

      return callback(...args);
    })
  }

  /**
   * 终止监听
   */
  const stopCustomWatch = () => {
    stopHandle && stopHandle()
  }

  /**
   * 使用一次没有副作用的 set
   * @param fn
   */
  const noEffectSetter = (fn: () => void) => {
    pauseHandler();

    fn();
  }

  return {
    pauseWatch: pauseHandler,

    watch: customWatch,

    unwWatch: stopCustomWatch,

    noEffectSetter
  }
}



export const useNoEffectHook = useNoEffect;
