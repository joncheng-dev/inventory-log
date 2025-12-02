import type { InventoryItemGroupedType } from '../types/inventory';
import InventoryItemList from './inventory/InventoryItemList';
import type { CatalogItem as CatalogItemType } from '../types/catalog';

interface ItemListDisplayProps {
  inventoryItemData: Record<string, InventoryItemGroupedType>;
  catalogItems: CatalogItemType[];
  searchTerm: string;
  selectedTags: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItemGroupedType | null>>;
  viewMode: 'grid-view' | 'list-view';
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