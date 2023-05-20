import React from 'react';
import { ClientLayot } from '../components/layout/ClientLayot';
import { Header } from '../components/layout/Header';
import { TicketMain } from '../components/client/Ticket/TicketMain';

export const TicketPage = () => {
  return (
    <>
      <ClientLayot>
        <Header admin={false} />
        <TicketMain />
      </ClientLayot>
    </>
  );
};
