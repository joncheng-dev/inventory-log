import InventoryItem from './InventoryItem';
import type { InventoryItem as InventoryItemType } from '../../types/inventory';
import type { CatalogItem } from '../../types/catalog';

interface InventoryItemListProps {
  items: InventoryItemType[];
  catalogItems: CatalogItem[];
  viewMode: 'grid-view' | 'list-view';
}

function countAvailability(groupedItems: InventoryItemType[]): number {
  let numAvailable = 0;
  groupedItems.forEach(item => {
    if (item.isCheckedOut === false) numAvailable++;
  });
  return numAvailable;
}

function renderGroupedInventoryItems(
  catalogItems: CatalogItem[],
  inventoryItems: Record<string, InventoryItemType[]>,
  viewMode: 'grid-view' | 'list-view'
) {
  return Object.entries(inventoryItems).map(([catalogItemId, groupedItems]) => {
    const catalogItem = catalogItems.find(cat => cat.id === catalogItemId);
    if (!catalogItem) return null;
    const quantityTotal = groupedItems.length;
    const quantityAvailable = countAvailability(groupedItems);
    return (
      <InventoryItem
        key={catalogItemId}
        item={groupedItems[0]}
        catalogItem={catalogItem}
        quantityTotal={quantityTotal}
        quantityAvailable={quantityAvailable}
        viewMode={viewMode}
      />
    );
  })
}

export default function InventoryItemList({ items, catalogItems, viewMode }: InventoryItemListProps) {
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

  const inventoryItemsGrouped: Record<string, InventoryItemType[]> = {};
  items.forEach((invItem) => {
    if (!inventoryItemsGrouped[invItem.catalogItemId]) {
      inventoryItemsGrouped[invItem.catalogItemId] = [];
    }
    inventoryItemsGrouped[invItem.catalogItemId].push(invItem);
  });

  if (viewMode === 'grid-view') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
        {renderGroupedInventoryItems(catalogItems, inventoryItemsGrouped, viewMode)}
      </div>
    );
  }

  // List view
  return (
    <div className="flex flex-col space-y-2 p-6">
        {renderGroupedInventoryItems(catalogItems, inventoryItemsGrouped, viewMode)}
    </div>
  );
}

