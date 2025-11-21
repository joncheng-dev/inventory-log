import type { InventoryItem as InventoryItemType , InventoryItemGroupedType, CheckedOutItemDataType} from "../types/inventory";
import type { CatalogItem as CatalogItemType, CatalogItemInventoryCounts } from '../types/catalog';

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
): CatalogItemInventoryCounts {
  let itemsMatchingCatalogEntry = inventoryItems.filter((item) => item.catalogItemId === catalogItemId);
  let totalItemCount = itemsMatchingCatalogEntry.length;
  let checkedOutCount = itemsMatchingCatalogEntry.filter((item) => item.isCheckedOut).length;
  return {
    totalItemCount: totalItemCount,
    checkedOutCount: checkedOutCount
  }
}