import { useState } from 'react';
import type { CatalogItem as CatalogItemType } from "../../types/catalog";

interface CatalogItemEditProps {
  template: CatalogItemType;
  onClose: () => void;
  onSave: (updatedItem: CatalogItemType) => void;
}

export default function CatalogItemEdit({ template, onClose, onSave }: CatalogItemEditProps) {
  const [formData, setFormData] = useState({
    displayName: template.displayName,
    sku: template.sku,
    description: template.description || '',
    location: template.location || '',
    tags: template.tags,
  });

  const availableTags = ['Biology', 'Chemistry', 'Earth Science', 'General', 'Physics'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...template,
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
            <div className="px-6 py-4 border-b-2 border-dashed border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-blue-600 dark:bg-blue-700 border border-blue-700 dark:border-blue-600 rounded text-sm font-medium text-white">
                      Edit Template
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-theme-primary mb-1">
                    {formData.displayName || 'Untitled Template'}
                  </h2>
                  <p className="text-sm text-theme-secondary">
                    Modify catalog item definition
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
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                {/* Warning Box */}
                <div className="border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-lg p-4 bg-amber-50/50 dark:bg-amber-950/20">
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    <span className="font-semibold">⚠️ Note:</span> Editing this template will update values of all existing inventory items created with this template.
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
                        className="w-full px-3 py-2 border-2 border-blue-300 dark:border-blue-700 rounded bg-theme-surface text-theme-primary font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., BIO-001"
                      />
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
                  </div>

                  {/* Categories */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-theme-secondary">
                      Categories <span className="text-red-500">*</span>
                    </label>
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
                    {formData.tags.length === 0 && (
                      <p className="text-xs text-red-500">At least one category is required</p>
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
                      placeholder="Describe this catalog item..."
                    />
                  </div>
                </div>
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
                type="submit"
                disabled={!formData.displayName || !formData.sku || formData.tags.length === 0}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
