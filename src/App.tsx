import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';

import { AdminPanel } from './pages/AdminPanel';
import { Home } from './pages/Home';
import { NotFoundPage } from './pages/NotFoundPage';
import { SessionOrder } from './pages/SessionOrder';
import { PaymentPage } from './pages/PaymentPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TicketPage } from './pages/TicketPage';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './components/common/RequireAuth';

import { useAppDispatch } from './hooks/redux';
import { fechInitSate } from './store/reducers/ActionCreators';

import 'react-notifications-component/dist/theme.css';
import './assets/scss/normalize.css';
import './assets/scss/styles.scss';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fechInitSate());
  }, [dispatch]);

  return (
    <AuthProvider>
      <ReactNotifications />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/order/:sessionId' element={<SessionOrder />} />
        <Route path='/order/:sessionId/payment' element={<PaymentPage />} />
        <Route path='/order/:sessionId/ticket' element={<TicketPage />} />

        <Route
          path='admin'
          element={
            <RequireAuth>
              <AdminPanel />
            </RequireAuth>
          }></Route>
        <Route path='admin/login' element={<Login />} />
        <Route path='admin/register' element={<Register />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
