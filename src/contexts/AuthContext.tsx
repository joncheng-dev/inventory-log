import { createContext, useContext, useState } from 'react';

export type UserRole = 'admin' | 'user';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
}

interface AuthContextType {
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isAdmin: boolean;
  isSignedIn: boolean;
  setRole: (role: UserRole) => void;
  setIsSignedIn: (signedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    uid: 'user-123',
    // email: 'jonathan@kkfs.org',
    email: 'joncheng.dev@gmail.com',
    displayName: 'Jon Cheng',
    role: 'admin'
  });

  const [role, setRole] = useState<UserRole>('admin');

  const isAdmin = isSignedIn && role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        userProfile: isSignedIn && userProfile ? { ...userProfile, role } : null,
        setUserProfile,
        isAdmin,
        setRole,
        isSignedIn,
        setIsSignedIn
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