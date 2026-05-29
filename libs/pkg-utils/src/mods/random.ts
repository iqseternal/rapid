/**
 * 随机产生范围内的一个数字
 * @example
 * const randomNumber = randomNumber(1, 10); // 产生一个 1-10 之间的随机数字
 *
 * @returns
 */
export function randomNumber(min: number, max: number) {
  return (Math.random() * (max - min) + min);
}

/**
 * 随机产生范围内的一个整数数字
 * @example
 * const randomNumber = randomNumberWithInt(1, 10); // 产生一个 1-10 之间的随机整数数字
 * @returns
 */
export function randomNumberWithInt(min: number, max: number) {
  return Math.round(randomNumber(min - 0.5, max + 0.5));
}

/**
 * 随机产生一个十六进制的颜色
 * @example
 * const hexColor = randomColorWithHex(); // 随机十六进制颜色
 *
 * @returns
 */
export function randomColorWithHex(): `#${string}` {
  return `#${Math.floor(randomNumberWithInt(0, 0xFFFFFF)).toString(16).toUpperCase()}`;
}

/**
 * 随机产生一个 RGB 颜色
 * @example
 * const rgbColor = randomColorWithRgb(); // 随机 rgb 颜色
 */
export function randomColorWithRgb(): `rgb(${number}, ${number}, ${number})` {
  return `rgb(${randomNumberWithInt(0, 0xFFFFFF)}, ${randomNumberWithInt(0, 0xFFFFFF)}, ${randomNumberWithInt(0, 0xFFFFFF)})`;
}

/**
 * 随机产生一个 RGBA 的颜色
 * @example
 * const rgbaColor = randomColorWithRgba(); // 随机 rgba 颜色
 */
export function randomColorWithRgba(): `rgba(${number}, ${number}, ${number}, ${number})` {
  return `rgba(${randomNumberWithInt(0, 0xFFFFFF)}, ${randomNumberWithInt(0, 0xFFFFFF)}, ${randomNumberWithInt(0, 0xFFFFFF)}, ${randomNumberWithInt(0, 0xFFFFFF)})`;
}

export function randomColor(): `#${string}`;
export function randomColor(colorType: 'hex'): `#${string}`;
export function randomColor(colorType: 'rgb'): `rgb(${number}, ${number}, ${number})`;
export function randomColor(colorType: 'rgba'): `rgba(${number}, ${number}, ${number}, ${number})`;
export function randomColor(colorType?: string): string {
  if (typeof colorType === 'undefined') return randomColorWithHex();

  if (colorType === 'hex') return randomColorWithHex();
  if (colorType === 'rgb') return randomColorWithRgb();
  if (colorType === 'rgba') return randomColorWithRgba();
  return randomColorWithHex();
}
