import axios from 'axios';
import { getToken } from '../utils/heplers';

export const callToServer = async (url: string, param: { [key: string]: String }, method: string = 'GET', body: any = {}) => {
  let query = '';

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };

  let options = {
    headers,
    method,
  };

  if (Object.keys(body).length) {
    options = Object.assign(options, { body: JSON.stringify(body) });
  }

  if (Object.keys(param).length) {
    query += '?';

    Object.entries(param).forEach(([key, value]) => {
      query += `${key}=${value}`;
    });
  }

  const api = axios.create({
    headers: options.headers,
    method: options.method,
    baseURL: process.env.REACT_APP_USER_URL,
    withCredentials: true,
  });

  try {
    const response = await api(`/${url + query}`);

    if (response.data.error) {
      throw new Error('Ошибка сервера =(');
    }

    return response.data;
  } catch (e: ErrorConstructor | any) {
    console.log(e.message);
  }
};

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});
