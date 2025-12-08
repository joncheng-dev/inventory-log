import { useState } from 'react';
import { useCatalog } from '../contexts/CatalogContext';
import { useInventory } from '../contexts/InventoryContext';
import PageLayout from './PageLayout';
import Filters from '../components/filter/Filters';
import type { CatalogItem as CatalogItemType } from '../types/catalog';
import CatalogListDisplay from '../components/CatalogListDisplay';
import CatalogItemDetail from '../components/catalog/CatalogItemDetail';
import CatalogItemEdit from '../components/catalog/CatalogItemEdit';
import CatalogItemNew from '../components/catalog/CatalogItemNew';
import AddToInventoryModal from '../components/catalog/AddToInventoryModal';
import ArchiveConfirmationModal from '../components/catalog/ArchiveConfirmationModal';
import { getInventoryCountsforCatalog } from '../utils/inventory';

export default function CatalogPage({ view }: { view: 'active' | 'archived'}) {
  const {
    catalogItems,
    addNewCatalogItem,
    updateCatalogItem,
    archiveCatalogItem,
    unarchiveCatalogItem
  } = useCatalog();
  const { inventoryItems, addItemsToInventory } = useInventory(); 

  const [viewMode, setViewMode] = useState<'grid-view' | 'list-view'>('grid-view');
  const [selectedTemplate, setSelectedTemplate] = useState<CatalogItemType | null>(null);
  const [editMode, setEditMode] = useState<true | false>(false);
  const [newMode, setNewMode] = useState<true | false>(false);
  const [archiveMode, setArchiveMode] = useState<true | false>(false);
  const [addItemsMode, setAddItemsMode] = useState<true | false>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const currentUserEmail = 'joncheng.dev@gmail.com';

  const itemsToDisplay = view === 'active'
    ? catalogItems.filter(item => !item.archived)
    : catalogItems.filter(item => item.archived);
  
  // Filter via Tags
  const availableFilterTags = ["Biology", "Chemistry", "Earth Science", "General", "Physics"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const templateCounts = selectedTemplate
    ? getInventoryCountsforCatalog(selectedTemplate.id, inventoryItems)
    : null;
  
  const closeEditModal = () => {
    setEditMode(false);
  }

  const handleSaveEdit = (updatedItem: CatalogItemType) => {
    updateCatalogItem(updatedItem);
    closeEditModal();
  }
  
  const closeNewModal = () => {
    setNewMode(false);
  } 

  const handleSaveNew = (newItem: CatalogItemType) => {
    addNewCatalogItem(newItem);
    closeNewModal();
  }

  const handleSelectTemplate = async (selectedTemplate: CatalogItemType) => {
    setSelectedTemplate(selectedTemplate);
  }

  const handleArchiveClick = () => {
    setArchiveMode(true);
  }

  const handleArchiveConfirm = (selectedItem: CatalogItemType) => {
    archiveCatalogItem(selectedItem);
    setSelectedTemplate(null);
  }

  const handleRestoreClick = (selectedTemplate: CatalogItemType) => {
    unarchiveCatalogItem(selectedTemplate);
    setSelectedTemplate(null);
  }

  const handleArchiveCancel = () => {
    setArchiveMode(false);
  }

  const handleShowAddItemModal = () => {
    setAddItemsMode(true);
  }

  const handleAddItemConfirm = (quantity: number) => {
    if (!selectedTemplate) {
      console.error("Attempted to add item without a selected template.");
      return;
    }
    addItemsToInventory(selectedTemplate.id, quantity);
    setAddItemsMode(false);
  }

  const handleCloseAddItemModal = () => {
    setAddItemsMode(false);    
  }

  return (
    <PageLayout>
      <div className="flex w-full border-b border-theme">
        <Filters
          availableFilterTags={availableFilterTags}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showAddCatalogButton={true}
          onNewClick={setNewMode}
        />
      </div>
      <div className="flex flex-1 w-full">
        <div className="flex-1 border-r border-theme">
          <CatalogListDisplay
            catalogItems={itemsToDisplay}
            searchTerm={searchTerm}
            selectedTags={selectedTags}
            viewMode={viewMode}
            onSelectTemplate={handleSelectTemplate}
          />
        </div>
        {selectedTemplate && 
          <CatalogItemDetail
            selectedTemplate={selectedTemplate}
            setEditMode={setEditMode}
            onClose={() => setSelectedTemplate(null)}
            onArchiveClick={handleArchiveClick}
            onRestoreClick={handleRestoreClick}
            onAddItemClick={handleShowAddItemModal}
          />
        }
        {selectedTemplate && addItemsMode && templateCounts && 
          <AddToInventoryModal
            template={selectedTemplate}
            counts={templateCounts}
            onClose={handleCloseAddItemModal}
            onConfirm={handleAddItemConfirm}
          />
        }
        {selectedTemplate && archiveMode && templateCounts && 
          <ArchiveConfirmationModal
            template={selectedTemplate}
            counts={templateCounts}
            onArchiveConfirm={handleArchiveConfirm}
            onCancel={handleArchiveCancel}
          />
        }
        {selectedTemplate && editMode && 
          <CatalogItemEdit
            template={selectedTemplate}
            onClose={() => closeEditModal()}
            onSave={handleSaveEdit}
          />
        }
        {newMode &&
          <CatalogItemNew
            onClose={() => closeNewModal()}
            onSave={handleSaveNew}
          />
        }
      </div>
    </PageLayout>
  );
}
