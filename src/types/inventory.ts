export interface InventoryItem {
  id: string;
  catalogItemId: string;
  isCheckedOut: boolean;
  checkedOutBy?: string;
  dateCheckedOut?: string;
}

