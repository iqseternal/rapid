import type { Dispatch, ReducerAction, SetStateAction, EffectCallback, Ref, PropsWithChildren, ReactComponentElement, Component, FC, ComponentFactory } from 'react';
import { useState, useEffect, useReducer, useRef, Children } from 'react';
import type { PathRouteProps, RouteProps} from 'react-router-dom';
import { Route, BrowserRouter, Routes, useNavigate, Navigate, useNavigation, useLocation, Outlet } from 'react-router-dom';
import {  } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { isUnDef } from '@suey/pkg-utils';
import { useRefresh } from './hooks';

import RouterContext from './router';
import store from '@/features';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterContext />
      </BrowserRouter>
    </Provider>
  )
}

