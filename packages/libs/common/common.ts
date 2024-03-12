

/**
 * 从数组指定区间内查找符合条件的第一个下标位置
 * @param arr
 * @param fn
 * @param startIndex
 * @param endIndex
 * @returns
 */
export const findArrIndex = <T>(arr: T[], fn: (el: T) => boolean, startIndex: number, endIndex: number = arr.length - 1): number => {
  if (startIndex < 0 || endIndex >= arr.length) throw new Error(`findArrIndex: 边界错误`);

  for (let i = startIndex;i <= endIndex;i ++) {
    const flag = fn(arr[i]);

    if (flag) return i;
  }
  if (fn(arr[endIndex])) return endIndex + 1;
  return -1;
}
