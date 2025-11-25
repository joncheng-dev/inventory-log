import { useState, useEffect } from 'react';
import type { InventoryItemGroupedType } from '../../types/inventory';

interface AdjustQuantityModalProps {
  item: InventoryItemGroupedType;
  onClose: () => void;
  onConfirm: (catalogItemId: string, newTotal: number) => void;
}

export default function AdjustQuantityModal({ item, onClose, onConfirm }: AdjustQuantityModalProps) {
  const [newTotal, setNewTotal] = useState(item.quantityTotal);

  // Reset when item changes
  useEffect(() => {
    setNewTotal(item.quantityTotal);
  }, [item.catalogItemId, item.quantityTotal]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Calculate values
  const quantityCheckedOut = item.quantityTotal - item.quantityAvailable;
  const minAllowed = quantityCheckedOut;
  const projectedAvailable = newTotal - quantityCheckedOut;
  const difference = newTotal - item.quantityTotal;

  const handleSave = () => {
    onConfirm(item.catalogItemId, newTotal);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      
      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-theme-surface border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg shadow-xl max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b-2 border-dashed border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-blue-600 dark:bg-blue-700 border border-blue-700 dark:border-blue-600 rounded text-sm font-medium text-white">
                    Adjust Quantity
                  </span>
                </div>
                <h2 className="text-xl font-bold text-theme-primary mb-1">
                  {item.displayName}
                </h2>
                <p className="text-sm text-theme-secondary font-mono">
                  {item.sku}
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
            {/* Current Status */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-theme-secondary uppercase tracking-wide">
                Current Status
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="border border-theme rounded-lg p-3 bg-theme-secondary/5 text-center">
                  <div className="text-xs text-theme-secondary mb-1">Total</div>
                  <div className="text-2xl font-bold text-theme-primary">{item.quantityTotal}</div>
                </div>
                <div className="border border-theme rounded-lg p-3 bg-theme-secondary/5 text-center">
                  <div className="text-xs text-theme-secondary mb-1">Available</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{item.quantityAvailable}</div>
                </div>
                <div className="border border-theme rounded-lg p-3 bg-theme-secondary/5 text-center">
                  <div className="text-xs text-theme-secondary mb-1">Out</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{quantityCheckedOut}</div>
                </div>
              </div>
            </div>

            {/* Adjustment Controls */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-theme-secondary uppercase tracking-wide text-center">
                New Total Quantity
              </h3>
              
              <div className="flex items-center justify-center gap-6">
                {/* Decrement */}
                <button
                  type="button"
                  onClick={() => setNewTotal(prev => Math.max(minAllowed, prev - 1))}
                  disabled={newTotal <= minAllowed}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${
                    newTotal <= minAllowed 
                      ? 'bg-theme-secondary/10 text-theme-secondary/30 cursor-not-allowed' 
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 active:scale-95'
                  }`}
                >
                  −
                </button>

                {/* Number Display */}
                <div className="min-w-[5rem] text-center">
                  <div className="text-4xl font-bold text-theme-primary mb-1">
                    {newTotal}
                  </div>
                  {difference !== 0 && (
                    <div className={`text-sm font-medium ${difference > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {difference > 0 ? '+' : ''}{difference}
                    </div>
                  )}
                </div>

                {/* Increment */}
                <button
                  type="button"
                  onClick={() => setNewTotal(prev => prev + 1)}
                  className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 flex items-center justify-center text-2xl font-bold active:scale-95 transition-all"
                >
                  +
                </button>
              </div>

              {/* Projected Result */}
              <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-950/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700 dark:text-blue-300 font-medium">Projected Available:</span>
                  <span className="text-blue-900 dark:text-blue-100 font-bold text-lg">{projectedAvailable}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-blue-700 dark:text-blue-300 font-medium">Checked Out:</span>
                  <span className="text-blue-900 dark:text-blue-100 font-bold">{quantityCheckedOut} (locked)</span>
                </div>
              </div>

              {/* Warning Message */}
              {newTotal <= minAllowed && (
                <div className="border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-lg p-3 bg-amber-50/50 dark:bg-amber-950/20">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <span className="font-semibold">⚠️ Cannot reduce further.</span> {minAllowed} {minAllowed === 1 ? 'item is' : 'items are'} currently checked out.
                  </p>
                </div>
              )}

              {/* Action Preview */}
              {difference !== 0 && (
                <div className="text-sm text-center text-theme-secondary">
                  {difference > 0 ? (
                    <>Will create <span className="font-semibold text-theme-primary">{difference}</span> new {difference === 1 ? 'item' : 'items'}</>
                  ) : (
                    <>Will remove <span className="font-semibold text-theme-primary">{Math.abs(difference)}</span> available {Math.abs(difference) === 1 ? 'item' : 'items'}</>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t-2 border-dashed border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-theme rounded hover:bg-theme-hover transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={newTotal === item.quantityTotal}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
