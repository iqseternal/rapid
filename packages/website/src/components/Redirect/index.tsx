
import type { FC } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

/**
 * 重定向组件, 重定向之后, 还能使用 element 作为布局组件
 * @param param0
 * @returns
 */
export default function Redirect({ path = '/', to = '', element = <Outlet /> as (JSX.Element | FC) }) {
  const location = useLocation();
  if (location.pathname === path) return <Navigate to={to}></Navigate>;

  if (typeof element === 'function') {
    const Element = element;

    return <Element />;
  }

  return element;
}

