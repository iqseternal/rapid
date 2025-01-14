import { cssVarsSheet } from './payload';
import { cssRoot } from '@rapid/libs-web/common';
import { isRawObject, isFunction } from '@rapid/libs';

export { cssVarsSheet } from './payload';

/**
 * 创建的主题变量映射表
 * */
export type CssVarsSheet = typeof cssVarsSheet;

/**
 * 主题变量的声明表: 例如: { '--rapid-xx-xx': '#FFF' }
 * */
export type CssVarsDeclaration = {
  [Key in (keyof CssVarsSheet) as CssVarsSheet[Key]['varName']]: CssVarsSheet[Key]['varValue'];
}

const runtimeContext = {
  /**
   * 记录一个 style 标签, 防止主题变量呗重复创建 append 到 head 中
   * */
  styleTag: void 0 as (undefined | HTMLStyleElement)
}

/**
 * 创建一个可用的 Css 变量调用, 常用于 TSX 中内嵌样式的使用
 *
 * ```tsx
 * import { makeCssVar, cssVarsSheet } from '@/themes';
 *
 * <FullSizeWidth
 *   style={{
 *     color: makeCssVar(cssVarsSheet.primaryTextColor),
 *   }}
 * ></FullSizeWidth>
 *
 * ```
 *
 */
export function makeCssVar<R extends keyof CssVarsSheet, CssVar extends (CssVarsSheet)[R]>(r: CssVar): `var(${CssVar['varName']}, ${CssVar['varValue']})`;

/**
 * 创建一个可用的 Css 变量调用, 常用于 TSX 中内嵌样式的使用
 *
 * ```tsx
 * import { makeCssVar } from '@/themes';
 *
 * <FullSizeWidth
 *   style={{
 *     color: makeCssVar(vars => vars.primaryTextColor),
 *   }}
 * ></FullSizeWidth>
 *
 * ```
 *
 */
export function makeCssVar<R extends keyof CssVarsSheet, CssVar extends (CssVarsSheet)[R]>(getter: (cssVars: CssVarsSheet) => CssVar): `var(${CssVar['varName']}, ${CssVar['varValue']})`;

export function makeCssVar<R extends keyof CssVarsSheet, CssVar extends (CssVarsSheet)[R]>(rc: CssVar | ((cssVars: CssVarsSheet) => CssVar)): `var(${CssVar['varName']}, ${CssVar['varValue']})` {
  if (isFunction(rc)) {
    const cssVar = rc(cssVarsSheet);
    return `var(${cssVar.varName}, ${cssVar.varValue})` as `var(${CssVar['varName']}, ${CssVar['varValue']})`;
  }

  return `var(${rc.varName}, ${rc.varValue})` as `var(${CssVar['varName']}, ${CssVar['varValue']})`;
}

/**
 * 创建一个主题 Css 变量的声明对象
 * {
 *   '--rapid-xx': '#FFF'
 * }
 *
 */
export const makeCssVarsDeclaration = (): CssVarsDeclaration => {
  const varsDeclaration = {} as Record<string, string>;

  (Object.keys(cssVarsSheet) as (keyof CssVarsSheet)[]).forEach(cssKey => {
    let { varName, varValue } = cssVarsSheet[cssKey];
    // 如果 document 中已经含有了这个变量, 那么这个 value 就为 document 中的值, 而不再是 初始化 的值
    // 因为这个变量可能被嵌入的主题插件所更改
    if (runtimeContext.styleTag) varValue = getComputedStyle(cssRoot)[cssKey];
    varsDeclaration[varName] = varValue;
  })

  return varsDeclaration as unknown as CssVarsDeclaration;
}

/**
 * 安装主题中的 css 变量
 */
export const installThemeCssVars = <Declaration extends CssVarsDeclaration>(declaration: Declaration) => {
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

export const cssVars = (() => {
  const vars: {
    readonly [Key in keyof typeof cssVarsSheet]: `var(${typeof cssVarsSheet[Key]['varName']}, ${typeof cssVarsSheet[Key]['varValue']})`;
  } = {} as any;

  for (const key in cssVarsSheet) {
    vars[key] = makeCssVar(() => cssVarsSheet[key]);
  }

  return vars;
})();

