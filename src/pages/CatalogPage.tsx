import { useState } from 'react';
import { useCatalog } from '../contexts/CatalogContext';
import PageLayout from './PageLayout';
import Filters from '../components/filter/Filters';
import type { CatalogItem as CatalogItemType } from '../types/catalog';
import CatalogListDisplay from '../components/CatalogListDisplay';
import CatalogItemDetail from '../components/catalog/CatalogItemDetail';
import CatalogItemEdit from '../components/catalog/CatalogItemEdit';

export default function CatalogPage() {
  const { catalogItems, updateCatalogItem } = useCatalog();

  const [viewMode, setViewMode] = useState<'grid-view' | 'list-view'>('grid-view');
  const [selectedTemplate, setSelectedTemplate] = useState<CatalogItemType | null>(null);
  const [editMode, setEditMode] = useState<true | false>(false);
  const currentUserEmail = 'joncheng.dev@gmail.com';

  // Filter via Tags
  const availableFilterTags = ["Biology", "Chemistry", "Earth Science", "General", "Physics"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const closeEditModal = () => {
    setSelectedTemplate(null);
    setEditMode(false);
  }

  const handleSave = (updatedItem: CatalogItemType) => {
    updateCatalogItem(updatedItem);
    closeEditModal();
  }

  return (
    <PageLayout>
      <div className="flex w-full border-b border-theme">
        <Filters
          availableFilterTags={availableFilterTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>
      <div className="flex flex-1 w-full">
        <div className="flex-1 border-r border-theme">
          <CatalogListDisplay
            catalogItems={catalogItems}
            selectedTags={selectedTags}
            viewMode={viewMode}
            setSelectedTemplate={setSelectedTemplate}
          />
        </div>
        {selectedTemplate && 
          <CatalogItemDetail
            selectedTemplate={selectedTemplate}
            setEditMode={setEditMode}
            onClose={() => setSelectedTemplate(null)}
          />
        }
        {selectedTemplate && editMode && 
          <CatalogItemEdit
            template={selectedTemplate}
            onClose={() => closeEditModal()}
            onSave={handleSave}
          />
        }
        
      </div>
    </PageLayout>
  );
}