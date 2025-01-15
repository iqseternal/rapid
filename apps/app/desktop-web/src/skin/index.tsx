import { SKin } from './declare';
import { cssVariablesSheet } from './payload';

export namespace RdSKin {
  /**
   * 记录一个 style 标签, 防止主题变量呗重复创建 append 到 head 中
   * */
  const runtimeContext = {
    styleTag: void 0 as (undefined | HTMLStyleElement)
  }

  /**
   * 创建的主题变量映射表
   * */
  export type CssVariablesSheet = typeof cssVariablesSheet;

  /**
   * 主题变量的声明表: 例如: { '--rapid-xx-xx': '#FFF' }
   * */
  export type CssVariablesDeclaration = {
    [Key in (keyof CssVariablesSheet) as SKin.ExtractCssVariableFromPayload<CssVariablesSheet[Key]>]: SKin.ExtractCssVariableValueFromPayload<CssVariablesSheet[Key]>;
  }

  export function toCssVariablesDeclaration(): CssVariablesDeclaration {
    const cssVariablesDeclaration = {} as Record<string, string>;
    const payloadKeys = Object.keys(cssVariablesSheet) as (keyof CssVariablesSheet)[];

    payloadKeys.forEach(key => {
      const { variable, value } = cssVariablesSheet[key];

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
  export function toCssVar<Payload extends SKin.CssVariablePayload>(selector: (sheet: CssVariablesSheet) => Payload): CssVar<Payload> {
    const cssVar = selector(cssVariablesSheet);
    return `var(${cssVar.variable}, ${cssVar.value})` as CssVar<Payload>;
  }

  /**
   * cssVars sheet
   */
  export type CssVarsSheet = {
    [Key in keyof CssVariablesSheet]: CssVar<CssVariablesSheet[Key]>;
  }

  /**
   * 通过预设创建 cssVars sheet
   */
  export function toCssVars(): CssVarsSheet {
    const cssVars = {} as CssVarsSheet;
    for (const key in cssVariablesSheet) cssVars[key] = toCssVar((sheet) => sheet[key]);
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
}

export const cssVars = RdSKin.toCssVars();


