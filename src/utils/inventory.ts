import type { InventoryItem as InventoryItemType , InventoryItemGroupedType, CheckedOutItemDataType} from "../types/inventory";
import type { CatalogItem as CatalogItemType, InventoryCounts } from '../types/catalog';

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

export function gatherInventoryItemData(groupedItems: Record<string, InventoryItemType[]>, catalogItems: CatalogItemType[]) {
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

export function gatherCheckoutItemDetails(groupedItems: Record<string, InventoryItemType[]>, catalogItems: CatalogItemType[]) {
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
  catalogItems: CatalogItemType[])
  : Record<string, CheckedOutItemDataType> {
  const itemsTiedToUser: InventoryItemType[] = inventoryItemData.filter((item) => item.checkedOutBy === userEmail);
  const groupedByCategory = groupInventoryItemsByCatalogItem(itemsTiedToUser);
  return gatherCheckoutItemDetails(groupedByCategory, catalogItems) || {};
}

export function buildInventoryView(
  userEmail: string,
  inventoryItems: InventoryItemType[],
  catalogItems: CatalogItemType[]
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
  catalogItems: CatalogItemType[],
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
): InventoryItemType[] {
  let items = [];
  const createdAt = new Date().toISOString();
  for (let i = 0; i < quantity; i++) {
    items.push({
      id: crypto.randomUUID(),
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