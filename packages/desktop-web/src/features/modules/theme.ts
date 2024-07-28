import type { PayloadAction, ThunkDispatch, Action, ActionReducerMapBuilder, AsyncThunk, ThunkAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk, isPlain } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';


const initState = {


  workbenches: {

    layout: {

      shoNavigation: true

    }
  }
}

export type Theme = typeof initState;

export const themeSlice = createSlice({
  name: 'User',
  initialState: initState,
  reducers: {
    setLayout(state, { payload }: PayloadAction<boolean>) {

      state.workbenches.layout.shoNavigation = payload;

    }
  }
});

export const { setLayout } = themeSlice.actions;

export default themeSlice;
