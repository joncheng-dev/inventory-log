import type { CatalogItem as CatalogItemType } from '../../types/catalog';
import type { ViewMode } from '../../types/user';

interface CatalogItemProps {
  catalogItem: CatalogItemType;
  viewMode: ViewMode;
  onSelectTemplate: (selectedTemplate: CatalogItemType) => Promise<void>;
}

export default function CatalogItem({ catalogItem, viewMode, onSelectTemplate }: CatalogItemProps) {
  if (!catalogItem) return null;

  const {
    displayName,
    sku,
    tags,
    archived
  } = catalogItem;

  const archivedStyles = {
    border: 'border-gray-300 dark:border-gray-600',
    badge: 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400',
    footer: 'bg-gray-50 dark:bg-gray-900/30',
    button: 'border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
    headerBorder: 'border-gray-200 dark:border-gray-700'
  };

  const activeStyles = {
    border: 'border-blue-300 dark:border-blue-700',
    badge: 'bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300',
    footer: 'bg-blue-50 dark:bg-blue-950/30',
    button: 'border-blue-400 dark:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300',
    headerBorder: 'border-blue-200 dark:border-blue-800',
  };

  const styles = archived ? archivedStyles : activeStyles;

  const categoryColors: Record<string, string> = {
    Biology: 'text-green-800 dark:text-green-200',
    Chemistry: 'text-blue-800 dark:text-blue-200',
    'Earth Science': 'text-amber-800 dark:text-amber-200',
    General: 'text-gray-800 dark:text-gray-200',
    Physics: 'text-purple-800 dark:text-purple-200',
  };

  if (viewMode === 'grid') {
    return (
      <div className={`bg-theme-surface border-2 border-dashed ${styles.border} rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative ${archived ? 'opacity-75' : ''}`}>
        {/* Badge */}
        <div className={`absolute top-2 right-2 px-2 py-0.5 border rounded text-xs font-medium ${styles.badge}`}>
          {archived ? 'Archived' : 'Template'}
        </div>
        
        {/* Header section */}
        <div className={`px-4 pt-4 pb-3 border-b ${styles.headerBorder}`}>
          <h3
            className={`text-lg font-semibold mb-2 truncate pr-20 ${archived ? 'text-theme-secondary' : 'text-theme-primary'}`}
            title={displayName}
          >
            {displayName}
          </h3>
          <div className="flex gap-2 overflow-hidden">
            {tags.map((cat) => (
              <span 
                key={cat} 
                className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${archived ? 'text-gray-500 dark:text-gray-400' : categoryColors[cat] || categoryColors.General}`}
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
            <p className="text-xs text-theme-secondary font-mono truncate">{sku}</p>
          </div>
        </div>

        {/* Action section */}
        <div className={`px-4 py-3 ${styles.footer}`}>
          <button
            className={`w-full px-4 py-2 border rounded-md transition-colors text-sm font-medium ${styles.button}`}
            onClick={() => onSelectTemplate(catalogItem)}
          >
            {archived ? 'View Archived' : 'View Template'}
          </button>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className={`bg-theme-surface border-2 border-dashed ${styles.border} rounded hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors ${archived ? 'opacity-75' : ''}`}>
      <div className="px-4 py-3 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className={`font-semibold truncate ${archived ? 'text-theme-secondary' : 'text-theme-primary'}`}>
              {displayName}
            </h3>
            <span className="text-xs text-theme-secondary font-mono flex-shrink-0">
              {sku}
            </span>
            <span className={`px-2 py-0.5 border rounded text-xs font-medium flex-shrink-0 ${styles.badge}`}>
              {archived ? 'Archived' : 'Template'}
            </span>
          </div>
          <div className="flex gap-2 mt-1 overflow-hidden">
            {tags.map((cat) => (
              <span
                key={cat}
                className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${archived ? 'text-gray-500 dark:text-gray-400' : categoryColors[cat] || categoryColors.General}`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm flex-shrink-0">
          <button
            className={`px-4 py-2 border rounded-md transition-colors text-sm font-medium ${styles.button}`}
            onClick={() => onSelectTemplate(catalogItem)}
          >
            {archived ? 'View Archived' : 'View Template'}
          </button>
        </div>
      </div>
    </div>
  );
}