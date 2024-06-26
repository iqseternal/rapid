import type { FC, ReactNode, ReactPropTypes } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

export interface RedirectProps {

  from: string;

  to: string;

  element: FC<any>;
}

/**
 * 重定向组件, 重定向之后, 还能使用 element 作为布局组件
 * @param param0
 * @returns
 */
export default function Redirect(props: RedirectProps) {
  const { from, to, element = Outlet } = props;

  const Element = element;
  const location = useLocation();


  if (location.pathname === from) return <Navigate to={to}></Navigate>;

  return <Element />;
}

