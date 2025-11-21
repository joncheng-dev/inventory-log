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