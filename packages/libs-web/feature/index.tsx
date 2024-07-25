import type { PayloadAction, ThunkDispatch, Action, ActionReducerMapBuilder, AsyncThunk, ThunkAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk, isPlain } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export type SliceBuilderSetup<Store extends {}> = (builder: ActionReducerMapBuilder<Store>) => void;

/**
 * 创建一个 feature action
 * @returns
 */
export const makeFeatureAction = <
  Store extends {},
  Action extends AsyncThunk<any, any, any>
>(createAction: () => [Action, SliceBuilderSetup<Store>?]) => {

  return createAction();
}

export const sliceCallBuilders = <Store extends {}>(
  builder: ActionReducerMapBuilder<Store>,
  builderFns: (SliceBuilderSetup<Store> | undefined)[]
) => {
  builderFns.forEach(builderFn => {
    if (builderFn) builderFn(builder);
  })
}
