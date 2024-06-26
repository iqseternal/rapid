
import type { Dispatch, ReducerAction, SetStateAction, EffectCallback, Ref, PropsWithChildren, Component, FC, ComponentFactory } from 'react';
import { useState, useEffect, useReducer, useRef, Children, StrictMode } from 'react';
import type { PathRouteProps, RouteProps} from 'react-router-dom';
import { Route, BrowserRouter, HashRouter, Routes, useNavigate, Navigate, useNavigation, useLocation, Outlet } from 'react-router-dom';
import { AppAdapter } from '@/styled';
import {  } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { isUnDef } from '@suey/pkg-utils';
import { useRefresh } from '@rapid/libs/hooks';
import { IS_DEV, IS_PROD } from '@rapid/config/constants';
import { ConfigProvider } from 'antd';

import ReactDOM, {  } from 'react-dom/client';
import RouterContext, { rootRoute } from './router';
import store from '@/features';

import '@scss/index.scss';

export default function App() {
  return (
    <ConfigProvider theme={{}}>
      <Provider store={store}>
        <HashRouter>
          <RouterContext />
        </HashRouter>
      </Provider>
    </ConfigProvider>
  )
}

const rootContainer = document.getElementById('root') as (HTMLDivElement & { _root: any });

if (IS_DEV) {
  /**
   * vite hmr 会触发二次 createRoot,
   * 所以需要再开发模式避免误报错误信息
   */
  if (!rootContainer._root) {
    rootContainer._root = ReactDOM.createRoot(rootContainer);
  }

  rootContainer._root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

if (IS_PROD) {
  ReactDOM.createRoot(rootContainer).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
