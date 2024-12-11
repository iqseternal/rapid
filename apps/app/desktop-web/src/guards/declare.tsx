import { isObject, isRawObject } from '@rapid/libs';
import { useAuthRole } from '@/features';
import { isReactComponent, isReactFC } from '@rapid/libs-web';
import type { FC, ForwardRefExoticComponent, ReactElement, ReactNode } from 'react';
import { isValidElement } from 'react';

/**
 * 可用的 React 组件
 */
export type ReactComponent<Props extends {} = any> = ForwardRefExoticComponent<Props> | FC<Props>;

/**
 * 重载守卫, 根据传递的 FC 和 FN 返回重载函数
 */
export interface HeavyDutyGuard<GFN extends (Component: ReactComponent) => ReactComponent, GFC extends ReactComponent<{ children: ReactNode }>> {
  /**
   * 包裹 FC, 返回一个新的守卫组件
   *
   * @example
   *
   * const XXGuard = heavyDutyGuard(AuthRole, AuthRole);
   *
   * const XXComponent = XXGuard((Component) => {
   *   if (xxx) return <Component />;
   *
   *   return <></>;
   * })
   */
  <HFC extends ReactComponent>(Component: HFC): ReturnType<GFN>;

  /**
   * 包裹 ReactElement
   *
   * @example
   *
   * const XXGuard = heavyDutyGuard(AuthRole, AuthRole);
   *
   * <div>
   *  <XXGuard>
   *    <div>XXComponent</div>
   *  </XXGuard>
   * </div>
   */
  <HArgs extends Parameters<GFC>>(...args: HArgs): ReactElement;
}

/**
 * 重载守卫
 */
export const heavyDutyGuard = <
  GFN extends (Component: ReactComponent) => ReactComponent,
  GFC extends ReactComponent<{ children: ReactNode }>
>(
  fn: GFN,
  fc: GFC
): HeavyDutyGuard<GFN, GFC> => {

  /**
   * 直接包裹组件, 那么返回一个新的组件, 用于避免组件的重新渲染
   */
  function guard<HFC extends ReactComponent>(Component: HFC): ReturnType<GFN>;

  /**
   * 将守卫作为组件, 那么实际情况侠避免组件 children 的渲染就可以
   */
  function guard<HArgs extends Parameters<GFC>>(...args: HArgs): ReactElement;

  function guard<HT extends [ReactComponent] | Parameters<GFC>>(...args: HT): ReturnType<GFN> | ReactElement {
    const [Component, ...restArgs] = args;

    /**
     * 如果目标是一个对象, 并且含有 children 属性, 那么会将其视为是一个 props, 即满足第二个重载
     */
    if (isRawObject(Component) && ((Component as { children: ReactNode }).children)) {
      const Gfc = fc as unknown as FC<any>;
      return <Gfc {...Component} {...restArgs} />;
    }

    /**
     * 如果是一个合格的 Element, 那么满足第一个重载
     */
    if (isReactComponent<ReactComponent>(Component)) {
      return fn(Component) as unknown as ReturnType<GFN>;
    }

    throw new Error(`heavyDutyGuard: 参数错误`);
  }

  return guard;
}
