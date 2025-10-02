export interface InventoryItem {
  id: string;
  name: string;
  categories: string[];
  sku: string;
  isCheckedOut: boolean;
  checkedOutBy?: string;
  checkOutDate?: string;
  quantity?: number;
  description?: string;
}

