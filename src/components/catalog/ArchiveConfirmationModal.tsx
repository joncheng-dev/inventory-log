import { useEffect } from 'react';
import type { CatalogTemplate, InventoryCounts } from "../../types/catalog";

interface ArchiveConfirmationModalProps {
  template: CatalogTemplate;
  counts: InventoryCounts;
  onArchiveConfirm: (selectedItem: CatalogTemplate) => void;
  onCancel: () => void;
}

export default function ArchiveConfirmationModal({ 
  template, 
  counts,
  onArchiveConfirm, 
  onCancel 
}: ArchiveConfirmationModalProps) {
  const { total, checkedOut } = counts;
  
  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      
      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onCancel}
      >
        <div 
          className="bg-theme-surface border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-lg shadow-xl max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b-2 border-dashed border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-amber-600 dark:bg-amber-700 border border-amber-700 dark:border-amber-600 rounded text-sm font-medium text-white">
                    Archive Template
                  </span>
                </div>
                <h2 className="text-xl font-bold text-theme-primary">
                  {template.displayName}
                </h2>
              </div>
              <button
                type="button"
                onClick={onCancel}
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
          <div className="px-6 py-4 space-y-4">
            <p className="text-theme-primary">
              Are you sure you want to archive this template?
            </p>
            
            <div className="border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-lg p-4 bg-amber-50/50 dark:bg-amber-950/20 space-y-2 text-sm text-amber-800 dark:text-amber-200">
              {total > 0 ? (
                <p>
                  This template has <span className="font-semibold">{total} inventory {total === 1 ? 'item' : 'items'}</span>
                  {checkedOut > 0 && (
                    <span> ({checkedOut} currently checked out)</span>
                  )}. Existing items and checkouts are unaffected.
                </p>
              ) : (
                <p>This template has no inventory items.</p>
              )}
              <p>The template will be hidden from the catalog and no new items can be created from it.</p>
              <p className="text-amber-700 dark:text-amber-300 italic">You can restore it at any time.</p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t-2 border-dashed border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              autoFocus
              className="px-4 py-2 border border-theme rounded hover:bg-theme-hover transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onArchiveConfirm(template)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded transition-colors text-sm font-medium"
            >
              Archive Template
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
