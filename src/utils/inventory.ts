import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { db } from "../firebase";
import type { InventoryItem as InventoryItemType, InventoryItemGroupedType, CheckedOutItemDataType } from "../types/inventory";
import type { CatalogTemplate, InventoryCounts } from '../types/catalog';

export const getInventoryItems = async (): Promise<InventoryItemType[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'inventoryItems'));

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as InventoryItemType));
  } catch (e) {
    console.error("Error fetching inventory items: ", e);
    throw e;
  }
}

export const createInventoryItem = async (
  item: Omit<InventoryItemType, 'id'>
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'inventoryItems'), item);
    return docRef.id;
  } catch (e) {
    console.error("Error creating inventory item: ", e);
    throw e;
  }
};

export const createInventoryItemsBatch = async (
  items: Omit<InventoryItemType, 'id'>[]
): Promise<string[]> => {
  try {
    const batch = writeBatch(db);
    const collectionRef = collection(db, 'inventoryItems');
    const docRefs: string[] = [];

    items.forEach((item) => {
      const docRef = doc(collectionRef);
      batch.set(docRef, item);
      docRefs.push(docRef.id);
    });
    await batch.commit();
    return docRefs;
  } catch (e) {
    console.error("Error creating batch inventory items: ", e);
    throw e;
  }
};

export const updatedInventoryItem = async (
  id: string,
  updates: Partial<Omit<InventoryItemType, 'id'>>
): Promise<void> => {
  try {
    const docRef = doc(db, 'inventoryItems', id);
    await updateDoc(docRef, updates);
  } catch (e) {
    console.error("Error updating inventory item: ", e);
    throw e;
  }
}

export const updateInventoryItemsBatch = async (
  updates: { id: string; data: Partial<Omit<InventoryItemType, "id">> }[]
): Promise<void> => {
  try {
    const batch = writeBatch(db);

    updates.forEach(({ id, data }) => {
      const docRef = doc(db, "inventoryItems", id);
      batch.update(docRef, data);
    });

    await batch.commit();
  } catch (e) {
    console.error("Error batch updating inventory items: ", e);
    throw e;
  }
};

export const deleteInventoryItem = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "inventoryItems", id);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting inventory item: ", e);
    throw e;
  }
};

export const deleteInventoryItemsBatch = async (ids: string[]): Promise<void> => {
  try {
    const batch = writeBatch(db);

    ids.forEach((id) => {
      const docRef = doc(db, "inventoryItems", id);
      batch.delete(docRef);
    });

    await batch.commit();
  } catch (e) {
    console.error("Error batch deleting inventory items: ", e);
    throw e;
  }
};

export function countInventoryItemAvailability(groupedItems: InventoryItemType[]): number {
  let numAvailable = 0;
  groupedItems.forEach(item => {
    if (item.isCheckedOut === false) numAvailable++;
  });
  return numAvailable;
}

export function calculateInventoryItemQuantities(items: InventoryItemType[]) {
  return {
    quantityTotal: items.length,
    quantityAvailable: countInventoryItemAvailability(items),
  };
}

export function calculateCheckedOutItemQuantities(items: InventoryItemType[]) {
  return {
    quantityCheckedOut: items.length,
  };
}

export function groupInventoryItemsByCatalogItem(inventoryItems: InventoryItemType[]): Record<string, InventoryItemType[]> {
  return inventoryItems.reduce((grouped, item) => {
    const key = item.catalogItemId;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
    return grouped;
  }, {} as Record<string, InventoryItemType[]>);
}

export function gatherInventoryItemData(groupedItems: Record<string, InventoryItemType[]>, catalogItems: CatalogTemplate[]) {
  let data: Record<string, InventoryItemGroupedType> = {};

  for (const [catalogItemId, items] of Object.entries(groupedItems)) {
    const { quantityTotal, quantityAvailable } = calculateInventoryItemQuantities(items);
    // use catalogItemId to get details from catalog item entry
    const catalogItem = catalogItems.find(cat => cat.id === catalogItemId);
    if (!catalogItem) continue;
    // For this one catalogItemId, create an object of key value pairs
    data[catalogItemId] = {
      'catalogItemId': catalogItem.id,
      'displayName': catalogItem.displayName,
      'sku': catalogItem.sku,
      'description': catalogItem.description,
      'location': catalogItem.location,
      'tags': catalogItem.tags,
      'quantityTotal': quantityTotal,
      'quantityAvailable': quantityAvailable,
    };
  }
  return data;
}

export function gatherCheckoutItemDetails(groupedItems: Record<string, InventoryItemType[]>, catalogItems: CatalogTemplate[]) {
  let data: Record<string, CheckedOutItemDataType> = {};

  for (const [catalogItemId, items] of Object.entries(groupedItems)) {
    const { quantityCheckedOut } = calculateCheckedOutItemQuantities(items);
    // use catalogItemId to get details from catalog item entry
    const catalogItem = catalogItems.find(cat => cat.id === catalogItemId);
    if (!catalogItem) return null;
    // For this one catalogItemId, create an object of key value pairs
    data[catalogItemId] = {
      'quantityCheckedOut': quantityCheckedOut,
    };
  }
  return data;
}

export function gatherCheckoutItemQuantities(
  userEmail: string,
  inventoryItemData: InventoryItemType[],
  catalogItems: CatalogTemplate[])
  : Record<string, CheckedOutItemDataType> {
  const itemsTiedToUser: InventoryItemType[] = inventoryItemData.filter((item) => item.checkedOutBy === userEmail);
  const groupedByCategory = groupInventoryItemsByCatalogItem(itemsTiedToUser);
  return gatherCheckoutItemDetails(groupedByCategory, catalogItems) || {};
}

