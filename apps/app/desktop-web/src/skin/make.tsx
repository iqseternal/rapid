import type { SKin } from './declare';

/**
 * 创建一个预设的 Css 样式
 *
 * @example
 * const primaryBackgroundColor = makeRapidCssVarPayload('--rapid-primary-background-color', '#ffffff', '主要背景色'),
 */
export const makeRapidCssVarPayload = <CssVar extends SKin.CssVariable, CssVarValue extends SKin.CssVariableValue, CssTip extends SKin.CssVariableTip>(
  cssVarName: CssVar,
  cssVarValue: CssVarValue,
  cssVarTip: CssTip
): SKin.CssVariablePayload<CssVar, CssVarValue, CssTip> => ({
  variable: cssVarName,
  value: cssVarValue,
  tip: cssVarTip
} as const);


/**
 * 创建一个预设的 Css 样式, 别名：makeRapidCssVarPayload
 */
export const mrcvp = makeRapidCssVarPayload;
