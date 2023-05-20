import { combineReducers, configureStore } from '@reduxjs/toolkit';

import hallReducer from './reducers/HallSlice';
import placeTypesSlice from './reducers/PlaceTypesSlice';
import hallPLacePrice from './reducers/HallPlacePrice';
import filmSlice from './reducers/FilmSlice';
import sessionFilmForDateSlice from './reducers/sessionFilmForDateSlice';
import SelectedClientPlacesSlice from './reducers/SelectedClientPlacesSlice';
import SelectedClientFilmSessionSlice from './reducers/SelectedClientFilmSessionSlice';
import ClientTicketsSlice from './reducers/ClientTicketsSlice';

const rootReducer = combineReducers({
  hallReducer,
  placeTypesSlice,
  hallPLacePrice,
  filmSlice,
  sessionFilmForDateSlice,
  SelectedClientPlacesSlice,
  SelectedClientFilmSessionSlice,
  ClientTicketsSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
