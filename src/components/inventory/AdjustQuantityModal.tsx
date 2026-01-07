import { useState } from 'react';
import type { InventoryItemGroupedType } from '../../types/inventory';
import type { CatalogTemplate } from '../../types/catalog';

interface AdjustQuantityModalProps {
  item: InventoryItemGroupedType;
  catalogTemplate: CatalogTemplate;
  onClose: () => void;
  onConfirm: (catalogItemId: string, newTotal: number) => void;
}

export default function AdjustQuantityModal({ 
  item, 
  catalogTemplate, 
  onClose, 
  onConfirm 
}: AdjustQuantityModalProps) {
  const [adjustmentAmount, setAdjustmentAmount] = useState(1);

  const isArchived = catalogTemplate.archived;
  const quantityCheckedOut = item.quantityTotal - item.quantityAvailable;
  const minimumAllowed = quantityCheckedOut;
  const maxRemovable = item.quantityTotal - minimumAllowed;
  const MIN_ADJUSTMENT = -maxRemovable;
  const MAX_ADJUSTMENT = 100; // Maximum items per batch operation
  const confirmBtnDisabled =
    (isArchived && adjustmentAmount > 0) ||
    ((item.quantityTotal - minimumAllowed === 0) && adjustmentAmount < 0) ||
    adjustmentAmount === 0;
  
  const newTotal = item.quantityTotal + adjustmentAmount;  
  
  const categoryColors: Record<string, string> = {
    Biology: 'text-green-800 dark:text-green-200',
    Chemistry: 'text-blue-800 dark:text-blue-200',
    'Earth Science': 'text-amber-800 dark:text-amber-200',
    General: 'text-gray-800 dark:text-gray-200',
    Physics: 'text-purple-800 dark:text-purple-200',
  };
  
  const clamp = (value: number) => {
    return Math.min(Math.max(value, MIN_ADJUSTMENT), MAX_ADJUSTMENT);
  };

  const handleConfirm = () => {
    if (isArchived && adjustmentAmount > 0) return;
    if ((item.quantityTotal - minimumAllowed === 0) && adjustmentAmount < 0) return;
    if (adjustmentAmount === 0) return;
    onConfirm(item.catalogItemId, newTotal);
    setAdjustmentAmount(1);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]" />

      {/* Modal */}
      <div
        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-theme-surface border border-theme rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-theme/50 flex-shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-theme-primary mb-1">
                  Adjust Quantity
                </h2>
                <p className="text-sm text-theme-secondary">
                  Add or remove items created with this template
                </p>
              </div>
              <button
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

          {/* Content - Scrollable */}
          <div className="px-6 py-4 space-y-4 overflow-y-auto flex-1">
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
                    {item.quantityTotal}
                  </span>
                  <span className="text-theme-secondary">
                    ({item.quantityAvailable} available)
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-theme-primary mb-1">
                {catalogTemplate.displayName}
              </h3>
              <p className="text-sm font-mono text-theme-secondary mb-3">
                {catalogTemplate.sku}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {catalogTemplate.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[tag] || categoryColors.General}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Archived Template Warning */}
            {isArchived && adjustmentAmount > 0 && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <span className="font-semibold">Cannot add items:</span> This catalog template is archived. 
                      To add inventory, restore the template first or create new items from the catalog.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Checked Out Items Warning */}
            {/* {quantityCheckedOut > 0 && (
              <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-300 dark:border-indigo-700 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-indigo-800 dark:text-indigo-200">
                      <span className="font-semibold">Note:</span> {quantityCheckedOut} {quantityCheckedOut === 1 ? 'item is' : 'items are'} currently checked out. 
                      Total quantity cannot be reduced below {quantityCheckedOut}.
                    </p>
                  </div>
                </div>
              </div>
            )} */}

            {/* Quantity Input */}
            <div className="space-y-4">
              <label htmlFor="quantity" className="text-sm font-medium text-theme-secondary block">
                Add or remove up to 100 items in one batch. Items can only be removed if they're available (not checked out). <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAdjustmentAmount(num => clamp(num - 1))}
                  className="w-10 h-10 border-2 border-theme rounded hover:bg-theme-hover transition-colors text-lg font-bold text-theme-primary"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min={-MAX_ADJUSTMENT}
                  max={MAX_ADJUSTMENT}
                  required
                  value={adjustmentAmount}
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setAdjustmentAmount(0);
                      return;
                    }
                    const num = Number(e.target.value);
                    if (!Number.isNaN(num)) {
                      setAdjustmentAmount(clamp(num));
                    }
                  }}
                  className="flex-1 px-4 py-3 border-2 border-theme rounded bg-theme-surface text-theme-primary text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setAdjustmentAmount(num => clamp(num + 1))}
                  className="w-10 h-10 border-2 border-theme rounded hover:bg-theme-hover transition-colors text-lg font-bold text-theme-primary"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-theme-secondary">
                {adjustmentAmount > 0
                  ? `Maximum ${MAX_ADJUSTMENT} items per batch`
                  : `Maximum removable: ${maxRemovable} available item(s)`
                }
              </p>
            </div>

            {/* Batch Limit Info */}
            {Math.abs(adjustmentAmount) >= MAX_ADJUSTMENT && (
              <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-300 dark:border-indigo-700 rounded-lg p-3">
                <div className="flex gap-2 items-start">
                  <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-indigo-800 dark:text-indigo-200">
                    <span className="font-semibold">Batch limit:</span> You can {adjustmentAmount > 0 ? 'add' : 'remove'} up to {MAX_ADJUSTMENT} items at a time. 
                    For larger adjustments, repeat this process.
                  </p>
                </div>
              </div>
            )}

            {/* Preview with Math */}
            <div className="border border-theme rounded-lg p-4 bg-theme-secondary/5">
              {adjustmentAmount > 0 && (
                <p className="text-sm text-theme-primary mb-2">
                  <span className="font-semibold">Creating:</span> {adjustmentAmount} new inventory {adjustmentAmount === 1 ? 'item' : 'items'}
                </p>
              )}
              {adjustmentAmount <= 0 && (
                <p className="text-sm text-theme-primary mb-2">
                  <span className="font-semibold">Removing:</span> {Math.abs(adjustmentAmount)} inventory {Math.abs(adjustmentAmount) === 1 ? 'item' : 'items'}
                </p>
              )}
              <div className="flex items-center gap-2 text-sm text-theme-secondary">
                <span className="font-mono">{item.quantityTotal}</span>
                <span>current</span>
                <span className="text-lg">{adjustmentAmount > 0 ? '+' : '-' }</span>
                <span className="font-mono font-semibold text-theme-primary">{Math.abs(adjustmentAmount)}</span>
                <span>{adjustmentAmount > 0 ? 'new' : `${Math.abs(adjustmentAmount) === 1 ? 'item' : 'items'}`}</span>
                <span className="text-lg">=</span>
                <span className="font-mono font-semibold text-theme-primary">{item.quantityTotal + adjustmentAmount}</span>
                <span>total</span>
              </div>
              <p className="text-xs text-theme-secondary mt-2">
                {adjustmentAmount < 0 
                  ? adjustmentAmount === -1
                    ? 'This item will be removed from your inventory and no longer available for checkout'
                    : 'These items will be removed from your inventory and no longer available for checkout'
                  : adjustmentAmount > 0
                    && adjustmentAmount === 1
                      ? 'This item will be added to your inventory and available for checkout'                  
                      : 'These items will be added to your inventory and available for checkout'
                }
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-theme/50 bg-theme-secondary/5 flex gap-3 justify-end flex-shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-theme rounded hover:bg-theme-hover transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={confirmBtnDisabled}
              className={`px-6 py-2 rounded transition-colors text-sm font-medium 
                ${confirmBtnDisabled
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : adjustmentAmount > 0
                  ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white'
                }`}
              title={
                isArchived 
                  ? 'Cannot add items - template is archived'
                  : (item.quantityTotal - minimumAllowed === 0)
                  ? 'Cannot remove - all remaining items are checked out'
                  : ''
              }
            >
              {/* {isArchived 
                ? 'Cannot Add (Archived)'
                : (adjustmentType === 'decrease' && item.quantityTotal - minimumAllowed === 0)
                ? 'Cannot Remove'
                : `Confirm ${adjustmentType === 'increase' ? 'Addition' : 'Removal'}`
              } */}
              {adjustmentAmount > 0
                ? 'Confirm Addition'
                : 'Confirm Removal'
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
