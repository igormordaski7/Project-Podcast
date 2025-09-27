import React, { useState, createContext, useContext, ReactNode } from 'react';
import type { User, AuthFormData } from '../models/user';

interface AuthContextType {
  user: User;
  login: (credentials: AuthFormData) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Fulano',
    email: 'fulano@email.com',
    username: 'fulano',
    isLoggedIn: true,
  });

  const login = (credentials: AuthFormData) => {
    console.log('login', credentials);
    setUser((prev) => ({ ...prev, isLoggedIn: true }));
  };

  const logout = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
  };

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  const value = { user, login, logout, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
