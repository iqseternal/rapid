
import type { Dispatch, ReducerAction, SetStateAction, EffectCallback, Ref, PropsWithChildren, Component, FC, ComponentFactory } from 'react';
import { useState, useEffect, useReducer, useRef, Children, StrictMode } from 'react';
import type { PathRouteProps, RouteProps} from 'react-router-dom';
import { Route, BrowserRouter, HashRouter, Routes, useNavigate, Navigate, useNavigation, useLocation, Outlet } from 'react-router-dom';
import { AppAdapter } from '@/styled';
import {  } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { isUnDef } from '@suey/pkg-utils';
import { useRefresh } from '@/hooks';

import ReactDOM from 'react-dom/client';
import RouterContext from './router';
import store from '@/features';

import '@scss/index.scss';

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <RouterContext />
      </HashRouter>
    </Provider>
  )
}

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <StrictMode>
    <App />
  </StrictMode>
);
