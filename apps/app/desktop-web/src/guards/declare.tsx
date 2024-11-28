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
  function guard<HFC extends ReactComponent>(Component: HFC): ReturnType<GFN>;

  function guard<HArgs extends Parameters<GFC>>(...args: HArgs): ReactElement;

  function guard<HT extends [ReactComponent] | Parameters<GFC>>(...args: HT): ReturnType<GFN> | ReactElement {
    const [Component, ...restArgs] = args;

    if (isRawObject(Component) && ((Component as { children: ReactNode }).children)) {
      const Gfc = fc as unknown as FC<any>;
      return <Gfc {...Component} {...restArgs} />;
    }

    if (isReactComponent<ReactComponent>(Component)) {
      return fn(Component) as unknown as ReturnType<GFN>;
    }

    throw new Error(`heavyDutyGuard: 参数错误`);
  }

  return guard;
}
