import type { InventoryItem as InventoryItemType } from '../../types/inventory';
import InventoryItem from './InventoryItem';

interface InventoryItemListProps {
  items: InventoryItemType[];
  viewMode: 'grid-view' | 'list-view';
}

export default function InventoryItemList({ items, viewMode }: InventoryItemListProps) {
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

  if (viewMode === 'grid-view') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
        {items.map((item) => (
          <InventoryItem key={item.id} item={item} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="flex flex-col space-y-2 p-6">
      {items.map((item) => (
        <InventoryItem key={item.id} item={item} viewMode={viewMode} />
      ))}
    </div>
  );
}

