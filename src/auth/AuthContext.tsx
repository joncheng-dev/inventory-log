import { createContext, useContext, useEffect, useState } from 'react';
import { type User, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { auth } from './auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export type UserRole = 'admin' | 'user';

export interface UserSetting {
  key: string;
  value: any;
}

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
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<UserRole>('user');

  const handleAuthChange = async (user: User | null) => {
    console.log('handleAuthChange called with user:', user?.email);

    if (!user) {
      setUserProfile(null);
      setIsSignedIn(false);
      setLoading(false);
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);

    const baseProfile: UserProfile = {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      role: 'user',
    }

    if (!snap.exists()) {
      // this is the first login; create a new user
      await setDoc(userRef, {
        email: baseProfile.email,
        displayName: baseProfile.displayName,
        role: baseProfile.role,
        createdAt: serverTimestamp()
      });
      setUserProfile(baseProfile);
      console.log('AuthContext, no user exists. User created');
    } else {
      // returning user, load existing profile
      const data = snap.data()!;
      setUserProfile({
        ...baseProfile,
        role: data.role,
      });
      console.log('AuthContext, user exists. Loading profile');
    }
    setIsSignedIn(true);
    setLoading(false);
  };

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

  const isAdmin = isSignedIn && role === 'admin';
  
  if (loading) {
    return <div>Loading...</div>;
  }

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