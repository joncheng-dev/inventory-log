import { collection, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
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

export const listenToUserProfiles = (
  onUpdate: (users: UserProfile[]) => void
) => {
  return onSnapshot(
    collection(db, 'users'),
    snap => {
      onUpdate(snap.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      } as UserProfile)));
    },
    error => {
      console.error('listenToUserProfiles error:', error);
    }
  );
};

export const listenToCurrentUserProfile = (
  uid: string,
  onUpdate: (profile: UserProfile) => void
) => {
  return onSnapshot(doc(db, 'users', uid), snap => {
    if (snap.exists()) {
      onUpdate({
        uid: uid,
        ...snap.data() 
      } as UserProfile);
    }
  });
}

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

export const updateIsCheckoutSideBarOpen = async (uid: string, isCheckoutSideBarOpen: boolean) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    'settings.isCheckoutSideBarOpen': isCheckoutSideBarOpen
  });
}