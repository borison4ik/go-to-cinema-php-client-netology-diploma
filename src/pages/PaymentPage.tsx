import React from 'react';
import { ClientLayot } from '../components/layout/ClientLayot';
import { Header } from '../components/layout/Header';
import { PaymentMain } from '../components/client/Payment/PaymentMain';

export const PaymentPage = () => {
  return (
    <>
      <ClientLayot>
        <Header admin={false} />
        <PaymentMain />
      </ClientLayot>
    </>
  );
};
