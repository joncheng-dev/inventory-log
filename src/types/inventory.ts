export interface InventoryItem {
  id: string;
  catalogItemId: string;
  isCheckedOut: boolean;
  checkedOutBy?: string;
  dateCheckedOut?: string;
}

export interface InventoryItemDetailsType {
    catalogItemId: string;
    displayName: string;
    sku: string;
    description: string;
    location: string;
    tags: string[];
    quantityTotal: number;
    quantityAvailable: number;
}