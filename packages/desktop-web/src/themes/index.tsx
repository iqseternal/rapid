import { themeCssVarsSheet } from './payload';
import { cssRoot, setCssVars } from '@rapid/libs-web/common';

export { themeCssVarsSheet } from './payload';

export type ThemeCssVarsSheet = typeof themeCssVarsSheet;
export type ThemeCssVarsDeclaration = {
  [Key in (keyof ThemeCssVarsSheet) as ThemeCssVarsSheet[Key]['varName']]: ThemeCssVarsSheet[Key]['value'];
}

const runtimeContext = {
  styleTag: void 0 as (undefined | HTMLStyleElement)
}

export const makeVar = <R extends keyof ThemeCssVarsSheet, CssVar extends (ThemeCssVarsSheet)[R]>(r: CssVar): `var(${CssVar['varName']}, ${CssVar['value']})` => {


  return `var(${r.varName})` as `var(${CssVar['varName']}, ${CssVar['value']})`;
  // return `var(${r.varName}, ${r.value})` as `var(${CssVar['varName']}, ${CssVar['value']})`;
}

export const makeVarsDeclaration = () => {
  const varsDeclaration = {} as ThemeCssVarsDeclaration;

  (Object.keys(themeCssVarsSheet) as (keyof ThemeCssVarsSheet)[]).forEach(cssKey => {
    let { varName, value } = themeCssVarsSheet[cssKey];
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
  if (runtimeContext.styleTag) runtimeContext.styleTag.remove();

  const style = document.createElement('style');
  let css = ':root {';
  for (const [key, value] of Object.entries(declaration)) css += `${key}: ${value};`;
  css += '}';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  runtimeContext.styleTag = style;
  // setCssVars(cssRoot, declaration);
}
