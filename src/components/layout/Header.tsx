import React from 'react';

interface HeaderProps {
  admin: boolean;
}
export const Header: React.FC<HeaderProps> = ({ admin }) => {
  return (
    <header className='page-header'>
      <h1 className='page-header__title'>
        Идём<span>в</span>кино
      </h1>
      {admin && (
        <span className='page-header__subtitle'>Администраторррская</span>
      )}
    </header>
  );
};
