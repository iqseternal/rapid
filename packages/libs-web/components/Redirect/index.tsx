import { isString } from '@rapid/libs';
import type { FC, LazyExoticComponent, MemoExoticComponent, ReactElement } from 'react';
import { isValidElement, useLayoutEffect, useMemo, memo } from 'react';
import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useNormalState, useShallowReactive } from '../../hooks';

/**
 * 重定向组件的 props
 */
export interface RedirectProps {
  /**
   * match: 当 pathname 满足 from 条件, 就会发生重定向, 重定向到 to 页面, 并且当前页面返回 element.
   */
  from: string | RegExp;

  /**
   * to
   */
  to: string;

  /**
   * 展示元素
   */
  element: FC<any> | ReactElement | MemoExoticComponent<any> | LazyExoticComponent<any>;
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

  const location = useLocation();

  const [normalState] = useShallowReactive({
    isMatched: false
  })

  useLayoutEffect(() => {
    if (isString(from)) {
      normalState.isMatched = location.pathname === from;
      return;
    }

    normalState.isMatched = from.test(location.pathname);
  }, [location.pathname, from, to]);

  return useMemo(() => {
    if (normalState.isMatched) return <Navigate to={to}/>;
    if (isValidElement(element)) return element;

    const Element = element as FC;
    return <Element />;
  }, [normalState.isMatched, element]);
})

export type RedirectType = typeof Redirect;

export default Redirect;
