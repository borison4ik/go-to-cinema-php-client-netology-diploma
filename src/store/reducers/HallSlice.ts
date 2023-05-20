import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Hall } from '../../models/IServerResponce';
import { fechAddHall, fechInitSate, fechDeleteHall, fechUpdateHall } from './ActionCreators';

interface HallInitialState {
  halls: { [key: Hall['id']]: Hall };
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
}

const initialState: HallInitialState = {
  halls: {},
  isLoading: false,
  isSending: false,
  error: null,
};

export const hallSlice = createSlice({
  name: 'halls',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fechInitSate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fechInitSate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.halls = action.payload.halls;
        state.error = null;
      })
      .addCase(fechAddHall.pending, (state) => {
        state.isSending = true;
      })
      .addCase(fechAddHall.fulfilled, (state, action) => {
        state.halls[action.payload.id] = action.payload;
        state.isSending = false;
      })
      .addCase(fechDeleteHall.pending, (state) => {
        state.isSending = true;
      })
      .addCase(fechDeleteHall.fulfilled, (state, action) => {
        delete state.halls[action.payload.id];
        state.isSending = false;
        state.error = null;
      })
      .addCase(fechUpdateHall.pending, (state) => {
        state.isSending = true;
      })
      .addCase(fechUpdateHall.fulfilled, (state, action) => {
        state.isSending = false;
        state.error = null;
        state.halls[action.payload.id] = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default hallSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
