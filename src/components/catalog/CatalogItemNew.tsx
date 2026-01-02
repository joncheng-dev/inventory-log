import { useState, useEffect } from 'react';
import type { CatalogTemplate, CatalogItemFormData } from "../../types/catalog";
import { useCatalog } from '../../contexts/CatalogContext';

interface CatalogItemNewProps {
  onClose: () => void;
  onSave: (newItem: Omit<CatalogTemplate, "id">) => void;
}

export default function CatalogItemNew({ onClose, onSave }: CatalogItemNewProps) {
  const { catalogItems, availableTags } = useCatalog();
  const [skuValid, setSkuValid] = useState<true | false>(false);
  const [skuTouched, setSkuTouched] = useState<true | false>(false);

  const [formData, setFormData] = useState<CatalogItemFormData>({
    displayName: '',
    sku: '',
    description: '',
    location: '',
    tags: [],
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const trimmedSku = formData.sku.trim();
    const skuIsDuplicate = catalogItems.some(
      item => item.sku === formData.sku
    );
    setSkuValid(trimmedSku.length > 0 && !skuIsDuplicate);
  }, [catalogItems, formData.sku]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
    });
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const isFormValid = formData.displayName.trim() && formData.sku.trim() && formData.tags.length > 0 && skuValid;

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
          className="bg-theme-surface border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
            {/* Header */}
            <div className="px-6 py-4 border-b-2 border-dashed border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 flex-shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-blue-600 dark:bg-blue-700 border border-blue-700 dark:border-blue-600 rounded text-sm font-medium text-white">
                      New Template
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-theme-primary mb-1">
                    {formData.displayName || 'Untitled Template'}
                  </h2>
                  {formData.sku && (
                    <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mb-1">
                      {formData.sku}
                    </p>
                  )}
                  <p className="text-sm text-theme-secondary">
                    Create a new template for inventory items
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
            <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
              <div className="space-y-6">
                {/* Info Box */}
                <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-950/20">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <span className="font-semibold">💡 Tip:</span> Templates define the shared details for inventory items. You can create multiple inventory items from this template later.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-theme-secondary uppercase tracking-wide">
                    Template Details
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* SKU */}
                    <div className="space-y-2">
                      <label htmlFor="sku" className="text-sm font-medium text-theme-secondary">
                        SKU <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="sku"
                        type="text"
                        required
                        value={formData.sku}
                        onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                        onBlur={(e) => {
                          setFormData(prev => ({ ...prev, sku: e.target.value.trim() }));
                          setSkuTouched(true);
                        }}
                        className={`w-full px-3 py-2 border-2 rounded bg-theme-surface text-theme-primary font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          skuTouched && !skuValid 
                            ? 'border-red-500' 
                            : 'border-blue-300 dark:border-blue-700'
                        }`}
                        placeholder="e.g., BIO-001"
                      />
                      {skuTouched && !skuValid && (
                        <p className='text-xs text-red-500'>
                        { formData.sku.trim().length === 0
                          ? 'SKU is required.'
                          : 'This SKU is in use.'
                        }  
                      </p>
                      )}
                      <p className="text-xs text-theme-secondary">
                        Unique identifier for this template
                      </p>
                    </div>
                    
                    {/* Display Name */}
                    <div className="space-y-2">
                      <label htmlFor="displayName" className="text-sm font-medium text-theme-secondary">
                        Display Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="displayName"
                        type="text"
                        required
                        value={formData.displayName}
                        onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                        className="w-full px-3 py-2 border-2 border-blue-300 dark:border-blue-700 rounded bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Microscope Slide"
                      />
                      <p className="text-xs text-theme-secondary">
                        How this item will appear in lists
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium text-theme-secondary">
                      Default Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border-2 border-blue-300 dark:border-blue-700 rounded bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Room 204, Cabinet A"
                    />
                    <p className="text-xs text-theme-secondary">
                      Default location for items created from this template
                    </p>
                  </div>

                  {/* Categories */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-theme-secondary">
                        Categories <span className="text-red-500">*</span>
                      </label>
                      {formData.tags.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, tags: [] }))}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border-2 ${
                            formData.tags.includes(tag)
                              ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 dark:border-blue-500 text-blue-700 dark:text-blue-300'
                              : 'bg-theme-secondary/10 border-theme text-theme-secondary hover:border-blue-300 dark:hover:border-blue-700'
                          }`}
                        >
                          {formData.tags.includes(tag) && '✓ '}
                          {tag}
                        </button>
                      ))}
                    </div>
                    {formData.tags.length === 0 ? (
                      <p className="text-xs text-red-500">At least one category is required</p>
                    ) : (
                      <p className="text-xs text-theme-secondary">
                        {formData.tags.length} {formData.tags.length === 1 ? 'category' : 'categories'} selected
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-theme-secondary">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border-2 border-blue-300 dark:border-blue-700 rounded bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Describe what this item is used for..."
                    />
                    <p className="text-xs text-theme-secondary">
                      Optional details about this template
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t-2 border-dashed border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 flex gap-3 justify-end flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-theme rounded hover:bg-theme-hover transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium"
                title={
                  !isFormValid
                    ? 'Complete all required fields to create the template'
                    : 'Create this template'
                }
              >
                Create Template
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
