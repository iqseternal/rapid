import { SKin } from './declare';
import { cssVariablesPayloadSheet } from './payload';

type CssVariablesPayloadSheetType = typeof cssVariablesPayloadSheet;

export namespace RdSKin {
  /**
   * 记录一个 style 标签, 防止主题变量呗重复创建 append 到 head 中
   * */
  const runtimeContext = {
    styleTag: void 0 as (undefined | HTMLStyleElement)
  }

  /**
   * 创建的主题变量负载映射表
   */
  export type CssVariablesPayloadSheet = {
    [Key in keyof CssVariablesPayloadSheetType]:
      // 还原类型提升到更广的宽阈类型
      Omit<CssVariablesPayloadSheetType[Key], 'value'> & {
        value: (
          CssVariablesPayloadSheetType[Key]['value'] extends string
            ? string
            : (
              CssVariablesPayloadSheetType[Key]['value'] extends number
                ? number
                : CssVariablesPayloadSheetType[Key]['value']
              )
        )
      }
  };

  /**
   * 主题变量的声明表: 例如: { '--rapid-xx-xx': '#FFF' }
   * */
  export type CssVariablesDeclaration = {
    [Key in (keyof typeof cssVariablesPayloadSheet) as SKin.ExtractCssVariableFromPayload<CssVariablesPayloadSheetType[Key]>]:
      SKin.ExtractCssVariableValueFromPayload<CssVariablesPayloadSheetType[Key]> extends number
        ? number
        : string
      ;
  }

  export function toCssVariablesDeclaration(): CssVariablesDeclaration {
    const cssVariablesDeclaration = {} as Record<string, string>;
    const payloadKeys = Object.keys(cssVariablesPayloadSheet) as (keyof CssVariablesPayloadSheetType)[];

    payloadKeys.forEach(key => {
      const { variable, value } = cssVariablesPayloadSheet[key];

      cssVariablesDeclaration[variable] = value;
    })

    return cssVariablesDeclaration as unknown as CssVariablesDeclaration;
  }

  /**
   * CSS 变量引用的字符串形式
   */
  export type CssVar<Payload extends SKin.CssVariablePayload> = `var(${SKin.ExtractCssVariableFromPayload<Payload>}, ${SKin.ExtractCssVariableValueFromPayload<Payload>})`;

  /**
   * 通过预设 payload 创建 cssVar
   */
  export function toCssVar<Payload extends SKin.CssVariablePayload>(selector: (sheet: CssVariablesPayloadSheetType) => Payload): CssVar<Payload> {
    const cssVar = selector(cssVariablesPayloadSheet);
    return `var(${cssVar.variable}, ${cssVar.value})` as CssVar<Payload>;
  }

  /**
   * cssVars sheet
   */
  export type CssVarsSheet = {
    readonly [Key in keyof CssVariablesPayloadSheetType]: CssVar<CssVariablesPayloadSheetType[Key]>;
  }

  /**
   * 通过预设创建 cssVars sheet
   */
  export function toCssVars(): CssVarsSheet {
    const cssVars = {} as CssVarsSheet;
    for (const key in cssVariablesPayloadSheet) cssVars[key] = toCssVar((sheet) => sheet[key]);
    return cssVars;
  }

  /**
   * 安装
   */
  export const install = (declaration: CssVariablesDeclaration) => {
    // 移除已经创建的 style 标签
    if (runtimeContext.styleTag) runtimeContext.styleTag.remove();

    // 创建新的
    const style = document.createElement('style');

    // 创建 css 变量定义
    let css = ':root {';
    for (const [key, value] of Object.entries(declaration)) css += `${key}: ${value};`;
    css += '}';

    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    // 记录 style 标签, 供下一次的替换, 因为有主题插件脚本的介入
    runtimeContext.styleTag = style;
  }

  /**
   * 卸载
   */
  export const uninstall = () => {
    if (runtimeContext.styleTag)  {
      runtimeContext.styleTag.remove();
      runtimeContext.styleTag = void 0; // 置空, 防止多次 remove
    }
  }
}

export const cssVars = RdSKin.toCssVars();


