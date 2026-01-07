import { useEffect } from "react";
import type { CatalogTemplate } from "../../types/catalog";

interface CatalogItemDetailProps {
  selectedTemplate: CatalogTemplate;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: React.Dispatch<React.SetStateAction<CatalogTemplate | null>>;
  onArchiveClick: (selectedTemplate: CatalogTemplate) => void;
  onRestoreClick: (selectedTemplate: CatalogTemplate) => void;
  onAddItemClick: (selectedTemplate: CatalogTemplate) => void;
}

export default function CatalogItemDetail({ 
  selectedTemplate, 
  setEditMode, 
  onClose, 
  onArchiveClick,
  onRestoreClick,
  onAddItemClick
}: CatalogItemDetailProps) {

  const {
    displayName,
    sku,
    description,
    location,
    tags,
    archived
  } = selectedTemplate;
  
  const categoryColors: Record<string, string> = {
    Biology: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    Chemistry: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    'Earth Science': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
    General: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200',
    Physics: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
  };
  
  const archivedStyles = {
    border: 'border-gray-300 dark:border-gray-600',
    badge: 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400',
    headerBorder: 'border-gray-200 dark:border-gray-700',
    headerBg: 'bg-gray-50 dark:bg-gray-900/30',
    infoBox: 'border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-900/20',
    infoText: 'text-gray-700 dark:text-gray-300'
  };

  const activeStyles = {
    border: 'border-blue-300 dark:border-blue-700',
    badge: 'bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300',
    headerBorder: 'border-blue-200 dark:border-blue-800',
    headerBg: 'bg-blue-50 dark:bg-blue-950/30',
    infoBox: 'border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20',
    infoText: 'text-blue-700 dark:text-blue-300'
  };

  const styles = archived ? archivedStyles : activeStyles;

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      
      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={() => onClose(null)}
      >
        <div 
          className={`bg-theme-surface border-2 border-dashed ${styles.border} rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Template Badge */}
          <div className={`px-6 py-4 border-b-2 border-dashed ${styles.headerBorder} ${styles.headerBg}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-1 border rounded text-sm font-medium ${styles.badge}`}>
                    {archived ? 'Archived Template' : 'Template'}
                  </span>
                </div>
                <h2 className={`text-xl font-semibold my-4 ${archived ? 'text-theme-secondary' : 'text-theme-primary'}`}>
                  {displayName}
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {tags.map((cat) => (
                    <span
                      key={cat}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${archived ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400' : categoryColors[cat] || categoryColors.General}`}
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
              {/* Template Information Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-theme-secondary uppercase tracking-wide">
                  Template Details
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-theme-secondary">SKU</label>
                    <p className="font-mono text-sm text-theme-primary border border-theme rounded px-3 py-2 bg-theme-secondary/5">
                      {sku}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs text-theme-secondary">Display Name</label>
                    <p className="text-sm text-theme-primary border border-theme rounded px-3 py-2 bg-theme-secondary/5">
                      {displayName}
                    </p>
                  </div>
                </div>

                {location && (
                  <div className="space-y-2">
                    <label className="text-xs text-theme-secondary">Default Location</label>
                    <p className="text-sm text-theme-primary border border-theme rounded px-3 py-2 bg-theme-secondary/5">
                      {location}
                    </p>
                  </div>
                )}

                {description && (
                  <div className="space-y-2">
                    <label className="text-xs text-theme-secondary">Description</label>
                    <p className="text-sm text-theme-primary border border-theme rounded px-3 py-2 bg-theme-secondary/5 leading-relaxed">
                      {description}
                    </p>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className={`border-2 border-dashed rounded-lg p-4 ${styles.infoBox}`}>
                <p className={`text-sm ${styles.infoText}`}>
                  {archived ? (
                    <>
                      <span className="font-semibold">This template is archived.</span>{' '}
                      It's hidden from the catalog and no new inventory items can be created from it. 
                      Restore it to make it available again.
                    </>
                  ) : (
                    <>
                      <span className="font-semibold">Note:</span> This is a catalog template. 
                      To create actual inventory items based on this template, use the "Add to Inventory" button below.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className={`px-6 py-4 border-t-2 border-dashed ${styles.headerBorder} ${styles.headerBg} flex gap-3 justify-end`}>
            {archived ? (
              <>
                <button
                  onClick={() => onClose(null)}
                  className="px-4 py-2 border border-theme rounded-md hover:bg-theme-hover transition-colors text-sm font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => onRestoreClick(selectedTemplate)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
                >
                  Restore
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onArchiveClick(selectedTemplate)}
                  className="px-4 py-2 border-2 border-amber-300 dark:border-amber-700 rounded-md hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors text-sm font-medium text-amber-700 dark:text-amber-300"
                >
                  Archive Template
                </button>
                <button
                  onClick={() => onClose(null)}
                  className="px-4 py-2 border border-theme rounded-md hover:bg-theme-hover transition-colors text-sm font-medium"
                >
                  Close
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 border-2 border-blue-400 dark:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md transition-colors text-sm font-medium"
                  >
                    Edit Template
                  </button>
                    <button
                      onClick={() => onAddItemClick(selectedTemplate)}
                    className="px-4 py-2 border-2 border-blue-400 dark:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md transition-colors text-sm font-medium"
                  >
                    Add to Inventory
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
