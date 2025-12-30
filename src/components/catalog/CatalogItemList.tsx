import CatalogItem from './CatalogItem';
import type { CatalogTemplate } from '../../types/catalog';
import type { ViewMode } from '../../types/user';

interface CatalogItemListProps {
  catalogItemsAfterFilter: CatalogTemplate[];
  viewMode: ViewMode;
  onSelectTemplate: (selectedTemplate: CatalogTemplate) => Promise<void>;
}

function renderCatalogItems(
  catalogItems: CatalogTemplate[],
  viewMode: ViewMode,
  onSelectTemplate: (selectedTemplate: CatalogTemplate) => Promise<void>,
) {
  return catalogItems.map((item) => {
    return (
      <CatalogItem
        key={item.id}
        catalogItem={item}
        viewMode={viewMode}
        onSelectTemplate={onSelectTemplate}
      />
    );
  })
}

export default function CatalogItemList({ catalogItemsAfterFilter, viewMode, onSelectTemplate }: CatalogItemListProps) {

  if (catalogItemsAfterFilter.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-theme-secondary">
        <div className="text-center">
          <p className="text-lg font-medium">No items found</p>
          <p className="text-sm mt-2">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
        {renderCatalogItems(catalogItemsAfterFilter, viewMode, onSelectTemplate)}
      </div>
    );
  }

  // List view
  return (
    <div className="flex flex-col space-y-2 p-6">
        {renderCatalogItems(catalogItemsAfterFilter, viewMode, onSelectTemplate)}
    </div>
  );
  
}