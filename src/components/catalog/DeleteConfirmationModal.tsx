import type { CatalogItem as CatalogItemType } from "../../types/catalog";

interface DeleteConfirmationModalProps {
  template: CatalogItemType;
  inventoryItemCount: number;
  checkedOutCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({ 
  template, 
  inventoryItemCount, 
  checkedOutCount,
  onConfirm, 
  onCancel 
}: DeleteConfirmationModalProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-theme-surface border-2 border-red-300 dark:border-red-700 rounded-lg shadow-xl max-w-md w-full">
          <div className="px-6 py-4 border-b border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
            <h3 className="text-lg font-bold text-red-900 dark:text-red-100">
              Delete Template?
            </h3>
          </div>
          
          <div className="px-6 py-4 space-y-4">
            <p className="text-theme-primary">
              Are you sure you want to delete the template <span className="font-semibold">"{template.displayName}"</span>?
            </p>
            
            {inventoryItemCount > 0 && (
              <div className="border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-lg p-4 bg-amber-50/50 dark:bg-amber-950/20">
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
                  <span className="font-semibold">⚠️ Warning:</span> This template has <span className="font-bold">{inventoryItemCount} inventory {inventoryItemCount === 1 ? 'item' : 'items'}</span>.
                </p>
                {checkedOutCount > 0 && (
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <span className="font-bold">{checkedOutCount}</span> of these {checkedOutCount === 1 ? 'is' : 'are'} currently checked out.
                  </p>
                )}
                <p className="text-sm text-amber-800 dark:text-amber-200 mt-2">
                  The template will be archived and hidden from the catalog, but existing inventory items will remain accessible.
                </p>
              </div>
            )}
            
            {inventoryItemCount === 0 && (
              <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-950/20">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  This template has no inventory items. It will be permanently removed from the catalog.
                </p>
              </div>
            )}
          </div>
          
          <div className="px-6 py-4 border-t border-theme/50 bg-theme-secondary/5 flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-theme rounded hover:bg-theme-hover transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors text-sm font-medium"
            >
              {inventoryItemCount > 0 ? 'Archive Template' : 'Delete Template'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
