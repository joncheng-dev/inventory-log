export interface CatalogItem {
  id: string;
  displayName: string;
  sku: string;
  description: string;
  location: string;
  tags: string[];
  archived?: boolean;
  archivedAt?: string | null;
}

export interface InventoryCounts {
  total: number;
  available: number;
  checkedOut: number;
}

export interface CatalogItemFormData {
  displayName: string,
  sku: string,
  description: string,
  location: string,
  tags: string[];
}