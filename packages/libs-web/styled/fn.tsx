import type { IStyledComponent, IStyledComponentFactory, SupportedHTMLElements, RuleSet, Styled, StyledInstance, LibraryStyled, WebTarget } from 'styled-components';
import styled, { css, isStyledComponent } from 'styled-components';

export type StyledComponentSheet = Pick<Styled, SupportedHTMLElements>;

/**
 * 合并多个 styled 的样式, 形成新的 styled 组件
 * @returns
 */
export function combinationStyled<Target extends SupportedHTMLElements, TInstance extends IStyledComponent<'web'>>(componentType: Target, ...args: (RuleSet | TInstance)[]): TInstance;

/**
 * 合并多个 styled 的样式, 形成新的 styled 组件
 */
export function combinationStyled<Target extends SupportedHTMLElements, TInstance extends IStyledComponent<'web'>>(...args: [TInstance, ...(RuleSet | TInstance)[]]): TInstance;

export function combinationStyled<Target extends SupportedHTMLElements, TInstance extends IStyledComponent<'web'>>(componentType: SupportedHTMLElements | TInstance, ...args: (RuleSet | TInstance)[]): TInstance {
  const tag: SupportedHTMLElements = (typeof componentType === 'string') ? componentType : 'div';
  const Component = styled[tag as 'div']``;

  console.log(Component);
  const combinationStyle = (...cssStyle: (string | RuleSet)[]) => Component.componentStyle.rules.push(...cssStyle);

  const combination = (cpt: TInstance) => combinationStyle(cpt.componentStyle.rules as (RuleSet)[]);

  if (typeof componentType !== 'string') combination(componentType);

  args.forEach(arg => {
    if (isStyledComponent(arg)) combination(arg);
    else combinationStyle(arg);
  })

  return Component;
}
