import type { CONFIG } from '@rapid/config/constants';

export namespace SKin {
  /**
   * CSS 变量的名称
   */
  export type CssVariable = `--${Lowercase<typeof CONFIG['PROJECT']>}-${string}`;

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
    readonly value: Value;

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
  export type CssVariablePayloadSheet<PayloadKey extends CssVariable> = {
    [Key in PayloadKey]: CssVariablePayload<PayloadKey>;
  };
}


