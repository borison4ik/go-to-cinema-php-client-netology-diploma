import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilmSession } from '../../models/IServerResponce';
import { fechAdminPanel } from './ActionCreators';

interface SessionFilmInitialState {
  filmSessions: { [key: FilmSession['id']]: FilmSession };
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
}

const initialState: SessionFilmInitialState = {
  filmSessions: {},
  isLoading: false,
  isSending: false,
  error: null,
};

export const sessionFilmSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fechAdminPanel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fechAdminPanel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filmSessions = action.payload.film_sessions;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default sessionFilmSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
