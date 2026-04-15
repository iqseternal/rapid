
/**
 * 从数组指定区间内查找符合条件的第一个下标位置
 *
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
export const findArrIndex = <El>(arr: El[], fn: (el: El, index: number) => boolean, startIndex: number = 0, endIndex: number = arr.length - 1): number => {
  // 修正边界
  if (startIndex < 0) startIndex = 0;
  if (endIndex >= arr.length) endIndex = arr.length - 1;

  if (startIndex > endIndex) return -1;

  for (let i = startIndex;i <= endIndex;i ++) {
    const flag = fn(arr[i], i);
    if (flag) return i;
  }

  return -1;
}

/**
 * 从数组中的指定区间查找某个元素
 * @example
 * const arr = [1, 2, 3, 4, 'a', 'b', 'c'];
 * const index = findArrElement(arr, (el) => {
 *   if (el === 'a') return true;
 *   return false;
 * }, 6， 9)； // 指定区间茶轴
 *
 * if (arr) {} // 查找成功, 失败时返回 null
 *
 * @returns
 */
export const findArrElement = <El>(arr: El[], fn: (el: El, index: number) => boolean, startIndex = 0, endIndex = arr.length - 1) => {
  const targetIndex = findArrIndex(arr, fn, startIndex, endIndex);

  if (targetIndex === -1) return null;

  return arr[targetIndex];
}
