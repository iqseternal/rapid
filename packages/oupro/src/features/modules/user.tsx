
import type { PayloadAction, ThunkDispatch, Action } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk, isPlain } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    value: 0,
    count: 0
  },
  reducers: {
    add: (state) => { state.count ++ },
    sub: (state) => { state.count -- },
    setValue: (state, { payload }: PayloadAction<number>) => {
      state.value = payload;
    }
  }
});

export const { add, sub, setValue } = userSlice.actions;

export default userSlice.reducer;
