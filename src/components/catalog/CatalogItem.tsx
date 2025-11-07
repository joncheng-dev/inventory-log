import type { CatalogItem } from '../../types/catalog';

interface CatalogItemProps {
  catalogItem: CatalogItem;
  viewMode: 'grid-view' | 'list-view';
}

export default function CatalogItem({ catalogItem, viewMode }: CatalogItemProps) {
  if (!catalogItem) return null;

  const categoryColors: Record<string, string> = {
    Biology: 'text-green-800 dark:text-green-200',
    Chemistry: 'text-blue-800 dark:text-blue-200',
    'Earth Science': 'text-amber-800 dark:text-amber-200',
    General: 'text-gray-800 dark:text-gray-200',
    Physics: 'text-purple-800 dark:text-purple-200',
  };

  if (viewMode === 'grid-view') {
    return (
      <div className="bg-theme-surface border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
        {/* Template Badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-700 rounded text-xs font-medium text-blue-700 dark:text-blue-300">
          Template
        </div>
        
        {/* Header section */}
        <div className="px-4 pt-4 pb-3 border-b border-blue-200 dark:border-blue-800">
          <h3
            className="text-lg font-semibold text-theme-primary mb-2 truncate pr-20"
            title={catalogItem.displayName}
          >
            {catalogItem.displayName}
          </h3>
          <div className="flex gap-1.5 overflow-hidden">
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
          <div className="flex items-center gap-2">
            <span className="text-xs text-theme-secondary">SKU:</span>
            <p className="text-xs text-theme-secondary font-mono truncate">{catalogItem.sku}</p>
          </div>
        </div>

        {/* Action section */}
        <div className="px-4 py-3 bg-blue-50 dark:bg-blue-950/30">
          <button
            className="w-full px-3 py-2 border-2 border-blue-400 dark:border-blue-600 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium text-blue-700 dark:text-blue-300"
          >
            View Template
          </button>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="bg-theme-surface border-2 border-dashed border-blue-300 dark:border-blue-700 rounded hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors">
      <div className="px-4 py-2.5 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className="font-semibold text-theme-primary truncate">
              {catalogItem.displayName}
            </h3>
            <span className="text-xs text-theme-secondary font-mono flex-shrink-0">
              {catalogItem.sku}
            </span>
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-700 rounded text-xs font-medium text-blue-700 dark:text-blue-300 flex-shrink-0">
              Template
            </span>
          </div>
          <div className="flex gap-1.5 mt-1 overflow-hidden">
            {catalogItem.tags.map((cat) => (
              <span
                key={cat}
                className={`px-1.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${categoryColors[cat] || categoryColors.General}`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm flex-shrink-0">
          <button
            className="px-3 py-1.5 border-2 border-blue-400 dark:border-blue-600 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium text-blue-700 dark:text-blue-300"
          >
            View Template
          </button>
        </div>
      </div>
    </div>
  );
}
