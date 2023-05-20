import { TempHallUpdated } from '../../components/adminPanel/step2/ConfigureHalls';
import { AdminServerResponce, Film, FilmSession, Hall, HallPlaceTypePrice } from '../../models/IServerResponce';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../API/callToServer';

// Административная часть
// получение данных при инициализации приложени
export const fechInitSate = createAsyncThunk<AdminServerResponce, undefined, { rejectValue: string }>('admin/fechInitSate', async (_, thunkAPI) => {
  try {
    const response = await api.get('admin/init');

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (e: ErrorConstructor | any) {
    thunkAPI.rejectWithValue('Что-то пошло не так');
  }
});

// Добавить новый зал
export const fechAddHall = createAsyncThunk<Hall, { name: string }, { rejectValue: string }>('admin/fechAddHall', async (hall, thunkAPI) => {
  try {
    const response = await api.post('admin/hall', hall);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (e: ErrorConstructor | any) {
    thunkAPI.rejectWithValue('Что-то пошло не так');
  }
});

// Удалить зал
export const fechDeleteHall = createAsyncThunk<{ id: number }, number, { rejectValue: string }>('admin/fechDeleteHall', async (id, thunkAPI) => {
  try {
    const response = await api.delete(`admin/hall/${id}`);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (e: ErrorConstructor | any) {
    thunkAPI.rejectWithValue('Что-то пошло не так');
  }
});

// Одновить параметры зала с учетом его размеров и конфигурации кресел
export const fechUpdateHall = createAsyncThunk<Hall, TempHallUpdated, { rejectValue: string }>('admin/fechUpdateHall', async (hall, thunkAPI) => {
  try {
    const response = await api.put(`admin/hall/${hall.id}`, hall);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (e: ErrorConstructor | any) {
    thunkAPI.rejectWithValue('Что-то пошло не так');
  }
});

// Обновить цены на кресла в зале
export const fechUpdateHallPrice = createAsyncThunk<{ [key: HallPlaceTypePrice['id']]: HallPlaceTypePrice }, HallPlaceTypePrice[], { rejectValue: string }>(
  'admin/fechUpdateHallPrice',
  async (array, thunkAPI) => {
    try {
      const response = await api.put(`admin/hall-place-type-price`, array);

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (e: ErrorConstructor | any) {
      thunkAPI.rejectWithValue('Что-то пошло не так');
    }
  },
);

// Добавить новый фильм
export const fechAddFilm = createAsyncThunk<Film, FormData, { rejectValue: string }>('admin/fechAddFilm', async (obj, thunkAPI) => {
  try {
    const response = await api.post(`admin/films`, obj);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (e: ErrorConstructor | any) {
    thunkAPI.rejectWithValue('Что-то пошло не так');
  }
});

// Удалить фильм (под вопросом)
export const fechDeleteFilm = createAsyncThunk<{ id: number }, number, { rejectValue: string }>('admin/fechDeleteFilm', async (id, thunkAPI) => {
  try {
    const response = await api.delete(`admin/films/${id}`);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (e: ErrorConstructor | any) {
    thunkAPI.rejectWithValue('Что-то пошло не так');
  }
});

// Получение всех сеансов на текущую дату для клиента
export const fechAllSessionForDay = createAsyncThunk<{ [key: FilmSession['id']]: FilmSession }, string, { rejectValue: string }>(
  'fechAllSessionForDay',
  async (filterDateString, thunkAPI) => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('date', filterDateString);

      const response = await api.get(`film-sessions`, { params: searchParams });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (e: ErrorConstructor | any) {
      thunkAPI.rejectWithValue('Что-то пошло не так');
    }
  },
);

// Получение выбранного сеанса по ID
export const fechSessionForDay = createAsyncThunk<FilmSession, number, { rejectValue: string }>('fechSessionForDay', async (sessionId, thunkAPI) => {
  try {
    const response = await api.get(`film-sessions/${sessionId}`);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (e: ErrorConstructor | any) {
    thunkAPI.rejectWithValue('Что-то пошло не так');
  }
});
