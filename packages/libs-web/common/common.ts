/**
 * 合并多个classname类名,
 *
 * <div className={combinationCName(类名1, 类名2, { [类名3]: 布尔值, [类名4]: 布尔值 }, .....)}></div>
 *
 * @param args
 * @return
 */
export const combinationCName = (...args: (string | undefined | Record<string, boolean | undefined>)[]) => {
  const classNameList: string[] = [];

  args.forEach(arg => {
    if (!arg) return;
    if (typeof arg === 'string') {
      classNameList.push(arg);
      return;
    }

    for (const key in arg) {
      if (arg[key]) classNameList.push(key);
    }
  });

  return classNameList.join(' ');
}


/**
 * 从数组指定区间内查找符合条件的第一个下标位置
 * @param arr
 * @param fn
 * @param startIndex
 * @param endIndex
 * @returns
 */
export const findArrIndex = <T extends unknown>(arr: T[], fn: (el: T) => boolean, startIndex: number = 0, endIndex: number = arr.length - 1): number => {
  if (startIndex < 0 || endIndex >= arr.length) throw new Error(`findArrIndex: 边界错误`);

  for (let i = startIndex;i <= endIndex;i ++) {
    const flag = fn(arr[i]);

    if (flag) return i;
  }
  if (fn(arr[endIndex])) return endIndex + 1;
  return -1;
}
