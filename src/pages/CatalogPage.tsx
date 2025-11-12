import { useState } from 'react';
import PageLayout from './PageLayout';
import Filters from '../components/filter/Filters';
import type { CatalogItem as CatalogItemType } from '../types/catalog';
import CatalogListDisplay from '../components/CatalogListDisplay';
import CatalogItemDetail from '../components/catalog/CatalogItemDetail';
import CatalogItemEdit from '../components/catalog/CatalogItemEdit';

const mockCatalogItems: CatalogItemType[] = [
  {
    id: 'cat-slinky',
    displayName: 'Slinky',
    sku: 'PHYS-SLIN-001',
    description: 'A metal spring toy for physics demonstrations',
    location: 'metal cabinet by stairs',
    tags: ['Physics', 'General'],
  },
  {
    id: 'cat-beaker-set',
    displayName: 'Beaker Set (250ml) Beaker Set (250ml) Beaker Set (250ml) Beaker Set (250ml) Beaker Set (250ml) ',
    sku: 'CHEM-BEAK-250',
    description: 'Standard glass beaker set for chemistry labs',
    location: 'glass cabinet by sink',
    tags: ['Chemistry', 'General', 'Physics', 'Earth Science', 'Environmental Science', 'Biology', 'Zoology', 'Geology'],
  },
  {
    id: 'cat-bunsen-burner',
    displayName: 'Bunsen Burner',
    sku: 'CHEM-BURN-001',
    description: 'Gas burner for heating experiments',
    location: 'glass cabinet by sink, bottom shelf',
    tags: ['Chemistry'],
  },
  {
    id: 'cat-magnifying-class',
    displayName: 'Magnifying Glass',
    sku: 'GEN-EQUIP-001',
    description: 'Handheld lens for making smaller things appear larger',
    location: 'cabinet by stairway, top shelf',
    tags: ['Biology', 'General'],
  },
];

export default function CatalogPage() {
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

  const saveEdit = () => {
    console.log('submit clicked');
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
            catalogItems={mockCatalogItems}
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
            onSave={() => saveEdit()}
          />
        }
        
      </div>
    </PageLayout>
  );
}