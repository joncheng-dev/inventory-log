import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase";
import type { CatalogTemplate } from "../types/catalog";

export const createCatalogTemplate = async (
  item: Omit<CatalogTemplate, 'id'>
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'catalogTemplates'), {
      ...item,
      archived: false,
      archivedAt: null
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
 
export const getCatalogTemplates = async (): Promise<CatalogTemplate[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'catalogTemplates'));
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as CatalogTemplate));
  } catch (e) {
    console.error("Error fetching catalog templates: ", e);
    throw e;
  }
};

export const updateCatalogTemplate = async (
  id: string,
  updates: Partial<Omit<CatalogTemplate, 'id'>>
): Promise<void> => {
  try {
    const docRef = doc(db, 'catalogTemplates', id);
    await updateDoc(docRef, updates);
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

export const deleteCatalogTemplate = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'catalogTemplates', id);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};

export const archiveCatalogTemplate = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'catalogTemplates', id);
    await updateDoc(docRef, {
      archived: true,
      archivedAt: serverTimestamp()
    });
  } catch (e) {
    console.error("Error archiving document: ", e);
    throw e;
  }
};

export const unarchiveCatalogTemplate = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'catalogTemplates', id);
    await updateDoc(docRef, {
      archived: false,
      archivedAt: null
    });
  } catch (e) {
    console.error("Error unarchiving document: ", e);
    throw e;
  }
};
