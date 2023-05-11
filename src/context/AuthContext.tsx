import React, { createContext, useContext, useState } from 'react';
import { User } from '../models/IServerResponce';

interface IAuthContent {
  user: User | null;
  logIn(user: User): void;
  logOut(): void;
}

const AuthContent = createContext<IAuthContent>({
  user: null,
  logIn: () => {},
  logOut: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, _setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user') || '{"user": null}') || null);

  const logIn = (user: User) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    _setUser(user);
  };

  const logOut = () => {
    _setUser(null);
    localStorage.removeItem('user');
  };

  return <AuthContent.Provider value={{ user, logIn, logOut }}>{children}</AuthContent.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContent);
};
