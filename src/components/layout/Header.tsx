import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  admin: boolean;
}
export const Header: React.FC<HeaderProps> = ({ admin }) => {
  const auth = useAuth();
  let location = useLocation();
  const logoutHandler = () => {
    auth.logOut();
  };

  return (
    <header className='page-header'>
      {!location.pathname.includes('/admin') ? (
        <Link to={'/'}>
          <h1 className='page-header__title'>
            Идём<span>в</span>кино
          </h1>
        </Link>
      ) : (
        <h1 className='page-header__title'>
          Идём<span>в</span>кино
        </h1>
      )}

      {admin && <span className='page-header__subtitle'>Администраторррская</span>}
      {auth.user?.user && location.pathname.includes('/admin') && (
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
