import type { ReactNode, RefObject, ComponentPropsWithRef } from 'react';
import type { IStyledComponent, IStyledComponentFactory, PolymorphicComponent, SupportedHTMLElements, RuleSet, WebTarget, Styled, StyleFunction, StyleSheetManager, StyledInstance, StyledObject } from 'styled-components';
import styled, { css, isStyledComponent } from 'styled-components';

/**
 * 合并多个 styled 的样式, 形成新的 styled 组件
 * @returns
 */
export function combinationStyled<Target extends SupportedHTMLElements, TInstance extends IStyledComponent<'web', ComponentPropsWithRef<Target>>>(componentType: Target, ...args: (RuleSet | TInstance)[]): TInstance;

/**
 * 合并多个 styled 的样式, 形成新的 styled 组件
 */
export function combinationStyled<Target extends SupportedHTMLElements, TInstance extends IStyledComponent<'web', ComponentPropsWithRef<Target>>>(...args: [TInstance, ...(RuleSet | TInstance)[]]): TInstance;

export function combinationStyled<Target extends SupportedHTMLElements, TInstance extends IStyledComponent<'web', ComponentPropsWithRef<Target>>>(componentType: Target | TInstance, ...args: (RuleSet | TInstance)[]): TInstance {
  const tag: SupportedHTMLElements = (typeof componentType === 'string') ? componentType : (componentType as any).target;
  const Component = styled[tag as 'div']``;

  const combinationStyle = (...cssStyle: (string | RuleSet)[]) => Component.componentStyle.rules.push(...cssStyle);

  const combination = (cpt: TInstance) => combinationStyle(cpt.componentStyle.rules as (RuleSet)[]);

  if (typeof componentType !== 'string') combination(componentType);

  args.forEach(arg => {
    if (isStyledComponent(arg)) combination(arg);
    else combinationStyle(arg);
  })

  return Component as unknown as TInstance;
}
