import { combineReducers, configureStore } from '@reduxjs/toolkit';

import hallReducer from './reducers/HallSlice';
import placeTypesSlice from './reducers/PlaceTypesSlice';
import hallPLacePrice from './reducers/HallPlacePrice';
import filmSlice from './reducers/FilmSlice';
import sessionFilmSlice from './reducers/SessionFilmSlice';

const rootReducer = combineReducers({
  hallReducer,
  placeTypesSlice,
  hallPLacePrice,
  filmSlice,
  sessionFilmSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
