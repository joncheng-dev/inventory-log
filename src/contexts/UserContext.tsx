import { createContext, useContext, useEffect, useState } from 'react';
import { useNotification } from './NotificationContext';
import type { UserProfile, UserRole } from '../types/user';
import { listenToUserProfiles, updateUserRole } from '../utils/user';

interface UserContextType {
  users: UserProfile[];
  userLoading: boolean;
  errorMsg: string | null;
  changeUserRole: (uid: string, newRole: UserRole) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode; }) => {
  const { success, error } = useNotification();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const changeUserRole = async (uid: string, newRole: UserRole) => {
    try {
      await updateUserRole(uid, newRole);
      success(`Role updated to ${newRole}`);
    } catch (err) {
      setErrorMsg("Failed to update user role");
      error('Failed to update user role');
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    const unsubscribe = listenToUserProfiles((users) => {
      setUsers(users);
      setUserLoading(false);
    });
    
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        userLoading,
        errorMsg,
        changeUserRole
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