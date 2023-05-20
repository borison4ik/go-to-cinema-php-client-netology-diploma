import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserPlace } from '../../models/IServerResponce';

interface SelectedClientPlacesInitialState {
  selectedPlaces: UserPlace[];
}

const initialState: SelectedClientPlacesInitialState = {
  selectedPlaces: [],
};

export const selectedClientPlacesSlice = createSlice({
  name: 'selectedClientPlacesSlice',
  initialState,
  reducers: {
    add(state, action: PayloadAction<UserPlace>) {
      if (state.selectedPlaces.every((p) => p.id !== action.payload.id)) {
        state.selectedPlaces.push(action.payload);
      }
    },
    remove(state, action: PayloadAction<UserPlace>) {
      state.selectedPlaces = state.selectedPlaces.filter((place) => place.id !== action.payload.id);
    },
    reset(state) {
      state.selectedPlaces = [];
    },
  },
});

export default selectedClientPlacesSlice.reducer;
