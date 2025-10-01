import type { InventoryItem as InventoryItemType } from '../../types/inventory';

interface InventoryItemProps {
  item: InventoryItemType;
  viewMode: 'grid-view' | 'list-view';
}

export default function InventoryItem({ item, viewMode }: InventoryItemProps) {
  const categoryColors: Record<string, string> = {
    Biology: 'text-green-800 dark:text-green-200',
    Chemistry: 'text-blue-800 dark:text-blue-200',
    'Earth Science': 'text-amber-800 dark:text-amber-200',
    General: 'text-gray-800 dark:text-gray-200',
    Physics: 'text-purple-800 dark:text-purple-200',
  };

  const statusColor = item.isCheckedOut
    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';

  if (viewMode === 'grid-view') {
    return (
      <div className="bg-theme-surface border border-theme rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-theme-primary mb-2">
              {item.name}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {item.categories.map((cat) => (
                <span key={cat} className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[cat] || categoryColors.General}`}>
                  {cat}
                </span>
              ))}
              <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
                {item.isCheckedOut ? 'Checked Out' : 'Available'}
              </span>
            </div>
            <div className="text-sm text-theme-secondary space-y-1">
              <p>SKU: {item.sku}</p>
              {item.quantity && <p>Quantity: {item.quantity}</p>}
              {item.isCheckedOut && item.checkedOutBy && (
                <p className="text-xs mt-2">
                  By: {item.checkedOutBy}
                  {item.checkOutDate && <span className="block">Since: {item.checkOutDate}</span>}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-4 pt-3 border-t border-theme">
            <button className="flex-1 px-3 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors text-sm font-medium">
              {item.isCheckedOut ? 'Return' : 'Check Out'}
            </button>
            <button className="px-3 py-2 border border-theme rounded hover:bg-theme-hover transition-colors text-sm font-medium">
              Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="bg-theme-surface border border-theme rounded p-3 hover:bg-theme-hover transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-theme-primary truncate">
            {item.name}
          </h3>
          <p className="text-sm text-theme-secondary">SKU: {item.sku}</p>
          <div className="flex gap-2 items-center mt-2">
            <button className="hover:bg-theme-surface transition-colors text-sm font-medium underline">
              Details
            </button>
            <div className='border-r border-theme-primary h-4 w-1'></div>
            <div className="flex flex-wrap gap-2 items-center">
              {item.categories.map((cat) => (
                <span key={cat} className={`rounded text-xs font-medium whitespace-nowrap ${categoryColors[cat] || categoryColors.General}`}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
            {item.isCheckedOut && item.checkedOutBy && (
                <div className="text-xs text-theme-secondary min-w-[150px]">
                <p className="truncate">{item.checkedOutBy}</p>
                {item.checkOutDate && <p>{item.checkOutDate}</p>}
                </div>
            )}
            <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap min-w-[100px] text-center ${statusColor}`}>
                {item.isCheckedOut ? 'Checked Out' : 'Available'}
            </span>
            <button className="px-3 py-1.5 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors text-sm font-medium w-32">
              {item.isCheckedOut ? 'Return' : 'Check Out'}
            </button>
          </div>
      </div>
    </div>
  );
}

