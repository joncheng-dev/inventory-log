/**
 * Types for inventory and catalog items
 */

export interface Item {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  quantity?: number;
  checkedOut?: boolean;
}

export interface CatalogItem extends Item {
  category?: string;
  imageUrl?: string;
}

export interface InventoryItem extends Item {
  location?: string;
  lastUpdated?: Date;
}

export interface CheckedOutItem {
  id: string;
  itemId: string;
  itemName: string;
  checkedOutBy: string;
  checkedOutAt: Date;
  dueDate?: Date;
}

