import type { CONFIG } from '@rapid/config/constants';

export interface CssVar<VarName extends `--${Lowercase<typeof CONFIG['PROJECT']>}-${string}`, VarValue extends string = string, TipLabel extends string = string> {
  /**
   * 变量名
   */
  readonly varName: VarName;

  /**
   * 变量值
   */
  readonly varValue: VarValue;

  /**
   * 提示, 表面变量作用
   */
  readonly tipLabel: TipLabel;
}

/**
 * 创建一个预设的 Css 样式
 * @param varName Css 变量名
 * @param value Css 值
 * @param label 该属性的描述
 * @example
 * const primaryBackgroundColor = mRapidC('--rapid-primary-background-color', '#ffffff', '主要背景色'),
 */
export function mRapidC<
  VarName extends `--${Lowercase<typeof CONFIG['PROJECT']>}-${string}`,
  VarValue extends string,
  TipLabel extends string
>(varName: VarName, varValue: VarValue, tipLabel: TipLabel): CssVar<VarName, VarValue, TipLabel> {

  const cssVar: CssVar<VarName, VarValue, TipLabel> = {
    varName,
    varValue,
    tipLabel
  } as const;

  return cssVar;
}

