import React from 'react';
import { ClientLayot } from '../components/layout/ClientLayot';
import { Header } from '../components/layout/Header';
import { BuyingMain } from '../components/client/Buying/BuyingMain';

export const SessionOrder = () => {
  return (
    <ClientLayot>
      <Header admin={false} />
      <BuyingMain />
    </ClientLayot>
  );
};