export function buildInventoryView(
  userEmail: string,
  inventoryItems: InventoryItemType[],
  catalogItems: CatalogTemplate[]
): {
    aggregatedItems: Record<string, InventoryItemGroupedType>;
    checkedOutQty: Record<string, CheckedOutItemDataType>;
    filteredCheckedOutItems: Record<string, InventoryItemGroupedType>;
  } {
  const rawGroupedItems = groupInventoryItemsByCatalogItem(inventoryItems);
  const aggregatedItems = gatherInventoryItemData(rawGroupedItems, catalogItems);
  const checkedOutQty = gatherCheckoutItemQuantities(
    userEmail,
    inventoryItems,
    catalogItems
  ) || {};

  const filteredCheckedOutItems = Object.fromEntries(
    Object.entries(aggregatedItems).filter(([id]) => id in checkedOutQty)
  );
  return { aggregatedItems, checkedOutQty, filteredCheckedOutItems };
}

export function buildSelectedItemDetails(
  inventoryItems: InventoryItemType[],
  catalogItems: CatalogTemplate[],
  selectedItem: InventoryItemGroupedType
): {
  itemDetails: InventoryItemGroupedType | null;
  relatedItems: InventoryItemType[];
} {

    let itemDetails: InventoryItemGroupedType | null = null;
    let relatedItems: InventoryItemType[] = [];

    relatedItems = inventoryItems.filter((inv) => inv.catalogItemId === selectedItem.catalogItemId);
    const { quantityTotal, quantityAvailable } = calculateInventoryItemQuantities(relatedItems);
    const catalogItem = catalogItems.find(cat => cat.id === selectedItem.catalogItemId);
    if (catalogItem) {      
      itemDetails = {
        catalogItemId: catalogItem.id,
        displayName: catalogItem.displayName,
        sku: catalogItem.sku,
        description: catalogItem.description,
        location: catalogItem.location,
        tags: catalogItem.tags,
        quantityTotal: quantityTotal,
        quantityAvailable: quantityAvailable,
      }
  }
  
  return {itemDetails, relatedItems};
}

export function getInventoryCountsforCatalog(
  catalogItemId: string,
  inventoryItems: InventoryItemType[]
): InventoryCounts {
  let itemsMatchingCatalogEntry = inventoryItems.filter((item) => item.catalogItemId === catalogItemId);
  let totalItemCount = itemsMatchingCatalogEntry.length;

  let checkedOutCount = 0;
  for (let i = 0; i < totalItemCount; i++){
    if (itemsMatchingCatalogEntry[i].isCheckedOut) {
      checkedOutCount++;
    }
  }
  let availableCount = totalItemCount - checkedOutCount;
  
  return {
    total: totalItemCount,
    available: availableCount,
    checkedOut: checkedOutCount
  }
}

export function generateNewInventoryItems(
  catalogItemId: string,
  quantity: number
): Omit<InventoryItemType, 'id'>[] {
  const items: Omit<InventoryItemType, 'id'>[] = [];
  const createdAt = new Date().toISOString();

  for (let i = 0; i < quantity; i++) {
    items.push({
      catalogItemId: catalogItemId,
      isCheckedOut: false,
      checkedOutBy: null,
      dateCheckedOut: null,
      createdAt,
    });
  }
  return items;
}

export function removeInventoryItems(
  inventoryItems: InventoryItemType[],
  catalogItemId: string,
  quantity: number
): InventoryItemType[] {
  let currentInventory = [... inventoryItems];
  // catalogItemId, match inventoryItems, filter these.
  let targetType = inventoryItems.filter((item) => item.catalogItemId === catalogItemId && !item.isCheckedOut);

  targetType.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  const itemsToRemove = targetType.slice(0, quantity);
  const updatedInventory = currentInventory.filter((item) => !itemsToRemove.includes(item));
  return updatedInventory;
} 

export function checkOutInventoryItems(
  userEmail: string,
  inventoryItems: InventoryItemType[],
  catalogItemId: string,
  qtyToCheckOut: number
): InventoryItemType[] {
  if (qtyToCheckOut <= 0) throw new Error('Quantity must be greater than 0.');
  if (!userEmail || !catalogItemId) throw new Error('User email and catalog item ID are required.');

  const availableItems = inventoryItems.filter((item) =>
    (item.catalogItemId === catalogItemId) && !item.isCheckedOut);

  if (availableItems.length < qtyToCheckOut) {
    throw new Error(`Insufficient inventory. Requested: ${qtyToCheckOut}, Available: ${availableItems.length}`);
  }

  const itemsToCheckOut = availableItems.slice(0, qtyToCheckOut);
  const idsToCheckOut = new Set(itemsToCheckOut.map(item => item.id));
  return inventoryItems.map((item) => 
    idsToCheckOut.has(item.id)
    ? {
        ...item,
        isCheckedOut: true,
        checkedOutBy: userEmail,
        dateCheckedOut: new Date().toISOString()
      }
    : item
  );
} 

export function returnAllInventoryItems(
  userEmail: string,
  inventoryItems: InventoryItemType[],
  catalogItemId: string
): InventoryItemType[] {
  return inventoryItems.map((item) => 
    (item.checkedOutBy === userEmail) && (item.catalogItemId === catalogItemId)
      ? { ...item, isCheckedOut: false, checkedOutBy: null, dateCheckedOut: null }
      : item
  );
}

export function returnInventoryItem(
  inventoryItems: InventoryItemType[],
  itemId: string
): InventoryItemType[] {
  return inventoryItems.map((item) => 
    item.id === itemId
    ? { ...item, isCheckedOut: false, checkedOutBy: null, dateCheckedOut: null }
    : item
  );
}