import { isFunction, isString } from '@suey/pkg-utils';

/** 有关样式的类型声明 */
export namespace CSSTypes {
  /** 像素值 */
  export type PixelValue = `${number}px`;

  /** CSS Style 声明映射表 */
  export type CSSStylePropertyDeclaration = Omit<CSSStyleDeclaration, symbol | number>;


  /** CSS 属性的 key 值类型 */
  export type CSSVarName = `--${string}`;

  /** 带有 变量的 CSS Style 声明映射表 */
  export type CSSStyleVarsDeclaration = Partial<CSSStylePropertyDeclaration> & Record<`--${string}`, any>;
}

/** Css 值设置时得各种转换 */
export class CssValueConverts {
  /**
   * 将一个数字值转换为一个像素值
   * @example
   * let size = 200;
   * const width = CssValueConverts. toPixel(size); // 200px
   *
   * @param value
   */
  static toPixel(value: number): CSSTypes.PixelValue;
  /**
   * @example
   * let size = '200';
   * const width = CssValueConverts.toPixel(size); // 200px
   *
   * @param value
   */
  static toPixel(value: string): CSSTypes.PixelValue;
  static toPixel(value: number | string): CSSTypes.PixelValue {
    if (isString(value)) {
      value = parseInt(value);
      if (isNaN(value)) value = 0;
    }
    return value + 'px' as CSSTypes.PixelValue;
  }
}

/** 在为 dom 设置样式属性值的时候会进行调用的转换函数, 可以将值转换为特定的格式并返回 */
export type CssValueSetterCovertFn<T extends unknown = any> = (value: T) => string;

/** 在获取 dom 样式的时候可以进行转换, 获得其自身想要的类型 */
export type CssValueGetterCovertFn<T = string> = (value: string) => T;

export type CSSValueGetterOptions<T> = {
  convert?: CssValueGetterCovertFn<T>;
}
/** 为 dom 设置样式属性值的选项 */
export type CssValueSetterOptions = {
  convert?: CssValueSetterCovertFn | CssValueSetterCovertFn[];
}

/**
 * 获取一个 dom 的 style 属性值
 * @example
 * const background = getStyleProperty(document.body, 'background'); // string 类型
 * const width = getStyleProperty(document.body, 'width', {
 *   convert: (value) => { // 转换格式, value: string => number
 *     return Number(value);
 *   }
 * })
 *
 * @returns
 */
export const getStyleProperty = <T extends any = string, Key extends keyof CSSTypes.CSSStylePropertyDeclaration = keyof CSSTypes.CSSStylePropertyDeclaration>(node: HTMLElement, propertyName: Key, options: CSSValueGetterOptions<T> = {}) => {
  const str = node.style[(propertyName as keyof CSSStyleDeclaration)] as string;
  if (options.convert) return options.convert(str);
  return str;
}

/**
 * 设置一个 dom 的 style 属性值
 * @example
 * setStyleProperty(document.body, 'background', '#f00');
 * setStyleProperty(document.body, 'width', '200', { // 会把 200 变成像素
 *   convert: CssValueConverts.toPixel
 * })
 *
 * @returns
 */
export const setStyleProperty = <Key extends keyof CSSTypes.CSSStylePropertyDeclaration>(node: HTMLElement, propertyName: Key, value: CSSTypes.CSSStylePropertyDeclaration[Key], options: CssValueSetterOptions = {}) => {
  let valueStr = value as string;
  if (Array.isArray(options.convert)) {
    options.convert.forEach(convertFn => {
      valueStr = convertFn(valueStr) as string;
    })
  }
  else if (isFunction(options.convert)) valueStr = options.convert(valueStr);

  if (!node) return;
  if (!node.style) return;

  return node.style[propertyName as any] = valueStr as any;
}

/**
 * 设置多个 dom 的 style 属性值
 * @example
 * setStyleProperties(document.body, {
 *   color: '#F00',
 *   backgroundColor: '#00F'
 * });
 *
 * @returns
 */
export const setStyleProperties = <Key extends keyof CSSTypes.CSSStylePropertyDeclaration>(node: HTMLElement, properties: Partial<CSSTypes.CSSStylePropertyDeclaration>, options: CssValueSetterOptions = {}) => {
  return Object.keys(properties).forEach((propertyName) => {
    const value = properties[propertyName as Key];
    if (!value) return;

    setStyleProperty(node, propertyName as keyof CSSTypes.CSSStylePropertyDeclaration, value, {
      convert: options.convert
    })
  });
}

