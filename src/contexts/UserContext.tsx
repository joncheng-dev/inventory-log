import { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { UserProfile, UserRole } from '../types/user';
import { getUserProfiles } from '../utils/user';

interface UserContextType {
  users: UserProfile[];
  userLoading: boolean;
  error: string | null;
  // updateUserRole: (uid: string, newRole: UserRole) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode; }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfiles = async () => {
    setUserLoading(true);
    setError(null);
    try {
      const users = await getUserProfiles();
      setUsers(users);
    } catch (err) {
      setError("Failed to fetch user profiles");
      console.error(err);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        userLoading,
        error,
        // updateUserRole
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}