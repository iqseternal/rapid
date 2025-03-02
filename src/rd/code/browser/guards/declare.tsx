import { isObject, isRawObject } from '@rapid/libs';
import { useAuthRole } from '@/features';
import { isReactComponent, isReactFC } from '@rapid/libs-web';
import type { FC, ForwardRefExoticComponent, ReactElement, ReactNode } from 'react';
import { forwardRef, isValidElement, memo } from 'react';

/**
 * 可用的 React 组件
 */
export type ReactComponent<Props extends {} = any> = ForwardRefExoticComponent<Props> | FC<Props>;

/**
 * 重载守卫, 根据传递的 FC 和 FN 返回重载函数
 */
export interface HeavyDutyGuard<GFC extends ReactComponent<any>> {
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
  <HFC extends ReactComponent>(Component: HFC): HFC;

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
  <HArgs extends Parameters<GFC>>(...args: HArgs): ReturnType<GFC>;
}

/**
 * 重载守卫
 */
export const heavyDutyGuard = <GFC extends ReactComponent>(Component: GFC): HeavyDutyGuard<GFC> => {

  /**
   * 函数
   */
  function Guard<HFC extends ReactComponent>(Component: HFC): HFC;

  /**
   * 组件
   */
  function Guard<HArgs extends Parameters<GFC>>(...args: HArgs): ReturnType<GFC>;

  function Guard<HT extends [ReactComponent] | Parameters<GFC>>(...args: HT): ReactComponent | ReturnType<GFC> {

    const [Cpt] = args;

    if (isReactComponent<ReactComponent>(Cpt)) {
      return memo(((props: any) => {
        const F = Cpt as ReactComponent;

        return (
          <Component {...props}>
            <F />
          </Component>
        )
      })) as unknown as ReactComponent;
    }

    if (isRawObject(Cpt) && ((Cpt as { children: ReactNode }).children)) {
      return <Component {...(Cpt as Parameters<GFC>[0])} /> as ReturnType<GFC>;
    }

    throw new Error(`heavyDutyGuard: 参数错误`);
  }

  return Guard;
}
