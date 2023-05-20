import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Film } from '../../models/IServerResponce';
import { fechAddFilm, fechInitSate, fechDeleteFilm } from './ActionCreators';

interface FilmInitialState {
  films: { [key: Film['id']]: Film };
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
}

const initialState: FilmInitialState = {
  films: {},
  isLoading: false,
  isSending: false,
  error: null,
};

export const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fechInitSate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fechInitSate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.films = action.payload.films;
        state.error = null;
      })
      .addCase(fechAddFilm.pending, (state) => {
        state.isSending = true;
        state.error = null;
      })
      .addCase(fechAddFilm.fulfilled, (state, action) => {
        state.films[action.payload.id] = action.payload;
        state.isSending = false;
        state.error = null;
      })
      .addCase(fechDeleteFilm.pending, (state) => {
        state.isSending = true;
      })
      .addCase(fechDeleteFilm.fulfilled, (state, action) => {
        delete state.films[action.payload.id];
        state.isSending = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isSending = false;
        state.error = action.payload;
      });
  },
});

export default filmSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
