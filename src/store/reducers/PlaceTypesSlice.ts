import { createSlice } from '@reduxjs/toolkit';
import { PlaceType } from '../../models/IServerResponce';
import { fechAdminPanel } from './ActionCreators';

interface PlaceTypesInitialState {
  place_types: { [key: PlaceType['id']]: PlaceType };
}

const initialState: PlaceTypesInitialState = {
  place_types: {},
};

export const PlaceTypesSlice = createSlice({
  name: 'PlaceTypesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fechAdminPanel.fulfilled, (state, action) => {
      state.place_types = action.payload.place_types;
    });
  },
});

export default PlaceTypesSlice.reducer;
