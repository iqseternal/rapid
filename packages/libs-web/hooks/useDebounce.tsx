import type { DependencyList } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { debounce, isArray, isUndefined, throttle } from 'lodash';
import type { DebounceSettings, ThrottleSettings, DebouncedFunc } from 'lodash';

/**
 * 比较两个依赖列表是否相等
 */
const compareDepsEqual = (deps?: DependencyList, nextDeps?: DependencyList) => {
  // 如果两个都是 undefined, 则认为相等
  if (isUndefined(deps) && isUndefined(nextDeps)) return true;

  // 如果两个都是数组, 则判断数组中的每个元素是否相等
  if (isArray(deps) && isArray(nextDeps)) {
    if (deps.length !== nextDeps.length) return false;
    return deps.every((dep, index) => Object.is(dep, nextDeps[index]));
  }

  // 其他情况认为不相等
  return false;
}

/**
 *
 * @example
 * // 基本使用：输入框防抖
 * // 每次输入 300ms 后触发搜索
 * // 注意：deps 变化时仅更新内部 callback 引用，不会重新创建防抖函数
 * // 仅当 wait/options 变化时重建
 * //
 * import { useState, useMemo } from 'react';
 * import { useDebounce } from '@rapid/libs-web';
 *
 * function SearchBox() {
 *   const [keyword, setKeyword] = useState('');
 *
 *   const doSearch = useMemo(() => (kw: string) => {
 *     // 发起请求
 *     console.log('search:', kw);
 *   }, []);
 *
 *   const debouncedSearch = useDebounce(doSearch, 300, { leading: false, trailing: true }, [doSearch]);
 *
 *   return (
 *     <input
 *       value={keyword}
 *       onChange={(e) => {
 *         const v = e.target.value;
 *         setKeyword(v);
 *         debouncedSearch(v);
 *       }}
 *     />
 *   );
 * }
 */
export function useDebounce<T extends (...args: any[]) => void>(callback: T, wait: number, options: DebounceSettings, deps: DependencyList) {
  const targetFn = useRef(callback);

  const oldDeps = useRef<DependencyList | undefined>(deps);

  if (!compareDepsEqual(oldDeps.current, deps)) {
    oldDeps.current = deps;
    targetFn.current = callback;
  }

  const debounceFn = useMemo<DebouncedFunc<T>>(() => {

    return debounce(
      ((...args) => targetFn.current(...args)) as T,
      wait,
      options
    );
  }, [wait, options?.leading, options?.trailing, (options as any)?.maxWait]);

  useEffect(() => {

    return () => {
      debounceFn.cancel();
    }
  }, [debounceFn]);

  return debounceFn;
}

/**
 *
 * @example
 * // 基本使用：滚动节流
 * // 每 200ms 最多触发一次
 * //
 * import { useMemo, useEffect } from 'react';
 * import { useThrottle } from '@rapid/libs-web';
 *
 * function ScrollList() {
 *   const onScroll = useMemo(() => () => {
 *     console.log('scroll');
 *   }, []);
 *
 *   const throttled = useThrottle(onScroll, 200, { leading: true, trailing: true }, [onScroll]);
 *
 *   useEffect(() => {
 *     window.addEventListener('scroll', throttled);
 *     return () => window.removeEventListener('scroll', throttled);
 *   }, [throttled]);
 *
 *   return null;
 * }
 */
export function useThrottle<T extends (...args: any[]) => void>(callback: T, wait: number, options: ThrottleSettings, deps: DependencyList) {
  const targetFn = useRef(callback);

  const oldDeps = useRef<DependencyList | undefined>(deps);

  if (!compareDepsEqual(oldDeps.current, deps)) {
    oldDeps.current = deps;
    targetFn.current = callback;
  }

  const throttleFn = useMemo<DebouncedFunc<T>>(() => {
    return throttle(
      ((...args) => targetFn.current(...args)) as T,
      wait,
      options
    );
  }, [wait, options?.leading, options?.trailing]);

  useEffect(() => {

    return () => {
      throttleFn.cancel();
    }
  }, [throttleFn]);

  return throttleFn;
}
