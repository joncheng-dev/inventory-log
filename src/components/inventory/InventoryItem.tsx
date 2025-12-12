import type { InventoryItemGroupedType } from '../../types/inventory';
import type { CatalogItem as CatalogItemType } from '../../types/catalog';

interface InventoryItemProps {
  item: InventoryItemGroupedType | null;
  catalogItem: CatalogItemType;
  viewMode: 'grid-view' | 'list-view';
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItemGroupedType | null>>;
}

export default function InventoryItem({ item, catalogItem, viewMode, setSelectedItem }: InventoryItemProps) {
  if (!item) return null;

  const categoryColors: Record<string, string> = {
    Biology: 'text-green-800 dark:text-green-200',
    Chemistry: 'text-blue-800 dark:text-blue-200',
    'Earth Science': 'text-amber-800 dark:text-amber-200',
    General: 'text-gray-800 dark:text-gray-200',
    Physics: 'text-purple-800 dark:text-purple-200',
  };

  const statusColor = item.quantityAvailable > 0
    ? 'ml-1.5 font-semibold text-emerald-600 dark:text-emerald-400'
    : 'ml-1.5 font-semibold text-red-600 dark:text-red-400';

  if (viewMode === 'grid-view') {
    return (
      <div className="bg-theme-surface border border-theme rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Header section */}
        <div className="px-4 pt-4 pb-3 border-b border-theme">
          <h3
            className="text-lg font-semibold text-theme-primary mb-2 truncate"
            title={catalogItem.displayName}
          >
            {catalogItem.displayName}
          </h3>
          <div className="flex gap-2 overflow-hidden">
            {catalogItem.tags.map((cat) => (
              <span 
                key={cat} 
                className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${categoryColors[cat] || categoryColors.General}`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Info section */}
        <div className="px-4 py-3 space-y-2">
          <p className="text-xs text-theme-secondary font-mono truncate">{catalogItem.sku}</p>
          
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-theme-secondary">Total:</span>
              <span className="ml-1.5 font-semibold text-theme-primary">{item.quantityTotal}</span>
            </div>
            <div>
              <span className="text-theme-secondary">Available:</span>
              <span className={statusColor}>{item.quantityAvailable}</span>
            </div>
          </div>
        </div>

        {/* Action section */}
        <div className="px-4 py-3 bg-theme-secondary/10">
          <button
            className="w-full px-4 py-2 border border-theme rounded-md hover:bg-theme-hover transition-colors text-sm font-medium"
            onClick={() => setSelectedItem(item)}
          >
            View Details
          </button>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="bg-theme-surface border border-theme rounded hover:bg-theme-hover transition-colors">
      <div className="px-4 py-3 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3">
            <h3 className="font-semibold text-theme-primary truncate">
              {catalogItem.displayName}
            </h3>
            <span className="text-xs text-theme-secondary font-mono flex-shrink-0">
              {catalogItem.sku}
            </span>
          </div>
          <div className="flex gap-2 mt-1 overflow-hidden">
            {catalogItem.tags.map((cat) => (
              <span
                key={cat}
                className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${categoryColors[cat] || categoryColors.General}`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm flex-shrink-0">
          <span className="text-theme-secondary">
            <span className="font-semibold text-theme-primary">{item.quantityTotal}</span> total
          </span>
          <span className="text-theme-secondary">
            <span className={statusColor}>{item.quantityAvailable}</span> available
          </span>
          <button
            className="px-4 py-2 border border-theme rounded-md hover:bg-theme-surface transition-colors text-sm font-medium"
            onClick={() => setSelectedItem(item)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

