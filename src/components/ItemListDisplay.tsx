import type { InventoryItemGroupedType } from '../types/inventory';
import InventoryItemList from './inventory/InventoryItemList';
import type { CatalogItem as CatalogItemType } from '../types/catalog';

interface ItemListDisplayProps {
  inventoryItemData: Record<string, InventoryItemGroupedType>;
  catalogItems: CatalogItemType[];
  selectedTags: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItemGroupedType | null>>;
  viewMode: 'grid-view' | 'list-view';
}

export default function ItemListDisplay({ inventoryItemData, catalogItems, selectedTags, setSelectedItem, viewMode }: ItemListDisplayProps) {
  // Filter items based on selected tags
  const filteredItems = selectedTags.length === 0
    ? inventoryItemData
    : Object.fromEntries(
        Object.entries(inventoryItemData).filter(([key]) => {
          const catalogItem = catalogItems.find(catItem => catItem.id === key);
          if (!catalogItem) return false;
          return selectedTags.every(tag => catalogItem.tags.includes(tag));
        }
      ));
  
  return (
    <div className="h-full overflow-y-auto">
      <InventoryItemList
        inventoryItemsAfterFilter={filteredItems}
        catalogItems={catalogItems}
        viewMode={viewMode}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
}