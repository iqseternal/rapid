
export namespace Ansi {
  /**
   * ANSI 格式化字符
   */
  export type AnsiStyle = `'\x1B[${string}m`;

  export const normal = '\x1B[0m' as AnsiStyle;
  export const bright = '\x1B[1m' as AnsiStyle;
  export const grey = '\x1B[2m' as AnsiStyle;
  export const italic = '\x1B[3m' as AnsiStyle;
  export const underline = '\x1B[4m' as AnsiStyle;

  /**
   * 部分终端不支持
   */
  export const flickerSlow = '\x1B[5m' as AnsiStyle;
  /**
   * 部分终端不支持
   */
  export const flickerFast = '\x1B[6m' as AnsiStyle;
  export const hidden = '\x1B[8m' as AnsiStyle;

  export const black = '\x1B[30m' as AnsiStyle;
  export const red = '\x1B[31m' as AnsiStyle;
  export const green = '\x1B[32m' as AnsiStyle;
  export const yellow = '\x1B[33m' as AnsiStyle;
  export const blue = '\x1B[34m' as AnsiStyle;
  export const magenta = '\x1B[35m' as AnsiStyle;
  export const cyan = '\x1B[36m' as AnsiStyle;
  export const white = '\x1B[37m' as AnsiStyle;

  export const blackBg = '\x1B[40m' as AnsiStyle;
  export const redBg = '\x1B[41m' as AnsiStyle;
  export const greenBg = '\x1B[42m' as AnsiStyle;
  export const yellowBg = '\x1B[43m' as AnsiStyle;
  export const blueBg = '\x1B[44m' as AnsiStyle;
  export const magentaBg = '\x1B[45m' as AnsiStyle;
  export const cyanBg = '\x1B[46m' as AnsiStyle;
  export const whiteBg = '\x1B[47m' as AnsiStyle;

  export type Foreground256Color<N extends number = number> = `\x1B[38;5;${N}m`;
  export type Background256Color<N extends number = number> = `\x1B[48;5;${N}m`;

  /**
   * 256色 前景色
   */
  export function to256Color<N extends number = number>(n: N, type?: 'foreground'): '' | Foreground256Color<N>;
  /**
   * 256色 前景色
   */
  export function to256Color<N extends number = number>(n: N, type: 'background'): '' | Background256Color<N>;
  export function to256Color<N extends number = number>(n: N, type?: 'foreground' | 'background'): '' | Foreground256Color<N> | Background256Color<N> {
    if (!Number.isInteger(n) || n < 1 || n > 256) return '';
    if (!type || type === 'foreground') return `\x1B[38;5;${n}m`;
    if (type === 'background') return `\x1B[48;5;${n}m`;
    return '';
  }

  export type Foreground24Color<R extends number = number, G extends number = number, B extends number = number> = `\x1B[38;2;${R};${G};${B}m`;
  export type Background24Color<R extends number = number, G extends number = number, B extends number = number> = `\x1B[48;2;${R};${G};${B}m`;

  /**
   * 24 位真彩色 前景色
   */
  export function to24Color<R extends number, G extends number, B extends number>(r: R, g: G, b: B, type?: 'foreground'): '' | Foreground24Color<R, G, B>;

  /**
   * 24 位真彩色 背景色
   */
  export function to24Color<R extends number, G extends number, B extends number>(r: R, g: G, b: B, type: 'background'): '' | Background24Color<R, G, B>;
  export function to24Color<R extends number, G extends number, B extends number>(r: R, g: G, b: B, type?: 'foreground' | 'background'): '' | Foreground24Color<R, G, B> | Background24Color<R, G, B> {
    if (!Number.isInteger(r) || r < 0 || r > 255) return '';
    if (!Number.isInteger(g) || g < 0 || g > 255) return '';
    if (!Number.isInteger(b) || b < 0 || b > 255) return '';

    if (!type || type === 'foreground') return `\x1B[38;2;${r};${g};${b}m`;
    if (type === 'background') return `\x1B[48;2;${r};${g};${b}m`;
    return '';
  }

  /**
   * 返回格式化信息
   */
  export function format<GStrArr extends (AnsiStyle | string | number | symbol | boolean)[]>(...gStrArr: GStrArr): string;
  export function format<GStrArr extends (AnsiStyle | string | number | symbol | boolean)[]>(...gStrArr: GStrArr): string {
    return gStrArr.map(e => String(e)).concat(normal).join('');
  }

  /**
   * 打印格式化信息
   */
  export function print<GStrArr extends (AnsiStyle | string | number | symbol | boolean)[]>(...gStrArr: GStrArr): void {
    const str = format(...gStrArr);
    console.log(str);
  }
}

