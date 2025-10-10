import type { InventoryItem as InventoryItemType } from "../types/inventory";

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