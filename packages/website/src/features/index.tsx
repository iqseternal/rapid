import { configureStore } from '@reduxjs/toolkit';

import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import reduxThunk from 'redux-thunk';

import userReducer from './modules/user';
export * from './modules/user';

const rootStore = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: [
    reduxThunk
  ]
});

export type RootStoreType = ReturnType<typeof rootStore.getState>;
export type RootStoreDispath = typeof rootStore.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootStoreType> = useSelector;
export const useAppDispath: typeof useDispatch<RootStoreDispath> = useDispatch;

export default rootStore;
