import { useState } from 'react';
import type { InventoryItem as InventoryItemType, InventoryItemGroupedType } from '../../types/inventory';
import { useAuth } from '../../auth/AuthContext';
import { formatDate } from '../../utils/formatters';

interface InventoryItemDetailProps {
  selectedItemDetails: InventoryItemGroupedType;
  relatedItems: InventoryItemType[];
  setAdjustQtyMode: React.Dispatch<React.SetStateAction<true | false>>;
  onCheckout: (qtyToCheckOut: number) => void;
  onReturnItem: (itemId: string) => void;
  onReturnAllMyItems: () => void;
  onClose: () => void;
  isBlurred?: boolean;
}

export default function InventoryItemDetail({
  selectedItemDetails,
  relatedItems,
  setAdjustQtyMode,
  onCheckout,
  onReturnItem,
  onReturnAllMyItems,
  onClose,
  isBlurred = false
}: InventoryItemDetailProps) {
  const [checkoutQuantity, setCheckoutQuantity] = useState(1);
  const { userProfile, isAdmin } = useAuth(); // user email is "userProfile.email"
  if (!userProfile) {
    throw new Error("InventoryItemDetail rendered without a signed-in user");
  }
  
  const {
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

  // Group checked out items
  const checkedOutItems = relatedItems
    .filter(item => item.isCheckedOut)
    .reduce((acc, item) => {
      const user = item.checkedOutBy || 'Unknown';
      if (!acc[user]) acc[user] = [];
      acc[user].push(item);
      return acc;
    }, {} as Record<string, InventoryItemType[]>);

  const myItems = checkedOutItems[userProfile.email] || [];
  const otherUsersItems = Object.entries(checkedOutItems)
    .filter(([user]) => user !== userProfile.email);

  const onCheckoutClick = () => {
    setCheckoutQuantity(1);
    onCheckout(checkoutQuantity);
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={() => !isBlurred && onClose()}
      >
        <div 
          className={`bg-theme-surface border border-theme rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col transition-all duration-200 
            ${isBlurred ? 'blur-sm opacity-50 pointer-events-none' : ''}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-theme/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-theme-primary mb-2">
                  {displayName}
                </h2>
                <div className="flex gap-2 flex-wrap">
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
                onClick={() => onClose()}
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
              {/* Quantities */}
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
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-theme-primary mb-3">Check Out Items</h3>
                  
                  <div className="space-y-4">
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
                          className="w-24 px-3 py-2 bg-theme-surface border border-theme rounded focus:ring-2 focus:ring-amber-500 focus:outline-none text-theme-primary"
                        />
                        <span className="text-sm text-theme-secondary">
                          of {quantityAvailable} available
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-theme-secondary bg-theme-secondary/10 rounded px-3 py-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Checking out as: <span className="text-theme-primary font-medium">{userProfile.email}</span></span>
                    </div>

                    <button
                      onClick={() => onCheckoutClick()}
                      className="w-full px-4 py-2 bg-amber-600 dark:bg-amber-600 text-white rounded-md hover:bg-amber-700 dark:hover:bg-amber-700 transition-colors font-medium"
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
              {Object.keys(checkedOutItems).length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-theme-secondary uppercase tracking-wide mb-3">
                    Currently Checked Out ({relatedItems.filter(i => i.isCheckedOut).length})
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Your Items */}
                    {myItems.length > 0 && (
                      <div className="border border-theme rounded-lg overflow-hidden">
                        <div className="bg-theme-secondary/10 px-4 py-2 border-b border-theme/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-theme-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="text-sm font-medium text-theme-primary">
                                Your Items ({myItems.length})
                              </span>
                            </div>
                            {myItems.length > 1 && (
                              <button
                                onClick={onReturnAllMyItems}
                                className="text-xs px-3 py-1 border border-theme text-theme-primary rounded-md hover:bg-theme-hover transition-colors font-medium"
                              >
                                Return All ({myItems.length})
                              </button>
                            )}
                          </div>
                        </div>
                        
                        <div className="divide-y divide-theme/50">
                          {myItems.map((item) => (
                            <div key={item.id} className="px-4 py-3 hover:bg-theme-hover transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <p className="text-sm text-theme-primary font-medium">
                                    {item.checkedOutBy}
                                  </p>
                                  {item.dateCheckedOut && (
                                    <p className="text-xs text-theme-secondary mt-0.5">
                                      Checked out: {formatDate(item.dateCheckedOut)}
                                    </p>
                                  )}
                                </div>
                                <button
                                  onClick={() => onReturnItem(item.id)}
                                  className="px-4 py-2 text-sm border border-theme text-theme-primary rounded-md hover:bg-theme-hover transition-colors font-medium"
                                >
                                  Return
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Other Users' Items */}
                    {otherUsersItems.length > 0 && (
                      <div className="border border-theme rounded-lg overflow-hidden">
                        <div className="bg-theme-secondary/10 px-4 py-2 border-b border-theme/50">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-theme-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-sm font-medium text-theme-primary">
                              Other Users ({otherUsersItems.reduce((sum, [_, items]) => sum + items.length, 0)})
                            </span>
                          </div>
                        </div>
                        
                        <div className="divide-y divide-theme/50">
                          {otherUsersItems.map(([user, items]) => (
                            <div key={user}>
                              {items.map((item) => (
                                <div key={item.id} className="px-4 py-3 bg-theme-secondary/5">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <p className="text-sm text-theme-primary font-medium">
                                        {item.checkedOutBy}
                                      </p>
                                      {item.dateCheckedOut && (
                                        <p className="text-xs text-theme-secondary mt-0.5">
                                          Checked out: {formatDate(item.dateCheckedOut)}
                                        </p>
                                      )}
                                    </div>
                                    <span className="text-xs text-theme-secondary italic">
                                      View only
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-theme/50 bg-theme-secondary/5">
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => onClose()}
                className="px-4 py-2 border border-theme rounded-md hover:bg-theme-hover transition-colors text-sm font-medium"
              >
                Close
              </button>
              {isAdmin &&
                <button
                  onClick={() => setAdjustQtyMode(true)}
                  className="px-4 py-2 border border-blue-400 dark:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md transition-colors text-sm font-medium"
                >
                  Adjust Quantity
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
