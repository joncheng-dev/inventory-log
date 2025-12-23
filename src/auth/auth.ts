import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import app from '../firebase';

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  console.log('signInWithGoogle called');
  return signInWithPopup(auth, provider);
};

export const signOutUser = () => {
  return signOut(auth);
};