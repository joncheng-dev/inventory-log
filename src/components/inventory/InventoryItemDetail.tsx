import { useState } from 'react';
import type { InventoryItem as InventoryItemType, InventoryItemGroupedType } from '../../types/inventory';

interface InventoryItemDetailProps {
  selectedItemDetails: InventoryItemGroupedType;
  relatedItems: InventoryItemType[];
  setAdjustQtyMode: React.Dispatch<React.SetStateAction<true | false>>;
  onClose: React.Dispatch<React.SetStateAction<InventoryItemType | null>>;
}

export default function InventoryItemDetail({ selectedItemDetails, relatedItems, setAdjustQtyMode, onClose }: InventoryItemDetailProps) {
  const [checkoutQuantity, setCheckoutQuantity] = useState(1);
  const [checkedOutBy, setCheckedOutBy] = useState('');
  const currentUserEmail = 'joncheng.dev@gmail.com';
  
  const {
    catalogItemId,
    displayName,
    sku,
    description,
    location,
    tags,
    quantityTotal,
    quantityAvailable
  } = selectedItemDetails;

  const categoryColors: Record<string, string> = {
    Biology: 'text-green-800 dark:text-green-200',
    Chemistry: 'text-blue-800 dark:text-blue-200',
    'Earth Science': 'text-amber-800 dark:text-amber-200',
    General: 'text-gray-800 dark:text-gray-200',
    Physics: 'text-purple-800 dark:text-purple-200',
  };

  const statusColor = quantityAvailable > 0
    ? 'font-semibold text-emerald-600 dark:text-emerald-400'
    : 'font-semibold text-red-600 dark:text-red-400';

  const handleCheckout = () => {
    console.log(`Checking out ${checkoutQuantity} items to ${checkedOutBy}`);
    // onCheckout(checkoutQuantity, checkedOutBy);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />
      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={() => onClose(null)}
      >
        <div 
          className="bg-theme-surface border border-theme rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-theme/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-theme-primary mb-2">
                  {displayName}
                </h2>
                <div className="flex gap-1.5 flex-wrap">
                  {tags.map((cat) => (
                    <span
                      key={cat}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[cat] || categoryColors.General}`}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onClose(null)}
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
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-6">
              {/* Quantities - Prominent display */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-theme-secondary/10 rounded-lg p-4 border border-theme/30">
                  <div className="text-sm text-theme-secondary mb-1">Total Quantity</div>
                  <div className="text-2xl font-bold text-theme-primary">{quantityTotal}</div>
                </div>
                <div className="bg-theme-secondary/10 rounded-lg p-4 border border-theme/30">
                  <div className="text-sm text-theme-secondary mb-1">Available</div>
                  <div className={`text-2xl ${statusColor}`}>{quantityAvailable}</div>
                </div>
              </div>

              {/* Checkout Section */}
              {quantityAvailable > 0 && (
                <div className="bg-primary-500/5 border border-primary-500/20 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-theme-primary mb-3">Check Out Items</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-theme-secondary mb-1.5 block">
                        Quantity
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="1"
                          max={quantityAvailable}
                          value={checkoutQuantity}
                          onChange={(e) => setCheckoutQuantity(Math.min(parseInt(e.target.value) || 1, quantityAvailable))}
                          className="w-24 px-3 py-2 bg-theme-surface border border-theme rounded focus:ring-2 focus:ring-primary-500 focus:outline-none text-theme-primary"
                        />
                        <span className="text-sm text-theme-secondary">
                          of {quantityAvailable} available
                        </span>
                      </div>
                    </div>

                    {/* Read-only display */}
                    <div className="flex items-center gap-2 text-sm text-theme-secondary bg-theme-secondary/10 rounded px-3 py-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Checking out as: <span className="text-theme-primary font-medium">{currentUserEmail}</span></span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors font-medium"
                    >
                      Check Out {checkoutQuantity > 1 ? `${checkoutQuantity} Items` : 'Item'}
                    </button>
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-theme-secondary uppercase tracking-wide">SKU</label>
                  <p className="mt-1 text-theme-primary font-mono">{sku}</p>
                </div>

                {location && (
                  <div>
                    <label className="text-sm font-medium text-theme-secondary uppercase tracking-wide">Location</label>
                    <p className="mt-1 text-theme-primary">{location}</p>
                  </div>
                )}

                {description && (
                  <div>
                    <label className="text-sm font-medium text-theme-secondary uppercase tracking-wide">Description</label>
                    <p className="mt-1 text-theme-primary leading-relaxed">{description}</p>
                  </div>
                )}
              </div>

              {/* Currently Checked Out Items */}
              {relatedItems.some(item => item.isCheckedOut) && (
                <div>
                  <h3 className="text-sm font-medium text-theme-secondary uppercase tracking-wide mb-3">
                    Currently Checked Out ({relatedItems.filter(i => i.isCheckedOut).length})
                  </h3>
                  <div className="space-y-2">
                    {relatedItems.filter(invItem => invItem.isCheckedOut).map((invItem) => (
                      <div 
                        key={invItem.id}
                        className="bg-theme-secondary/5 rounded border border-theme/30 p-3 text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-theme-primary font-medium">{invItem.checkedOutBy}</p>
                            {invItem.dateCheckedOut && (
                              <p className="text-xs text-theme-secondary mt-0.5">
                                Since: {invItem.dateCheckedOut}
                              </p>
                            )}
                          </div>
                          <button className="px-3 py-1.5 text-sm border border-theme rounded hover:bg-theme-hover transition-colors">
                            Return
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-theme/50 bg-theme-secondary/5">
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => onClose(null)}
                className="px-4 py-2 border border-theme rounded hover:bg-theme-hover transition-colors text-sm font-medium"
              >
                Close
              </button>
              <button
                onClick={() => setAdjustQtyMode(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium"
              >
                Adjust Stock
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}