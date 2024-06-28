import { configureStore } from '@reduxjs/toolkit';

import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import reduxThunk from 'redux-thunk';

import userSlice from './modules/user';

export * from './modules/user';

const appStore = configureStore({
  reducer: {
    user: userSlice.reducer
  },
  middleware: [
    reduxThunk
  ]
});

export type AppStoreType = ReturnType<typeof appStore.getState>;
export type AppStoreDispath = typeof appStore.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector;
export const useAppDispath: typeof useDispatch<AppStoreDispath> = useDispatch;

export default appStore;
