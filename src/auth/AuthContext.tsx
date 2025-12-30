import { createContext, useContext, useEffect, useState } from 'react';
import { type User, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { auth, getOrCreateUserProfile } from './auth';
import LoadingScreen from '../components/ui/LoadingScreen';
import type { UserProfile, ViewMode } from '../types/user';
import { listenToCurrentUserProfile, updateUserViewMode } from '../utils/user';

interface AuthContextType {
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isAdmin: boolean;
  isSignedIn: boolean;
  setIsSignedIn: (signedIn: boolean) => void;
  handleViewToggleClick: (selectedView: ViewMode) => void;
  viewMode: ViewMode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const handleAuthChange = async (user: User | null) => {
    if (!user) {
      setUserProfile(null);
      setViewMode('grid');
      setIsSignedIn(false);
      setLoading(false);
      return;
    }

    const profile = await getOrCreateUserProfile(user);
    setUserProfile(profile);
    setViewMode(profile.settings?.viewMode || 'grid');
    setIsSignedIn(true);
    setLoading(false);

    return listenToCurrentUserProfile(user.uid, (updatedProfile) => {
      setUserProfile(updatedProfile);
      setViewMode(prev => updatedProfile.settings?.viewMode || prev);
    });
  };

  const handleViewToggleClick = async (selectedView: ViewMode) => {
    setViewMode(selectedView);
  };

  useEffect(() => {
    if (userProfile?.uid && viewMode !== userProfile.settings?.viewMode) {
      const timeoutId = setTimeout(() => {
        updateUserViewMode(userProfile.uid, viewMode);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [viewMode, userProfile?.uid, userProfile?.settings.viewMode]);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        console.log('Redirect result: ', result);
        if (result) {
          console.log('User signed in via redirect: ', result.user.email);
        }
      })
      .catch((err) => {
        console.error('Redirect error: ', err);
        setLoading(false);
      });

    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
    return () => unsubscribe();
  }, []);

  const isAdmin = isSignedIn && userProfile?.role === 'admin';
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-theme">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        setUserProfile,
        isAdmin,
        isSignedIn,
        setIsSignedIn,
        handleViewToggleClick,
        viewMode
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
};


// Firebase has this type for User
// interface User {
//   uid: string;
//   email: string | null;
//   displayName: string | null;
//   photoURL: string | null;
//   emailVerified: boolean;
//   phoneNumber: string | null;
//   providerData: Array<UserInfo>;
//   metadata: {
//     creationTime: string | null;
//     lastSignInTime: string | null;
//   };
//   getIdToken: (forceRefresh?: boolean) => Promise<string>;
//   reload: () => Promise<void>;
//   // …more methods for updating profile, password, etc.
// }