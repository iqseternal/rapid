/**
 * 获取当前的日期
 * @returns
 */
export const getCurDate = () => {
  const date = new Date();
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`;
}

/**
 * 获取当前的时间
 * @returns
 */
export const getCurTime = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

/**
 * 获取当前的日期时间
 * @returns
 */
export const getCurFullDate = () => `${getCurDate()} ${getCurTime()}`;

/**
 *
 * @param min
 * @param max
 * @returns
 */
export const randomRegion = (min: number, max: number) => (Math.random() * (max - min) + min);

/**
 *
 * @param min 请传入一个整数
 * @param max 请传入一个整数
 * @returns
 */
export const randomRegionForInt = (min: number, max: number) => Math.round(randomRegion(min - 0.5, max + 0.5));
