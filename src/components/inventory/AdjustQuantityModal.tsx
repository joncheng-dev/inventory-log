import { useState } from 'react';
import type { InventoryItemGroupedType } from '../../types/inventory';
import type { CatalogItem as CatalogItemType } from '../../types/catalog';

interface AdjustQuantityModalProps {
  item: InventoryItemGroupedType;
  catalogTemplate: CatalogItemType;
  onClose: () => void;
  onConfirm: (catalogItemId: string, newTotal: number) => void;
}

type AdjustmentType = 'increase' | 'decrease';

export default function AdjustQuantityModal({ 
  item, 
  catalogTemplate, 
  onClose, 
  onConfirm 
}: AdjustQuantityModalProps) {
  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>('increase');
  const [adjustmentAmount, setAdjustmentAmount] = useState(1);

  const isArchived = catalogTemplate.archived;
  const quantityCheckedOut = item.quantityTotal - item.quantityAvailable;
  const minimumAllowed = quantityCheckedOut;
  const MAX_ADJUSTMENT = 100; // Maximum items per batch operation
  
  const newTotal = adjustmentType === 'increase' 
    ? item.quantityTotal + adjustmentAmount 
    : Math.max(minimumAllowed, item.quantityTotal - adjustmentAmount);

  const isIncreaseDisabled = isArchived && adjustmentType === 'increase';

  const handleConfirm = () => {
    if (isIncreaseDisabled) return;
    if (adjustmentType === 'decrease' && item.quantityTotal - minimumAllowed === 0) return;
    onConfirm(item.catalogItemId, newTotal);
    onClose();
  };

  // Calculate max for input field
  const getMaxAdjustment = () => {
    if (adjustmentType === 'increase') {
      return MAX_ADJUSTMENT;
    } else {
      const maxRemovable = item.quantityTotal - minimumAllowed;
      return Math.min(MAX_ADJUSTMENT, maxRemovable);
    }
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
                  {item.displayName}
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
            {/* Current Quantity Display */}
            <div className="bg-theme-secondary/10 rounded-lg p-4 border border-theme/30">
              <div className="text-xs font-semibold text-theme-secondary uppercase tracking-wide mb-3">
                Current Status
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-theme-secondary mb-1">Total</div>
                  <div className="text-xl font-bold text-theme-primary">{item.quantityTotal}</div>
                </div>
                <div>
                  <div className="text-xs text-theme-secondary mb-1">Checked Out</div>
                  <div className="text-xl font-bold text-amber-600 dark:text-amber-400">
                    {quantityCheckedOut}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-theme-secondary mb-1">Available</div>
                  <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    {item.quantityAvailable}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-theme/30">
                <div className="text-xs font-semibold text-theme-secondary uppercase tracking-wide mb-2">
                  After Adjustment
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-theme-secondary">New Total:</span>
                  <span className={`text-2xl font-bold ${
                    adjustmentType === 'increase' 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {newTotal}
                  </span>
                  <span className={`text-lg font-semibold ${
                    adjustmentType === 'increase' 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {adjustmentType === 'increase' ? `(+${adjustmentAmount})` : `(−${adjustmentAmount})`}
                  </span>
                </div>
              </div>
            </div>

            {/* Archived Template Warning */}
            {isArchived && adjustmentType === 'increase' && (
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
            {adjustmentType === 'decrease' && quantityCheckedOut > 0 && (
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
            )}

            {/* Adjustment Type */}
            <div>
              <label className="text-sm font-medium text-theme-secondary mb-2 block">
                Adjustment Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setAdjustmentType('increase');
                    setAdjustmentAmount(1);
                    if (adjustmentAmount > MAX_ADJUSTMENT) {
                      setAdjustmentAmount(MAX_ADJUSTMENT);
                    }
                  }}
                  disabled={isArchived}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    adjustmentType === 'increase'
                      ? isArchived
                        ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/30 text-gray-500 dark:text-gray-400'
                        : 'border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'
                      : 'border-theme bg-theme-surface text-theme-secondary hover:bg-theme-hover'
                  } ${isArchived ? 'cursor-not-allowed opacity-60' : ''}`}
                > 
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="font-medium">Add Items</span>
                  </div>
                  {isArchived && adjustmentType === 'increase' && (
                    <div className="text-xs mt-1">(Template Archived)</div>
                  )}
                </button>

                <button
                  onClick={() => {
                    setAdjustmentType('decrease');
                    setAdjustmentAmount(1);
                    const maxRemovable = item.quantityTotal - minimumAllowed;
                    if (adjustmentAmount > Math.min(MAX_ADJUSTMENT, maxRemovable)) {
                      setAdjustmentAmount(Math.min(MAX_ADJUSTMENT, maxRemovable));
                    }
                  }}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    adjustmentType === 'decrease'
                      ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                      : 'border-theme bg-theme-surface text-theme-secondary hover:bg-theme-hover'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                    <span className="font-medium">Remove Items</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="text-sm font-medium text-theme-secondary mb-2 block">
                {adjustmentType === 'increase' ? 'Items to Add' : 'Items to Remove'}
              </label>
              <input
                type="number"
                min="1"
                max={getMaxAdjustment()}
                value={adjustmentAmount}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 1);
                  const maxAllowed = getMaxAdjustment();
                  setAdjustmentAmount(Math.min(value, maxAllowed));
                }}
                disabled={isIncreaseDisabled}
                className={`w-full px-4 py-3 bg-theme-surface border border-theme rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none text-theme-primary text-lg font-semibold ${
                  isIncreaseDisabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
              <p className="text-xs text-theme-secondary mt-1.5">
                {adjustmentType === 'increase' ? 'Maximum per adjustment: ' : 'Maximum removable: '}
                {getMaxAdjustment()}
                {adjustmentType === 'decrease' && item.quantityTotal - minimumAllowed === 0 && ' (all remaining items are checked out)'}
              </p>
            </div>

            {/* Batch Limit Info */}
            {adjustmentAmount >= MAX_ADJUSTMENT && (
              <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-300 dark:border-indigo-700 rounded-lg p-3">
                <div className="flex gap-2 items-start">
                  <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-indigo-800 dark:text-indigo-200">
                    <span className="font-semibold">Batch limit:</span> You can {adjustmentType === 'increase' ? 'add' : 'remove'} up to {MAX_ADJUSTMENT} items at a time. 
                    For larger adjustments, repeat this process.
                  </p>
                </div>
              </div>
            )}
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
              disabled={isIncreaseDisabled || (adjustmentType === 'decrease' && item.quantityTotal - minimumAllowed === 0)}
              className={`px-6 py-2 rounded transition-colors text-sm font-medium ${
                isIncreaseDisabled || (adjustmentType === 'decrease' && item.quantityTotal - minimumAllowed === 0)
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : adjustmentType === 'increase'
                  ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white'
              }`}
              title={
                isIncreaseDisabled 
                  ? 'Cannot add items - template is archived'
                  : (adjustmentType === 'decrease' && item.quantityTotal - minimumAllowed === 0)
                  ? 'Cannot remove - all remaining items are checked out'
                  : ''
              }
            >
              {isIncreaseDisabled 
                ? 'Cannot Add (Archived)'
                : (adjustmentType === 'decrease' && item.quantityTotal - minimumAllowed === 0)
                ? 'Cannot Remove'
                : `Confirm ${adjustmentType === 'increase' ? 'Addition' : 'Removal'}`
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
