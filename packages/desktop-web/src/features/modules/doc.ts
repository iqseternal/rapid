import type { PayloadAction, ThunkDispatch, Action, ActionReducerMapBuilder, AsyncThunk, ThunkAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk, isPlain } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const initState = {
  isWork: false
}

export type DocStore = typeof initState;

export const docSlice = createSlice({
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
