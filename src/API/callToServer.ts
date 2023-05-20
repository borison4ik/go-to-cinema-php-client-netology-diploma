import axios from 'axios';
import { getToken } from '../utils/helpers';

export const csrf = axios.create({
  baseURL: 'http://localhost:8000',
});

export const api = axios.create({
  baseURL: process.env.REACT_APP_USER_URL,
  withCredentials: true,
});

api.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${getToken()}`;
  return request;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem('user');
    }

    throw error;
  },
);
