import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { api, csrf } from '../../API/callToServer';
import { getToken } from '../../utils/helpers';

type Props = {
  children: JSX.Element;
};

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const { user, logOut } = useAuth();
  const navigator = useNavigate();
  const token = getToken();

  React.useEffect(() => {
    csrf.get('sanctum/csrf-cookie').then(() => {
      api.get('admin/auth').then((response) => {
        if (response.status === 401) {
          logOut();
          navigator('admin/login');
        }
      });
    });
  }, [token]);

  if (!user || !user.token) return <Navigate to='login' replace />;
  return <>{children}</>;
};
