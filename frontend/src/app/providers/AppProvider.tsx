import React from 'react';
import { AuthProvider } from '../../hooks/useAuth';
import { NavigationProvider } from '../../hooks/useNavigation';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <NavigationProvider>
        {children}
      </NavigationProvider>
    </AuthProvider>
  );
};
