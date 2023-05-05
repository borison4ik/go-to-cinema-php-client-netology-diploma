import { TempHallUpdated } from '../../components/adminPanel/step2/ConfigureHalls';
import { AdminServerResponce, Film, Hall, HallPlaceTypePrice } from '../../models/IServerResponce';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Административная часть
// получение данных при инициализации приложени
export const fechAdminPanel = createAsyncThunk<AdminServerResponce, undefined, { rejectValue: string }>('admin/fechInitSate', async (_, thunkAPI) => {
  const response = await fetch('http://localhost:8000/api/admin/init');
  if (!response.ok) {
    return thunkAPI.rejectWithValue('Что-то пошло не так');
  }
  const data = await response.json();
  return data;
});

// Добавить новый зал
export const fechAddHall = createAsyncThunk<Hall, { name: string }, { rejectValue: string }>('admin/fechAddHall', async (hall, thunkAPI) => {
  const response = await fetch('http://localhost:8000/api/admin/hall', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hall),
  });
  if (!response.ok) {
    return thunkAPI.rejectWithValue('Что-то пошло не так');
  }
  const data = await response.json();
  return data;
});

// Удалить зал
export const fechDeleteHall = createAsyncThunk<{ id: number }, number, { rejectValue: string }>('admin/fechDeleteHall', async (id, thunkAPI) => {
  const response = await fetch(`http://localhost:8000/api/admin/hall/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    return thunkAPI.rejectWithValue('Что-то пошло не так');
  }
  const data = await response.json();
  return data;
});

// Одновить параметры зала с учетом его размеров и конфигурации кресел
export const fechUpdateHall = createAsyncThunk<Hall, TempHallUpdated, { rejectValue: string }>('admin/fechUpdateHall', async (hall, thunkAPI) => {
  const response = await fetch(`http://localhost:8000/api/admin/hall/${hall.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hall),
  });
  if (!response.ok) {
    return thunkAPI.rejectWithValue('Что-то пошло не так');
  }
  const data = await response.json();
  return data;
});

// Обновить цены на кресла в зале
export const fechUpdateHallPrice = createAsyncThunk<{ [key: HallPlaceTypePrice['id']]: HallPlaceTypePrice }, HallPlaceTypePrice[], { rejectValue: string }>(
  'admin/fechUpdateHallPrice',
  async (array, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/api/admin/hall-place-type-price`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(array),
    });
    if (!response.ok) {
      return thunkAPI.rejectWithValue('Что-то пошло не так');
    }
    const data = await response.json();
    return data;
  },
);

// Добавить новый фильм
export const fechAddFilm = createAsyncThunk<Film, FormData, { rejectValue: string }>('admin/fechAddFilm', async (obj, thunkAPI) => {
  const response = await fetch(`http://localhost:8000/api/admin/films`, {
    method: 'POST',
    body: obj,
  });
  if (!response.ok) {
    return thunkAPI.rejectWithValue('Что-то пошло не так');
  }
  const data = await response.json();
  return data;
});

// Удалить фильм (под вопросом)
export const fechDeleteFilm = createAsyncThunk<{ id: number }, number, { rejectValue: string }>('admin/fechDeleteFilm', async (id, thunkAPI) => {
  const response = await fetch(`http://localhost:8000/api/admin/films/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    return thunkAPI.rejectWithValue('Что-то пошло не так');
  }
  const data = await response.json();
  return data;
});
