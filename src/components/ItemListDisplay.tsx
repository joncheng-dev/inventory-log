import type { InventoryItemGroupedType } from '../types/inventory';
import InventoryItemList from './inventory/InventoryItemList';
import type { CatalogTemplate } from '../types/catalog';
import type { ViewMode } from '../types/user';

interface ItemListDisplayProps {
  inventoryItemData: Record<string, InventoryItemGroupedType>;
  catalogItems: CatalogTemplate[];
  searchTerm: string;
  selectedTags: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItemGroupedType | null>>;
  viewMode: ViewMode;
}

export default function ItemListDisplay({ inventoryItemData, catalogItems, searchTerm, selectedTags, setSelectedItem, viewMode }: ItemListDisplayProps) {
  let search = '';
  if (searchTerm.length > 1) {
    search = searchTerm.toLowerCase();
  }  

  const filteredItems = Object.fromEntries(
    Object.entries(inventoryItemData).filter(([_, item]) => {
      const tagMatches = selectedTags.length === 0 ||
        selectedTags.every(tag => item.tags.includes(tag));
      const searchMatches = searchTerm === '' ||
        item.displayName.toLowerCase().includes(search) ||
        item.sku.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
      return tagMatches && searchMatches;
    })
  );
  
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