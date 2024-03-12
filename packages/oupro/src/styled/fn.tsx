
import type { StyledComponent, FlattenSimpleInterpolation } from 'styled-components';
import styled, { css, isStyledComponent } from 'styled-components';

/**
 * 合并多个 styled 的样式, 形成新的 styled 组件
 * @param args
 * @returns
 */

export function combinationStyled<T extends StyledComponent<K, any>, K extends keyof HTMLElementTagNameMap = 'div'>(componentType?: K, ...args: (FlattenSimpleInterpolation | T)[]): T;

export function combinationStyled<T extends StyledComponent<K, any>, K extends keyof HTMLElementTagNameMap = 'div'>(...args: (FlattenSimpleInterpolation | T)[]): T;

export function combinationStyled<T extends StyledComponent<K, any>, K extends keyof HTMLElementTagNameMap>(componentType?: K | T, ...args: (FlattenSimpleInterpolation | T)[]): T {
  let tag = 'div';
  let isDiy = false;
  if (typeof componentType === 'string') {
    tag = componentType;
    isDiy = true;
  }
  else tag = (componentType as any).target as string;
  const Component = styled[tag]``;

  function addStyle(...cssStyle: (string | FlattenSimpleInterpolation)[]) {
    (Component as any).componentStyle.rules.push(...cssStyle);
  }
  function conbination(cpt: T) {
    addStyle(...(cpt as any).componentStyle.rules);
  }

  if (!isDiy) conbination(componentType as T);

  args.forEach(arg => {
    if (isStyledComponent(arg)) conbination(arg);
    else addStyle(arg);
  });

  return Component;
}
