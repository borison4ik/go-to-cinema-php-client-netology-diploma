import React from 'react';

interface ClientLayotProps {
  children: React.ReactNode;
}
export const ClientLayot: React.FC<ClientLayotProps> = ({ children }) => {
  return <div className='client-root'>{children}</div>;
};
