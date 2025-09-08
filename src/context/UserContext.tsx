import React, { createContext, useContext, useState, ReactNode } from 'react';
import { faker } from '@faker-js/faker';

interface User {
  name: string;
  email: string;
  avatar: string;
  plan: 'Free' | 'Starter' | 'Pro';
}

interface UserContextType {
  user: User | null;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Static user data for demonstration
const staticUser: User = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`,
  plan: 'Starter',
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(staticUser);

  const logout = () => {
    setUser(null);
    // In a real app, you'd also clear tokens, etc.
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
