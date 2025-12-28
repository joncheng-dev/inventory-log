import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { ViewMode, UserRole } from '../types/user';
import type { UserProfile } from '../types/user';

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

export const updateUserRole = async (uid: string, newRole: UserRole) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    role: newRole
  });
};

export const updateUserViewMode = async (uid: string, viewMode: ViewMode) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    'settings.viewMode': viewMode
  });
};
