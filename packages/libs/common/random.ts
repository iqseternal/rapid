/**
 * 随机产生范围内的一个数字
 * @param min
 * @param max
 * @returns
 */
export const randomRegion = (min: number, max: number) => (Math.random() * (max - min) + min);

/**
 * 随机产生范围内的一个整数数字
 * @param min
 * @param max
 * @returns
 */
export const randomRegionForInt = (min: number, max: number) => Math.round(randomRegion(min - 0.5, max + 0.5));

/** 十六进制颜色出现的字符 */
export type HexColorStrChar = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

/** 十六进制颜色的类型 */
export type HexColorStr = `#${string}`;

/**
 * 随机产生一个十六进制的颜色
 * @returns
 */
export const randomHexColor = (): HexColorStr => {
  const charactors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  return new Array(6).fill(0).reduce((color) => color + charactors[randomRegionForInt(0, 16)], '#') as HexColorStr;
}

/** RGB 颜色的类型 */
export type RgbColorStr = `rgb(${number}, ${number}, ${number})`;

/**
 * 随机产生一个 RGB 颜色
 * @returns
 */
export const randomRgbColor = (): RgbColorStr => {
  return `rgb(${new Array(3).fill(0).map(() => randomRegionForInt(0, 255)).join(', ')})` as RgbColorStr;
}

/** RGBA 颜色的类型 */
export type RgbaColorStr = `rgba(${number}, ${number}, ${number}, ${number})`;

/**
 * 随机产生一个 RGBA 的颜色
 * @returns
 */
export const randomRgbaColor = (fixed: number = 2): RgbaColorStr => {
  return `rgba(${new Array(3).fill(0).map(() => randomRegionForInt(0, 255)).join(', ')}, ${randomRegion(0, 1).toFixed(fixed)})` as RgbaColorStr;
}

/** 颜色枚举 */
export enum COLOR_TYPE { HEX = 'hex', RGB = 'rgb', RGBA = 'rgba' }

/**
 * 随机产生一个颜色
 * @param {COLOR_TYPE} colorType
 * @returns
 */
export const randomColor = (colorType: COLOR_TYPE = COLOR_TYPE.HEX) => {
  if (colorType === COLOR_TYPE.HEX) return randomHexColor();
  else if (colorType === COLOR_TYPE.RGB) return randomRgbColor();
  else if (colorType === COLOR_TYPE.RGBA) return randomRgbaColor();

  return '';
}
