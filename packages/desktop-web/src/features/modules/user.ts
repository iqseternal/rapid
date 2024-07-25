import type { PayloadAction, ThunkDispatch, Action, ActionReducerMapBuilder, AsyncThunk, ThunkAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk, isPlain } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export interface UserStore {
  id?: number;

  username?: string;
  nickname?: string;

  roles?: number;
  isVip?: number;

  sex?: string;
  avatarUrl?: string;

  age?: number;
  qq?: string | number;
  emial?: string;
  phone?: string;
  address?: string;
}

const initState: UserStore = {

}

export const userSlice = createSlice<UserStore, SliceCaseReducers<UserStore>>({
  name: 'User',
  initialState: initState,
  reducers: {
    setUserInfo: (state, { payload }: PayloadAction<UserStore>) => {
      (Object.keys(payload) as (keyof typeof payload)[]).forEach((key) => {
        state[key] = payload[key] as any;
      })
    }
  }
});

export const { setUserInfo } = userSlice.actions;

export default userSlice;
