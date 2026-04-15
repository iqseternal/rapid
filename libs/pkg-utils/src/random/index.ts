
/**
   * 随机产生范围内的一个数字
   * @example
   * const randomNumber = randomRegion(1, 10); // 产生一个 1-10 之间的随机数字
   *
   * @returns
   */
export const randomRegion = (min: number, max: number) => (Math.random() * (max - min) + min);

/**
 * 随机产生范围内的一个整数数字
 * @example
 * const randomNumber = randomRegionForInt(1, 10); // 产生一个 1-10 之间的随机整数数字
 * @returns
 */
export const randomRegionForInt = (min: number, max: number) => Math.round(randomRegion(min - 0.5, max + 0.5));

/** 十六进制颜色出现的字符 */
export type HexColorStrChar = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

/** 十六进制颜色的类型 */
export type HexColorStr = `#${string}`;

/**
 * 随机产生一个十六进制的颜色
 * @example
 * const hexColor = randomHexColor(); // 随机十六进制颜色
 *
 * @returns
 */
export const randomHexColor = (): HexColorStr => `#${Math.floor(randomRegionForInt(0, 0xFFFFFF)).toString(16).toUpperCase()}`;

/** RGB 颜色的类型 */
export type RgbColorStr = `rgb(${number}, ${number}, ${number})`;

/**
 * 随机产生一个 RGB 颜色
 * @example
 * const rgbColor = randomRgbColor(); // 随机 rgb 颜色
 */
export const randomRgbColor = (): RgbColorStr => `rgb(${randomRegionForInt(0, 0xFFFFFF)}, ${randomRegionForInt(0, 0xFFFFFF)}, ${randomRegionForInt(0, 0xFFFFFF)})`;


/** RGBA 颜色的类型 */
export type RgbaColorStr = `rgba(${number}, ${number}, ${number}, ${number})`;

/**
 * 随机产生一个 RGBA 的颜色
 * @example
 * const rgbaColor = randomRgbaColor(); // 随机 rgba 颜色
 */
export const randomRgbaColor = (): RgbaColorStr =>
  `rgba(${randomRegionForInt(0, 0xFFFFFF)}, ${randomRegionForInt(0, 0xFFFFFF)}, ${randomRegionForInt(0, 0xFFFFFF)}, ${randomRegionForInt(0, 0xFFFFFF)})`;

/** 颜色枚举 */
export enum ColorType {
  Hex = 'hex',
  Rgb = 'rgb',
  Rgba = 'rgba'
}

/**
 * 随机产生一个 Hex 的颜色
 * @example
 * const color = randomColor('hex'); // 随机 Hex 颜色
 * const color = randomColor(ColorType.Hex); // 随机 Hex 颜色
 */
export function randomColor<Color extends ColorType.Hex | 'hex'>(colorType: Color): HexColorStr;

/**
 * 随机产生一个 rgb 的颜色
 * @example
 * const color = randomColor('rgb'); // 随机 rgb 颜色
 * const color = randomColor(ColorType.Rgb);
 */
export function randomColor<Color extends ColorType.Rgb | 'rgb'>(colorType: Color): RgbColorStr;

/**
 * 随机产生一个 rgba 的颜色
 * @example
 * const color = randomColor('rgba'); // 随机 rgba 颜色
 * const color = randomColor(ColorType.Rgba);
 */
export function randomColor<Color extends ColorType.Rgba | 'rgba'>(colorType: Color): RgbaColorStr;
export function randomColor<Color extends ColorType | string>(colorType: Color | string): HexColorStr | RgbColorStr | RgbaColorStr | '' {
  if (colorType === ColorType.Hex) return randomHexColor();

  if (colorType === ColorType.Rgb) return randomRgbColor();

  if (colorType === ColorType.Rgba) return randomRgbaColor();

  return '';
}
