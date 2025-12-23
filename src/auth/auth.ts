import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import app from '../firebase';

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