import { createContext, useContext, useState } from 'react';

export type UserRole = 'admin' | 'user';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
}

interface AuthContextType {
  userProfile: UserProfile;
  isAdmin: boolean;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
  const [userProfile] = useState<UserProfile>({
    uid: 'user-123',
    // email: 'jonathan@kkfs.org',
    email: 'joncheng.dev@gmail.com',
    displayName: 'Jon Cheng',
    role: 'admin'
  });

  const [role, setRole] = useState<UserRole>('admin');

  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        userProfile: { ...userProfile, role },
        isAdmin,
        setRole
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return context;
}