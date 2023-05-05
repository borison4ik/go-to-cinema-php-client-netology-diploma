import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminPanel } from './pages/AdminPanel';
import { NotFoundPage } from './pages/NotFoundPage';

import './assets/scss/normalize.css';
import './assets/scss/styles.scss';
import './index.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
