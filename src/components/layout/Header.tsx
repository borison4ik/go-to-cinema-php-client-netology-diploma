import React from 'react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  admin: boolean;
}
export const Header: React.FC<HeaderProps> = ({ admin }) => {
  const auth = useAuth();

  const logoutHandler = () => {
    auth.logOut();
  };

  return (
    <header className='page-header'>
      <h1 className='page-header__title'>
        Идём<span>в</span>кино
      </h1>
      {admin && <span className='page-header__subtitle'>Администраторррская</span>}
      {auth.user?.user && (
        <div className='page-header__auth'>
          <span className='name'>{auth.user?.user.name}</span>&nbsp;&nbsp;/&nbsp;&nbsp;
          <span className='logout' onClick={logoutHandler}>
            Выйти
          </span>
        </div>
      )}
    </header>
  );
};
