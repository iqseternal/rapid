import type { PayloadAction, ThunkDispatch, Action, ActionReducerMapBuilder, AsyncThunk, ThunkAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk, isPlain } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export interface DocStore {
  isWork: boolean;
}

const initState: DocStore = {
  isWork: false
}

export const docSlice = createSlice<DocStore, SliceCaseReducers<DocStore>>({
  name: 'User',
  initialState: initState,
  reducers: {
    setWorkStatus(state, { payload }: PayloadAction<boolean>) {
      state.isWork = payload;
    }
  }
});

export const { setWorkStatus } = docSlice.actions;

export default docSlice;
