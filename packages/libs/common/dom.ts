import { isArray, isFunction, isString } from '@suey/pkg-utils';

/** 有关样式的类型声明 */
export namespace CSSTypes {
  /** 像素值 */
  export type PixelValue = `${number}px`;

  /** CSS Style 声明映射表 */
  export type CSSStyleProperttDeclaration = Omit<CSSStyleDeclaration, symbol | number>;


  /** CSS 属性的 key 值类型 */
  export type CSSVarName = `--${string}`;

  /** 带有 变量的 CSS Style 声明映射表 */
  export type CSSStyleVarsDeclaration = CSSStyleProperttDeclaration & Record<`--${string}`, string>;
}

/** Css 值设置时得各种转换 */
export class CssValueConverts {
  /**
   * 将一个数字值转换为一个像素值
   * @param value
   */
  static toPixel(value: number): CSSTypes.PixelValue;
  static toPixel(value: string): CSSTypes.PixelValue;
  static toPixel(value: number | string): CSSTypes.PixelValue {
    if (isString(value)) {
      value = parseInt(value);
      if (isNaN(value)) value = 0;
    }
    const pixcel = value + 'px' as CSSTypes.PixelValue;

    return pixcel;
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
  isImportant?: boolean;
  convert?: CssValueSetterCovertFn | CssValueSetterCovertFn[];
}

/**
 * 获取一个 dom 的 style 属性值
 * @param node
 * @param propertyName
 * @returns
 */
export const getStyleProperty = <T extends any = string, Key extends keyof CSSTypes.CSSStyleProperttDeclaration = keyof CSSTypes.CSSStyleProperttDeclaration>(node: HTMLElement, propertyName: Key, options: CSSValueGetterOptions<T> = {}) => {
  const str = node.style.getPropertyValue(propertyName as string);

  if (options.convert) return options.convert(str);

  return str;
}

/**
 * 设置一个 dom 的 style 属性值
 * @param node
 * @param propertyName
 * @param value
 * @param isImportant
 * @returns
 */
export const setStyleProperty = <Key extends keyof CSSTypes.CSSStyleProperttDeclaration>(node: HTMLElement, propertyName: Key, value: CSSTypes.CSSStyleProperttDeclaration[Key], options: CssValueSetterOptions = {}) => {
  let valueStr = value as string;

  if (Array.isArray(options.convert)) {
    options.convert.forEach(convertFn => {
      valueStr = convertFn(valueStr) as string;
    })
  }
  else if (isFunction(options.convert)) valueStr = options.convert(valueStr);

  return node.style.setProperty(propertyName as string, valueStr, options.isImportant ? 'important' : '');
}

/**
 * 设置多个 dom 的 style 属性值
 * @param node
 * @param properties
 * @returns
 */
export const setStyleProperties = <Key extends keyof CSSTypes.CSSStyleProperttDeclaration>(node: HTMLElement, properties: Partial<CSSTypes.CSSStyleProperttDeclaration>, options: Omit<CssValueSetterOptions, 'isImportant'>) => {
  return Object.keys(properties).forEach((propertyName) => {
    const value = properties[propertyName as Key];
    if (!value) return;

    setStyleProperty(node, propertyName as keyof CSSTypes.CSSStyleProperttDeclaration, value, {
      convert: options.convert
    })
  });
}

/**
 * 获得一个 dom 的 css 变量值
 * @param node
 * @param cssVarName
 * @returns
 */
export const getCssVar = <T extends any = string, Key extends keyof CSSTypes.CSSStyleVarsDeclaration = keyof CSSTypes.CSSStyleVarsDeclaration>(node: HTMLElement, cssVarName: Key, options: CSSValueGetterOptions<T> = {}) => {
  return getStyleProperty(node, cssVarName as keyof CSSTypes.CSSStyleProperttDeclaration, options);
}

/**
 * 设置一个 dom 的 css 变量值
 * @param node
 * @param cssVarName
 * @param value
 * @returns
 */
export const setCssVar = <Key extends keyof CSSTypes.CSSStyleVarsDeclaration>(node: HTMLElement, cssVarName: Key, value: CSSTypes.CSSStyleVarsDeclaration[Key], options: CssValueSetterOptions = {}) => {
  return setStyleProperty(node, cssVarName as keyof CSSTypes.CSSStyleProperttDeclaration, value, options);
}

/**
 * 设置多个 dom 的 css 变量值
 * @param node
 * @param cssVars
 * @returns
 */
export const setCssVars = <Key extends keyof CSSTypes.CSSStyleVarsDeclaration>(node: HTMLElement, cssVars: Partial<CSSTypes.CSSStyleVarsDeclaration>, options: Omit<CssValueSetterOptions, 'isImportant'> = {}) => {
  return Object.keys(cssVars).forEach((cssVarName) => {
    const value = cssVars[cssVarName as Key];
    if (!value) return;

    setCssVar(node, cssVarName as keyof CSSTypes.CSSStyleVarsDeclaration, value, {
      convert: options.convert
    })
  });
}
