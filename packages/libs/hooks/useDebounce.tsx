


/**
 * 可以在 组件外部使用
 * @param cb
 * @param time
 * @returns
 */
export function useDebounceHook<T extends (...args: any[]) => void>(cb: T, time: number = 50) {
  let timer: number | undefined = void 0;

  return ((...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
      timer = void 0;
    }, time) as unknown as number;
  }) as unknown as T;
}
