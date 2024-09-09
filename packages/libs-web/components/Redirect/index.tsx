import { isString } from '@suey/pkg-utils';
import { useShallowReactive } from '../../hooks';
import type { FC, ReactNode, ReactPropTypes, ReactElement } from 'react';
import { isValidElement, useLayoutEffect, useMemo } from 'react';
import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';

export interface RedirectProps {

  from: string | RegExp;

  to: string;

  element: FC<any> | ReactElement;
}

/**
 * 重定向组件, 重定向之后, 还能使用 element 作为布局组件
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
export default function Redirect(props: RedirectProps) {
  const { from, to, element = Outlet } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const [state] = useShallowReactive({
    isMatched: false
  })

  useLayoutEffect(() => {
    if (from instanceof RegExp) state.isMatched = from.test(location.pathname);
    else if (isString(from)) state.isMatched = location.pathname === from;
  }, [location.pathname, from, to]);

  const targetElement = useMemo(() => {
    if (state.isMatched) return <Navigate to={to} />

    if (isValidElement(element)) return element;

    const Element = element as FC;

    return <Element />;
  }, [state.isMatched, element]);

  return targetElement;
}

