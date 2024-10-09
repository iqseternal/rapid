import { configureStore } from '@reduxjs/toolkit';

import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import reduxThunk from 'redux-thunk';

import userSlice from './modules/user';

export * from './modules/user';

const rootStore = configureStore({
  reducer: {
    user: userSlice.reducer
  },
  middleware: [
    reduxThunk
  ]
});

export type RootStoreType = ReturnType<typeof rootStore.getState>;
export type RootStoreDispatch = typeof rootStore.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootStoreType> = useSelector;
export const useAppDispatch: typeof useDispatch<RootStoreDispatch> = useDispatch;

export default rootStore;
