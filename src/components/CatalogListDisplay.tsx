import type { CatalogItem as CatalogItemType } from '../types/catalog';
import CatalogItemList from './catalog/CatalogItemList';
import type { ViewMode } from '../types/user';

interface CatalogListDisplayProps {
  catalogItems: CatalogItemType[];
  searchTerm: string;
  selectedTags: string[];
  viewMode: ViewMode;
  onSelectTemplate: (selectedTemplate: CatalogItemType) => Promise<void>;
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

export default function CatalogListDisplay({ catalogItems, searchTerm, selectedTags, viewMode, onSelectTemplate }: CatalogListDisplayProps) {
  let search = '';
  if (searchTerm.length > 1) {
    search = searchTerm.toLowerCase();
  }  

  const filteredItems = catalogItems
    .filter((item) =>
      selectedTags.length === 0 ||
      selectedTags.every(tag => item.tags.includes(tag))
    )
    .filter((item) => {
      if (searchTerm === '') return true;
      return (
        item.displayName.toLowerCase().includes(search) ||
        item.sku.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
      );    
    })
  ;
    
  return (
    <div className='h-full overflow-y-auto'>
      <CatalogItemList
        catalogItemsAfterFilter={filteredItems}
        viewMode={viewMode}
        onSelectTemplate={onSelectTemplate}
      />
    </div>
  );
}