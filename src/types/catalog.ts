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

export interface CatalogItemInventoryCounts {
  totalItemCount: number;
  checkedOutCount: number;
}