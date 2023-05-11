import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';

import { AdminPanel } from './pages/AdminPanel';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { RequireAuth } from './components/common/RequireAuth';

import 'react-notifications-component/dist/theme.css';
import './assets/scss/normalize.css';
import './assets/scss/styles.scss';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <ReactNotifications />
      <Routes>
        <Route
          path='/admin'
          element={
            <RequireAuth>
              <AdminPanel />
            </RequireAuth>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
