import React from 'react';

interface AdministratorLayotProps {
  children: React.ReactNode;
}
export const AdministratorLayot: React.FC<AdministratorLayotProps> = ({ children }) => {
  return <div className='admin-root'>{children}</div>;
};
