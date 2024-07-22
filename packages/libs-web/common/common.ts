/**
 * 合并多个classname类名,
 * @example
 * ``` tsx
 * <div
 *    className={
 *      combinationCName(
 *        类名1,
 *        类名2,
 *        {
 *          [类名3]: 布尔值,
 *          [类名4]: 布尔值
 *        },
 *        .....
 *       )
 *    }
 * ></div>
 *
 * @param args
 * @return
 */
export const combinationCName = (...args: (string | undefined | boolean | number | Record<string, boolean | undefined>)[]) => {
  const classNameList: string[] = [];

  args.forEach(arg => {
    if (!arg) return;
    if (typeof arg === 'string') {
      classNameList.push(arg);
      return;
    }
    if (typeof arg === 'boolean') {
      return;
    }
    if (typeof arg === 'number') {
      return;
    }

    for (const key in arg) {
      if (arg[key]) classNameList.push(key);
    }
  });

  return classNameList.join(' ');
}


