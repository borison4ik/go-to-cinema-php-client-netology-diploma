import React from 'react';
import { ClientLayot } from '../components/layout/ClientLayot';
import { Header } from '../components/layout/Header';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <ClientLayot>
      <Header admin={false} />
      <main>
        <div className='empty'>
          <h1>404 Страница не найдена</h1>
          <Link to='/'>На главную</Link>
        </div>
      </main>
    </ClientLayot>
  );
};
