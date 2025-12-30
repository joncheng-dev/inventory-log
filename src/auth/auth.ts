import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import app from '../firebase';
import type { User } from 'firebase/auth';
import type { UserProfile, UserSettings } from '../types/user';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  if (import.meta.env.DEV) {
    return signInWithPopup(auth, provider);
  }
  return signInWithRedirect(auth, provider);
};

export const signOutUser = () => {
  return signOut(auth);
};

export const getOrCreateUserProfile = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);

  const defaultUserSettings: UserSettings = {
    viewMode: 'grid',
    isCheckoutSideBarOpen: false
  };

  const baseProfile: UserProfile = {
    uid: user.uid,
    email: user.email ?? '',
    displayName: user.displayName ?? '',
    role: 'user',
    settings: defaultUserSettings
  };

  if (!snap.exists()) {
    // this is the first login; create a new user
    await setDoc(userRef, {
      email: baseProfile.email,
      displayName: baseProfile.displayName,
      role: baseProfile.role,
      settings: baseProfile.settings,
      createdAt: serverTimestamp()
    });
    return baseProfile;
  } else {
    const data = snap.data()!;
    const loadedProfile: UserProfile = {
      ...baseProfile,
      role: data.role,
      settings: data.settings || defaultUserSettings
    };
    return loadedProfile;
  }
};