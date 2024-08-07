import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

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
