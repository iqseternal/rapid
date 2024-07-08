import type { ComponentType, FC } from 'react';
import { useEffect, useReducer, lazy, useState, useRef } from 'react';
import { Outlet, Navigate, useLocation, Route, useOutlet } from 'react-router-dom';
import { rapidRoute } from './modules';
import { makeRoute } from './utils';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useFadeIn } from '@/hooks';

export * from './modules';

export const notFoundRoute = makeRoute({
  name: 'NotFound',
  path: '*',
  component: lazy(() => import('@components/NotFound'))
});

export const notRoleRoute = makeRoute({
  name: 'NotRole',
  path: '/403',
  component: lazy(() => import('@components/NotRole'))
});

export const loginRoute = makeRoute({
  name: 'LoginRoute',
  path: '/login',
  component: lazy(() => import('@pages/index/views/Login'))
})

export const registerRoute = makeRoute({
  name: 'Register',
  path: '/register',
  component: lazy(() => import('@pages/index/views/Register'))
})


const L = () => {


  const location = useLocation();

  const currentOutlet = useOutlet();

  return <>
    <SwitchTransition mode='out-in'>
      <CSSTransition
        key={location.pathname}
        appear
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        classNames={'fade'}

      >
        {/* <div className='container'> */}
          {currentOutlet}
        {/* </div> */}
      </CSSTransition>
    </SwitchTransition>
  </>
}

export const rootRoute = makeRoute({
  name: 'Root',
  path: '/', redirect: 'login',
  component: L,
  children: [
    rapidRoute, loginRoute, registerRoute,

    notFoundRoute, notRoleRoute
  ]
});

export const routes = [
  rootRoute,

  // rapidRoute, loginRoute, registerRoute,

  // notFoundRoute, notRoleRoute
];
