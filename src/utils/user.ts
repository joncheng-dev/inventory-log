import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { ViewMode } from '../types/user';

export const updateUserViewMode = async (uid: string, viewMode: ViewMode) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    'settings.viewMode': viewMode
  });
};