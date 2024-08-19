export const cssRoot = document.querySelector(':root') as HTMLElement;

type CSSStyleDeclarationAndVars = CSSStyleDeclaration & Record<string, any>;


export const setCssVar = <T extends keyof CSSStyleDeclarationAndVars, Dom extends HTMLElement = HTMLElement>(node: Dom, cssVar: T, value: string, isImportant?: boolean) =>
  node.style.setProperty(cssVar as string, value, isImportant ? '!important' : void 0);

export const getCssVar = <T extends keyof CSSStyleDeclarationAndVars>(node: HTMLElement, cssVar: T) => getComputedStyle(node).getPropertyValue(cssVar as string);

export const setCssVars = <Dom extends HTMLElement>(node: Dom, properties: Partial<CSSStyleDeclarationAndVars>, isImportant?: boolean) =>
  Object.keys(properties).forEach((prop) => setCssVar(node, prop as keyof CSSStyleDeclarationAndVars, properties[prop], isImportant));


export const setCssVarForRoot = <T extends keyof CSSStyleDeclarationAndVars>(cssVar: T, value: string) => setCssVar<T>(cssRoot, cssVar, value);

export const getCssVarForRoot = <T extends keyof CSSStyleDeclarationAndVars>(cssVar: T) => getCssVar<T>(cssRoot, cssVar);

export const setCssVarsForRoot = (properties: CSSStyleDeclarationAndVars) => setCssVars(cssRoot, properties);


export const getStyleProperty = getCssVar;

export const setStyleProperty = setCssVar;

export const setStyleProperties = setCssVars;

/**
 * 找到第一个垂直滚动的父级元素
 * @param dom
 * @return
 */
export function autoGetScrollContainer<T extends HTMLElement>(dom: T): T | null {
  let currentElement: HTMLElement | null = dom;

  while (currentElement) {
    const style = window.getComputedStyle(currentElement);

    if (
      (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
      currentElement.scrollHeight > currentElement.clientHeight
    ) {
      return currentElement as T;
    }
    currentElement = currentElement.parentElement;
  }

  return null;
}

