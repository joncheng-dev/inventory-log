import type { InventoryItem as InventoryItemType } from '../types/inventory';
import InventoryItemList from './inventory/InventoryItemList';
import type { CatalogItem as CatalogItemType } from '../types/catalog';

interface ItemListDisplayProps {
  viewMode: 'grid-view' | 'list-view';
  mockInventoryItems: InventoryItemType[];
  mockCatalogItems: CatalogItemType[];
  selectedTags: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItemType | null>>;
}

export default function ItemListDisplay({ mockInventoryItems, mockCatalogItems, viewMode, selectedTags, setSelectedItem }: ItemListDisplayProps) {
  // Filter items based on selected tags
  const filteredItems = selectedTags.length === 0
    ? mockInventoryItems
    : mockInventoryItems.filter(invItem => {
      const catalogItem = mockCatalogItems.find(catItem => catItem.id === invItem.catalogItemId);
      if (!catalogItem) return false;
      return catalogItem.tags.some(c => selectedTags.includes(c));
    });

  return (
    <div className="h-full overflow-y-auto">
      <InventoryItemList
        items={filteredItems}
        catalogItems={mockCatalogItems}
        viewMode={viewMode}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
}