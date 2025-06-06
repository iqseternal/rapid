import { isUndefined } from '@suey/pkg-utils';

/**
import { Key } from 'react';
   * CSS 变量的名称
   */
export type CssVariable = `--rd-${string}`;

/**
 * CSS 变量的值
 */
export type CssVariableValue = string;

/**
 * CSS 变量提示标签
 */
export type CssVariableTip = string;

/**
 * 单个 CSS 变量的描述性负载
 */
export interface CssVariablePayload<Variable extends CssVariable = CssVariable, Value extends CssVariableValue = CssVariableValue, Tip extends CssVariableTip = CssVariableTip> {
  /**
   * 变量名
   */
  readonly variable: Variable;

  /**
   * 变量值
   */
  value: Value;

  /**
   * 提示，说明变量用途
   */
  readonly tip: Tip;
}

/**
 * 从 payload 中提取出变量名
 */
export type ExtractCssVariableFromPayload<Payload extends CssVariablePayload> = Payload['variable'];

/**
 * 从 payload 中提取出默认值
 */
export type ExtractCssVariableValueFromPayload<Payload extends CssVariablePayload> = Payload['value'];

/**
 * 从 payload 中提取出提示 tip
 */
export type ExtractCssVariableTipFromPayload<Payload extends CssVariablePayload> = Payload['tip'];

/**
 * 表示所有 CSS 变量的负载映射
 */
export type CssVariablePayloadSheet = Record<string, CssVariablePayload>;

export type CssVar<Payload extends CssVariablePayload> = `var(${ExtractCssVariableFromPayload<Payload>}, ${ExtractCssVariableValueFromPayload<Payload>})`;

export type CssVars<Sheet extends CssVariablePayloadSheet> = {
  readonly [Key in keyof Sheet]: CssVar<Sheet[Key]>;
}

/**
 * 创建一个预设的 Css 样式
 *
 * @example
 * const primaryBackgroundColor = makeRapidCssVarPayload('--rapid-primary-background-color', '#ffffff', '主要背景色'),
 */
export const makeRdCssVarPayload = <CssVar extends CssVariable, CssVarValue extends CssVariableValue, CssTip extends CssVariableTip>(
  cssVariableName: CssVar,
  cssVariableValue: CssVarValue,
  cssVariableTip: CssTip
): CssVariablePayload<CssVar, CssVarValue, CssTip> => ({
  variable: cssVariableName,
  value: cssVariableValue,
  tip: cssVariableTip
} as const);

/**
 * 创建一个预设的 Css 样式, 别名：makeRdCssVarPayload
 * @alias makeRdCssVarPayload
 */
export const mrcvp = makeRdCssVarPayload;