/**
 * 获得一个 dom 的 css 变量值
 * @example
 * const background = getCssVar(document.body, 'background'); // string 类型
 * const width = getCssVar(document.body, 'width', {
 *   convert: (value) => { // 转换格式, value: string => number
 *     return Number(value);
 *   }
 * })
 * @returns
 */
export const getCssVar = <T extends any = string, Key extends keyof CSSTypes.CSSStyleVarsDeclaration = keyof CSSTypes.CSSStyleVarsDeclaration>(node: HTMLElement, cssVarName: Key, options: CSSValueGetterOptions<T> = {}) => {
  return getStyleProperty(node, cssVarName as keyof CSSTypes.CSSStylePropertyDeclaration, options);
}

/**
 * 设置一个 dom 的 css 变量值
 * @example
 * setCssVar(document.body, 'background', '#f00');
 * setCssVar(document.body, '--x', '20');
 * setCssVar(document.body, 'width', '200', { // 会把 200 变成像素
 *   convert: CssValueConverts.toPixel
 * })
 * @returns
 */
export const setCssVar = <Key extends keyof CSSTypes.CSSStyleVarsDeclaration>(node: HTMLElement, cssVarName: Key, value: CSSTypes.CSSStyleVarsDeclaration[Key], options: CssValueSetterOptions = {}) => {
  return setStyleProperty(node, cssVarName as keyof CSSTypes.CSSStylePropertyDeclaration, value, options);
}

/**
 * 设置多个 dom 的 css 变量值
 * @example
 * setCssVars(document.body, {
 *   color: '#F00',
 *   backgroundColor: '#00F',
 *   '--x': 20
 * });
 * @returns
 */
export const setCssVars = <Key extends keyof CSSTypes.CSSStyleVarsDeclaration>(node: HTMLElement, cssVars: Partial<CSSTypes.CSSStyleVarsDeclaration>, options: CssValueSetterOptions = {}) => {
  return Object.keys(cssVars).forEach((cssVarName) => {
    const value = cssVars[cssVarName as Key];
    if (!value) return;

    setCssVar(node, cssVarName as keyof CSSTypes.CSSStyleVarsDeclaration, value, {
      convert: options.convert
    })
  });
}

export const cssRoot = (globalThis.document && document.querySelector(':root')) as HTMLElement;

export const setCssVarForRoot = <Key extends keyof CSSTypes.CSSStyleVarsDeclaration>(cssVar: Key, value: CSSTypes.CSSStyleVarsDeclaration[Key]) => setCssVar<Key>(cssRoot, cssVar, value);

export const getCssVarForRoot = <Key extends keyof CSSTypes.CSSStyleVarsDeclaration>(cssVar: Key) => getCssVar<Key>(cssRoot, cssVar);

export const setCssVarsForRoot = (properties: CSSTypes.CSSStyleVarsDeclaration) => setCssVars(cssRoot, properties);

export function isScrollContainer<T extends HTMLElement>(dom: T): boolean {
  const style = window.getComputedStyle(dom);
  const overflowY = style.overflowY;

  if (
    (overflowY.includes('auto') || overflowY.includes('scroll')) &&
    dom.scrollHeight >= dom.clientHeight
  ) return true;

  return false;
}

/**
 * 找到第一个垂直滚动的父级元素
 * @param dom
 * @return
 */
export function getFirstScrollContainer<T extends HTMLElement>(dom: T): T | null {
  let currentElement: HTMLElement | null = dom;

  while (currentElement) {
    const style = window.getComputedStyle(currentElement);

    if (
      currentElement !== dom &&
      isScrollContainer(currentElement)
    ) {
      return currentElement as T;
    }

    currentElement = currentElement.parentElement;
  }

  return null;
}

/**
 * 获取元素的额外尺寸
 * @param element
 * @returns
 */
export const getElementMoreRect = (element: HTMLElement) => {
  const elementComputedStyle = getComputedStyle(element);

  const paddingTop = parseInt(elementComputedStyle.paddingTop);
  const paddingBottom = parseInt(elementComputedStyle.paddingBottom);
  const marginTop = parseInt(elementComputedStyle.marginTop);
  const marginBottom = parseInt(elementComputedStyle.marginBottom);
  const borderTop = parseInt(elementComputedStyle.borderTopWidth);
  const borderBottom = parseInt(elementComputedStyle.borderBottomWidth);

  return { paddingTop, paddingBottom, marginTop, marginBottom, borderTop, borderBottom };
}
