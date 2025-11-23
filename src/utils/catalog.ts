import type { CatalogItem as CatalogItemType } from "../types/catalog";

export function archiveItem(
  selectedItem: CatalogItemType
): CatalogItemType {
  return {
    ...selectedItem,
    archived: true,
    archivedAt: new Date().toISOString(),
  };
}

export function unarchiveItem(
  selectedItem: CatalogItemType
): CatalogItemType {
  return {
    ...selectedItem,
    archived: false,
    archivedAt: null
  }
}