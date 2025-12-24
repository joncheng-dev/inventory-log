import InventoryItem from './InventoryItem';
import type { InventoryItemGroupedType } from '../../types/inventory';
import type { CatalogItem as CatalogItemType } from '../../types/catalog';
import type { ViewMode } from '../../types/user';

interface InventoryItemListProps {
  inventoryItemsAfterFilter: Record<string, InventoryItemGroupedType | null>;
  catalogItems: CatalogItemType[];
  viewMode: ViewMode;
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItemGroupedType | null>>;
}

function renderGroupedInventoryItems(
  inventoryItems: Record<string, InventoryItemGroupedType | null>,
  catalogItems: CatalogItemType[],
  viewMode: ViewMode,
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItemGroupedType | null>>,
) {
  return Object.entries(inventoryItems).map(([catalogItemId, item]) => {
    const catalogItem = catalogItems.find(cat => cat.id === catalogItemId);
    if (!catalogItem) return null;

    return (
      <InventoryItem
        key={catalogItemId}
        item={item}
        catalogItem={catalogItem}
        viewMode={viewMode}
        setSelectedItem={setSelectedItem}
      />
    );
  })
}

export default function InventoryItemList({ inventoryItemsAfterFilter, catalogItems, viewMode, setSelectedItem }: InventoryItemListProps) {
  if (Object.keys(inventoryItemsAfterFilter).length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-theme-secondary">
        <div className="text-center">
          <p className="text-lg font-medium">No items found</p>
          <p className="text-sm mt-2">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {renderGroupedInventoryItems(inventoryItemsAfterFilter, catalogItems, viewMode, setSelectedItem)}
      </div>
    );
  }

  // List view
  return (
    <div className="flex flex-col space-y-2 p-6">
        {renderGroupedInventoryItems(inventoryItemsAfterFilter, catalogItems, viewMode, setSelectedItem)}
    </div>
  );
}

