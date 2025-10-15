import type { InventoryItem as InventoryItemType , InventoryItemGroupedType, CheckedOutItemDataType} from "../types/inventory";
import type { CatalogItem as CatalogItemType } from '../types/catalog';

export function countAvailability(groupedItems: InventoryItemType[]): number {
  let numAvailable = 0;
  groupedItems.forEach(item => {
    if (item.isCheckedOut === false) numAvailable++;
  });
  return numAvailable;
}

export function calculateInventoryQuantities(items: InventoryItemType[]) {
  return {
    quantityTotal: items.length,
    quantityAvailable: countAvailability(items),
  };
}

export function calculateCheckedOutQuantities(items: InventoryItemType[]) {
  return {
    quantityCheckedOut: items.length,
  };
}

export function groupInventoryByCatalogItem(inventoryItems: InventoryItemType[]): Record<string, InventoryItemType[]> {
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
    const { quantityTotal, quantityAvailable } = calculateInventoryQuantities(items);
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
    const { quantityCheckedOut } = calculateCheckedOutQuantities(items);
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

export function gatherCheckoutItemQuantities(userEmail: string, inventoryItemData: InventoryItemType[], catalogItems: CatalogItemType[]) {
  const itemsTiedToUser: InventoryItemType[] = inventoryItemData.filter((item) => item.checkedOutBy === userEmail);
  const groupedByCategory = groupInventoryByCatalogItem(itemsTiedToUser);
  return gatherCheckoutItemDetails(groupedByCategory, catalogItems);
}