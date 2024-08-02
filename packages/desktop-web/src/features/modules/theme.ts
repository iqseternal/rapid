import { loginReq } from '@/api';
import { toPicket } from '@rapid/libs/common';
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

export const fetchUser = createAsyncThunk('fetch/user', async (payload: Parameters<typeof loginReq>[0], { dispatch }) => {
  const [loginErr, loginRes] = await toPicket(loginReq(payload));
  if (loginErr) {
    return;
  }

  dispatch(themeSlice.actions.setLayout(false));
});
