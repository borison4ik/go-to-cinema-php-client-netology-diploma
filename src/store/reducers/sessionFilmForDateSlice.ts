import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilmSession } from '../../models/IServerResponce';
import { fechAllSessionForDay } from './ActionCreators';

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

export const sessionFilmForDateSlice = createSlice({
  name: 'sessionFilmForDateSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fechAllSessionForDay.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fechAllSessionForDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filmSessions = action.payload;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default sessionFilmForDateSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
