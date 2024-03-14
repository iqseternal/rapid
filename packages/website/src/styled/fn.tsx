
import type { Styled } from 'styled-components/dist/constructors/constructWithOptions';
import type { IStyledComponent, SupportedHTMLElements, RuleSet } from 'styled-components';
import styled, { css, isStyledComponent } from 'styled-components';

/**
 * 合并多个 styled 的样式, 形成新的 styled 组件
 * @param args
 * @returns
 */

export function combinationStyled<T extends ReturnType<typeof styled[K]>, K extends SupportedHTMLElements = 'div'>(componentType?: K, ...args: (RuleSet | ReturnType<typeof styled[SupportedHTMLElements]>)[]): T;

export function combinationStyled<T extends ReturnType<typeof styled[K]>, K extends SupportedHTMLElements = 'div'>(...args: (RuleSet | ReturnType<typeof styled[SupportedHTMLElements]>)[]): T;

export function combinationStyled<T extends ReturnType<typeof styled[K]>, K extends SupportedHTMLElements = 'div'>(componentType?: K | T, ...args: (RuleSet | ReturnType<typeof styled[SupportedHTMLElements]>)[]): T {
  let tag = 'div';
  let isDiy = false;
  if (typeof componentType === 'string') {
    tag = componentType;
    isDiy = true;
  }
  else tag = (componentType)?.target as string;
  const Component = styled[tag]``;

  function addStyle(...cssStyle: (string | RuleSet)[]) {
    (Component as any).componentStyle.rules.push(...cssStyle);
  }

  function conbination(cpt: ReturnType<typeof styled[SupportedHTMLElements]>) {
    addStyle(...(cpt as any).componentStyle.rules);
  }

  if (!isDiy) conbination(componentType as T);

  args.forEach(arg => {
    if (isStyledComponent(arg)) conbination(arg);
    else addStyle(arg);
  });

  return Component;
}
