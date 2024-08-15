import { themeCssVarsSheet } from './payload';
import { cssRoot } from '@rapid/libs-web/common';

export { themeCssVarsSheet } from './payload';

/** 创建的主题变量映射表 */
export type ThemeCssVarsSheet = typeof themeCssVarsSheet;
/** 主题变量的声明表: 例如: { '--rapid-xx-xx': '#FFF' } */
export type ThemeCssVarsDeclaration = {
  [Key in (keyof ThemeCssVarsSheet) as ThemeCssVarsSheet[Key]['varName']]: ThemeCssVarsSheet[Key]['value'];
}

const runtimeContext = {
  /** 记录一个 style 标签, 防止主题变量呗重复创建 append 到 head 中 */
  styleTag: void 0 as (undefined | HTMLStyleElement)
}

/**
 * 创建一个可用的 Css 变量调用, 常用于 TSX 中内嵌样式的使用
 *
 * ```tsx
 * import { makeVar, themeCssVarsSheet } from '@/themes';
 *
 * <FullSizeWidth
 *   style={{
 *     color: makeVar(themeCssVarsSheet.primaryTextColor),
 *   }}
 * ></FullSizeWidth>
 *
 * ```
 *
 */
export const makeVar = <R extends keyof ThemeCssVarsSheet, CssVar extends (ThemeCssVarsSheet)[R]>(r: CssVar): `var(${CssVar['varName']}, ${CssVar['value']})` => {
  return `var(${r.varName})` as `var(${CssVar['varName']}, ${CssVar['value']})`;
}

/**
 * 创建一个主题 Css 变量的声明对象
 * {
 *   '--rapid-xx': '#FFF'
 * }
 *
 */
export const makeVarsDeclaration = () => {
  const varsDeclaration = {} as ThemeCssVarsDeclaration;

  (Object.keys(themeCssVarsSheet) as (keyof ThemeCssVarsSheet)[]).forEach(cssKey => {
    let { varName, value } = themeCssVarsSheet[cssKey];
    // 如果 document 中已经含有了这个变量, 那么这个 value 就为 document 中的值, 而不再是 初始化 的值
    // 因为这个变量可能被嵌入的主题插件所更改
    if (runtimeContext.styleTag) value = getComputedStyle(cssRoot)[cssKey];
    varsDeclaration[varName] = value;
  })

  return varsDeclaration;
}

/**
 * 安装主题中的 css 变量
 * @param declaration
 */
export const installThemeCssVars = <Declaration extends ThemeCssVarsDeclaration>(declaration: Declaration) => {
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
