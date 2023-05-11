import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminPanel } from './pages/AdminPanel';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import './assets/scss/normalize.css';
import './assets/scss/styles.scss';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
