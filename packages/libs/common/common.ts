
/**
 * 从数组指定区间内查找符合条件的第一个下标位置
 * @example
 * const arr = [1, 2, 3, 4, 'a', 'b', 'c'];
 * const index = findArrIndex(arr, (el) => {
 *   if (el === 'a') return true;
 *   return false;
 * });
 *
 * if (index !== -1) {} // index 为数组中元素下标，并且查找成功
 *
 * @example
 * const arr = [1, 2, 3, 4, 'a', 'b', 'c'];
 * const index = findArrIndex(arr, (el) => {
 *   if (el === 'a') return true;
 *   return false;
 * }, 6， 9)； // 指定区间茶轴
 *
 * if (index !== -1) {} // index 为数组中元素下标，并且查找成功
 * else {
 *
 * }
 *
 * @returns
 */
export const findArrIndex = <T extends unknown>(arr: T[], fn: (el: T, index: number) => boolean, startIndex: number = 0, endIndex: number = arr.length - 1): number => {
  if (startIndex < 0 || endIndex >= arr.length) {
    console.warn(`findArrIndex: 边界错误`);
    // throw new Error(`findArrIndex: 边界错误`);
    if (startIndex < 0) startIndex = 0;
    if (endIndex >= arr.length) endIndex = arr.length - 1;
  }

  for (let i = startIndex;i <= endIndex;i ++) {
    const flag = fn(arr[i], i);

    if (flag) return i;
  }

  return -1;
}
