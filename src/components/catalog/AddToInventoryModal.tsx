import { useState } from 'react';
import type { CatalogItem } from '../../types/catalog';

interface AddToInventoryModalProps {
  template: CatalogItem;
  currentInventoryCount: number;
  currentAvailableCount: number;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
}

export default function AddToInventoryModal({ 
  template, 
  currentInventoryCount,
  currentAvailableCount,
  onClose, 
  onConfirm 
}: AddToInventoryModalProps) {
  const [quantity, setQuantity] = useState(1);
  const MAX_QUANTITY = 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(quantity);
  };

  const categoryColors: Record<string, string> = {
    Biology: 'text-green-800 dark:text-green-200',
    Chemistry: 'text-blue-800 dark:text-blue-200',
    'Earth Science': 'text-amber-800 dark:text-amber-200',
    General: 'text-gray-800 dark:text-gray-200',
    Physics: 'text-purple-800 dark:text-purple-200',
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      
      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-theme-surface border border-theme rounded-lg shadow-xl max-w-lg w-full overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-theme/50 bg-theme-secondary/5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-theme-primary mb-1">
                    Add to Inventory
                  </h2>
                  <p className="text-sm text-theme-secondary">
                    Create new inventory items from template
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-theme-secondary hover:text-theme-primary transition-colors p-1"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Template Reference with Current Inventory */}
              <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-4 bg-blue-50/30 dark:bg-blue-950/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-700 rounded text-xs font-medium text-blue-700 dark:text-blue-300">
                    Template
                  </span>
                  {/* Current Inventory Badge */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-theme-secondary">Current inventory:</span>
                    <span className="px-2 py-0.5 bg-theme-secondary/10 border border-theme rounded font-mono font-semibold text-theme-primary">
                      {currentInventoryCount}
                    </span>
                    {currentAvailableCount < currentInventoryCount && (
                      <span className="text-theme-secondary">
                        ({currentAvailableCount} available)
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-theme-primary mb-1">
                  {template.displayName}
                </h3>
                <p className="text-sm font-mono text-theme-secondary mb-3">
                  {template.sku}
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[tag] || categoryColors.General}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity Input */}
              <div className="space-y-3">
                <label htmlFor="quantity" className="text-sm font-medium text-theme-secondary block">
                  How many items to create? <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border-2 border-theme rounded hover:bg-theme-hover transition-colors text-lg font-bold text-theme-primary"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={MAX_QUANTITY}
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(MAX_QUANTITY, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="flex-1 px-4 py-3 border-2 border-theme rounded bg-theme-surface text-theme-primary text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(MAX_QUANTITY, quantity + 1))}
                    className="w-10 h-10 border-2 border-theme rounded hover:bg-theme-hover transition-colors text-lg font-bold text-theme-primary"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-theme-secondary">
                  Maximum {MAX_QUANTITY} items per batch
                </p>
              </div>

              {/* Preview with Math */}
              <div className="border border-theme rounded-lg p-4 bg-theme-secondary/5">
                <p className="text-sm text-theme-primary mb-2">
                  <span className="font-semibold">Creating:</span> {quantity} new inventory {quantity === 1 ? 'item' : 'items'}
                </p>
                <div className="flex items-center gap-2 text-sm text-theme-secondary">
                  <span className="font-mono">{currentInventoryCount}</span>
                  <span>current</span>
                  <span className="text-lg">+</span>
                  <span className="font-mono font-semibold text-theme-primary">{quantity}</span>
                  <span>new</span>
                  <span className="text-lg">=</span>
                  <span className="font-mono font-semibold text-theme-primary">{currentInventoryCount + quantity}</span>
                  <span>total</span>
                </div>
                <p className="text-xs text-theme-secondary mt-2">
                  These items will be added to your inventory and available for checkout
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-theme/50 bg-theme-secondary/5 flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-theme rounded hover:bg-theme-hover transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium"
              >
                Create {quantity} {quantity === 1 ? 'Item' : 'Items'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
