import InventoryItem from './InventoryItem';
import type { InventoryItem as InventoryItemType } from '../../types/inventory';
import type { CatalogItem as CatalogItemType } from '../../types/catalog';
import { calculateInventoryQuantities, groupInventoryByCatalogItem } from '../../utils/inventory';

interface InventoryItemListProps {
  items: InventoryItemType[];
  catalogItems: CatalogItemType[];
  viewMode: 'grid-view' | 'list-view';
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItemType | null>>;
}

function renderGroupedInventoryItems(
  catalogItems: CatalogItemType[],
  inventoryItems: Record<string, InventoryItemType[]>,
  viewMode: 'grid-view' | 'list-view',
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItemType | null>>,
) {
  return Object.entries(inventoryItems).map(([catalogItemId, groupedItems]) => {
    const catalogItem = catalogItems.find(cat => cat.id === catalogItemId);
    if (!catalogItem) return null;

    const { quantityTotal, quantityAvailable } = calculateInventoryQuantities(groupedItems);
    
    return (
      <InventoryItem
        key={catalogItemId}
        item={groupedItems[0]}
        catalogItem={catalogItem}
        quantityTotal={quantityTotal}
        quantityAvailable={quantityAvailable}
        viewMode={viewMode}
        setSelectedItem={setSelectedItem}
      />
    );
  })
}

export default function InventoryItemList({ items, catalogItems, viewMode, setSelectedItem }: InventoryItemListProps) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-theme-secondary">
        <div className="text-center">
          <p className="text-lg font-medium">No items found</p>
          <p className="text-sm mt-2">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  const inventoryItemsGrouped = groupInventoryByCatalogItem(items);

  if (viewMode === 'grid-view') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
        {renderGroupedInventoryItems(catalogItems, inventoryItemsGrouped, viewMode, setSelectedItem)}
      </div>
    );
  }

  // List view
  return (
    <div className="flex flex-col space-y-2 p-6">
        {renderGroupedInventoryItems(catalogItems, inventoryItemsGrouped, viewMode, setSelectedItem)}
    </div>
  );
}

