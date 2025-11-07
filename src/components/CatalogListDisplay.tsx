import type { CatalogItem as CatalogItemType } from '../types/catalog';
import CatalogItemList from './catalog/CatalogItemList';

interface CatalogListDisplayProps {
  catalogItems: CatalogItemType[];
  selectedTags: string[];
  viewMode: 'grid-view' | 'list-view';
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

export default function CatalogListDisplay({ catalogItems, selectedTags, viewMode }: CatalogListDisplayProps) {
  const filteredItems = selectedTags.length === 0 ? catalogItems
    : catalogItems
        .filter((entry) => selectedTags.every(tag => entry.tags.includes(tag))
    );
  
  return (
    <div className='h-full overflow-y-auto'>
      <CatalogItemList
        catalogItemsAfterFilter={filteredItems}
        viewMode={viewMode}
      />
    </div>
  );
}