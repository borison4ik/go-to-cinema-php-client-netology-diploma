import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilmSession, UserPlace } from '../../models/IServerResponce';
import { fechSessionForDay } from './ActionCreators';

interface SelectedClientFilmSessionSliceInitialState {
  session: FilmSession | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SelectedClientFilmSessionSliceInitialState = {
  session: null,
  isLoading: false,
  error: null,
};

export const SelectedClientFilmSessionSlice = createSlice({
  name: 'SelectedClientFilmSessionSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fechSessionForDay.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fechSessionForDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.session = action.payload;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default SelectedClientFilmSessionSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
