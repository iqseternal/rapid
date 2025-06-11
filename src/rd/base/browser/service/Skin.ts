import { isUndefined } from '@suey/pkg-utils';

/**
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
 * 主题变量的声明表: 例如: { '--rapid-xx-xx': '#FFF' }
 */
export type CssVariablesDeclaration<PayloadSheet extends CssVariablePayloadSheet> = {
  [Key in (keyof PayloadSheet) as ExtractCssVariableFromPayload<PayloadSheet[Key]>]: (
    ExtractCssVariableValueFromPayload<PayloadSheet[Key]> extends number ? number : string
  );
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

export class Skin<PayloadSheet extends CssVariablePayloadSheet> {
  private readonly runtimeContext = {
    styleTag: void 0 as (undefined | HTMLStyleElement)
  }

  public constructor(
    public readonly cssVariablesPayloadSheet: PayloadSheet
  ) { }

  /**
   * 生成当前皮肤的 CSS 变量声明
   */
  public toCssVariablesDeclaration(): CssVariablesDeclaration<PayloadSheet> {
    const cssVariablesDeclaration = {} as Record<string, string>;
    const payloadKeys = Object.keys(this.cssVariablesPayloadSheet) as (keyof PayloadSheet)[];

    payloadKeys.forEach(key => {
      const { variable, value } = this.cssVariablesPayloadSheet[key];

      cssVariablesDeclaration[variable] = value;
    });

    return cssVariablesDeclaration as unknown as CssVariablesDeclaration<PayloadSheet>;
  }

  /**
   * 将 CssVariablePayload 转换为 CSS 变量字符串
   * @param selector 用于选择 CssVariablePayload 的函数
   */
  public toCssVar<Payload extends CssVariablePayload>(selector: (sheet: CssVariablePayloadSheet) => Payload): CssVar<Payload> {
    const cssVar = selector(this.cssVariablesPayloadSheet);
    return `var(${cssVar.variable}, ${cssVar.value})` as CssVar<Payload>;
  }

  /**
   * 将当前皮肤的 CSS 变量转换为 CssVars 类型
   * @returns CssVars<PayloadSheet>
   */
  public toCssVars(): CssVars<PayloadSheet> {
    const cssVars = {} as CssVars<PayloadSheet>;
    for (const cssKey in this.cssVariablesPayloadSheet) {
      Reflect.set(cssVars, cssKey, this.toCssVar((sheet) => sheet[cssKey]));
    }
    return cssVars;
  }

  /**
   * 安装当前皮肤，将 CSS 变量注入到页面中
   */
  public install() {
    // 移除已经创建的 style 标签
    if (this.runtimeContext.styleTag) this.runtimeContext.styleTag.remove();

    // 创建新的 style 标签
    const styleTag = document.createElement('style');

    // 获取 CSS 变量声明
    const cssVariablesDeclaration = this.toCssVariablesDeclaration();

    const cssVariablesString = Object.entries(cssVariablesDeclaration)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n');

    // 设置样式内容
    styleTag.innerHTML = `:root {\n${cssVariablesString}\n}`;

    // 将样式标签添加到文档头部
    document.head.appendChild(styleTag);

    // 记录 style 标签
    this.runtimeContext.styleTag = styleTag;
  }

  /**
   * 卸载当前皮肤，移除 CSS 变量样式
   */
  public uninstall() {
    if (this.runtimeContext.styleTag) {
      this.runtimeContext.styleTag.remove();
      this.runtimeContext.styleTag = void 0; // 置空, 防止多次 remove
    }
  }
}
