import React from 'react';
import { Header } from '../components/layout/Header';
import { ClientLayot } from '../components/layout/ClientLayot';
import { ClientMain } from '../components/client/ClientMain';

export const Home = () => {
  return (
    <ClientLayot>
      <Header admin={false} />
      <ClientMain />
    </ClientLayot>
  );
};
