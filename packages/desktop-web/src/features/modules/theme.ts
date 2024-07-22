import type { PayloadAction, ThunkDispatch, Action, ActionReducerMapBuilder, AsyncThunk, ThunkAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk, isPlain } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';


const initState = {


  workbenches: {


    
  }
}

export type Theme = typeof initState;

export const themeSlice = createSlice<Theme, SliceCaseReducers<Theme>>({
  name: 'User',
  initialState: initState,
  reducers: {

  }
});


export default themeSlice;
