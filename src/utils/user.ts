import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { ViewMode } from '../types/user';
import type { UserProfile } from '../types/user';

export const updateUserViewMode = async (uid: string, viewMode: ViewMode) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    'settings.viewMode': viewMode
  });
};

export const getUserProfiles = async (): Promise<UserProfile[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));

    return querySnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    } as UserProfile));
  } catch (e) {
    console.error("Error fetching user profiles: ", e);
    throw e;
  }
};