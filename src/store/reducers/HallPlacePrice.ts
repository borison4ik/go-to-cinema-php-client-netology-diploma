import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HallPlaceTypePrice } from '../../models/IServerResponce';
import { fechAdminPanel, fechUpdateHallPrice } from './ActionCreators';

interface HallInitialState {
  hallPlaceTypePrices: { [key: HallPlaceTypePrice['id']]: HallPlaceTypePrice };
  isSending: boolean;
  error: string | null;
}

const initialState: HallInitialState = {
  hallPlaceTypePrices: {},
  isSending: false,
  error: null,
};

export const hallPLacePrice = createSlice({
  name: 'hallPLacePrice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fechAdminPanel.fulfilled, (state, action) => {
        state.hallPlaceTypePrices = action.payload.hallPlaceTypePrices;
      })
      .addCase(fechUpdateHallPrice.pending, (state) => {
        state.isSending = true;
      })
      .addCase(fechUpdateHallPrice.fulfilled, (state, action) => {
        state.hallPlaceTypePrices = action.payload;
        state.isSending = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isSending = false;
        state.error = action.payload;
      });
  },
});

export default hallPLacePrice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
