import type { FC, LazyExoticComponent, MemoExoticComponent, ReactElement } from 'react';
import { isValidElement, useMemo, memo } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

/**
 * 重定向组件的 props
 */
export interface RedirectProps {
  /**
   * match: 当 pathname 满足 from 条件, 就会发生重定向, 重定向到 to 页面, 并且当前页面返回 element.
   */
  readonly from: string | RegExp;

  /**
   * to
   */
  readonly to: string;

  /**
   * 展示元素
   */
  readonly element: FC<any> | ReactElement | MemoExoticComponent<any> | LazyExoticComponent<any>;
}

/**
 * 重定向组件, 重定向之后, 还能使用 element 作为布局组件, 当页面路径满足 from 规则的时候, 就会被重定向到 to
 *
 * @example
 *
 * const Layout: FC<any> = () => {
 *   return <Outlet />
 * }
 * <Redirect from={'/'} to={'/404'} element={Layout}>
 *
 * @example
 *
 * const Layout: FC<any> = () => {
 *   return <Outlet />
 * }
 * <Redirect from={/^\/$/} to={'/404'} element={Layout}>
 */
export const Redirect = memo((props: RedirectProps) => {
  const { from, to, element = Outlet } = props;

  const fromRoutePath = from;
  const toRoutePath = to;

  const location = useLocation();

  const needRedirect = (typeof fromRoutePath === 'string') ? location.pathname === fromRoutePath : fromRoutePath.test(location.pathname);

  /**
   * 如果当前需要重定向, 那么渲染 Navigate 组件, 重定向到指定路由
   */
  const NavigateElement = useMemo(
    () => {

      return (
        <Navigate
          to={toRoutePath}
        />
      )
    },
    [
      toRoutePath
    ]
  );

  /**
   * 如果当前不满足 from 规则, 那么展示 element 组件
   */
  const LayoutElement = useMemo(
    () => {
      if (isValidElement(element)) return element;

      const Element = element as FC;
      return <Element />;
    },
    [
      element
    ]
  );

  return (
    needRedirect ? NavigateElement : LayoutElement
  );
})

export type RedirectType = typeof Redirect;

export default Redirect;
