import { configureStore } from '@reduxjs/toolkit';

import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import reduxThunk from 'redux-thunk';

import themeSlice from './modules/theme';
import userSlice from './modules/user';
import docSlice from './modules/doc';

export * from './modules/theme';
export * from './modules/user';
export * from './modules/doc';

const appStore = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    user: userSlice.reducer,
    doc: docSlice.reducer
  },
  middleware: [
    reduxThunk
  ]
});

export type AppStoreType = ReturnType<typeof appStore.getState>;
export type AppStoreDispatch = typeof appStore.dispatch;

/**
 * 附带泛型的 useSelector
 */
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector;
/**
 * 附带泛型的 useDispatch
 */
export const useAppDispatch: typeof useDispatch<AppStoreDispatch> = useDispatch;

export default appStore;
