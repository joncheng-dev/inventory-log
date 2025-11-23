import { useState } from 'react';
import { useCatalog } from '../contexts/CatalogContext';
import { useInventory } from '../contexts/InventoryContext';
import PageLayout from './PageLayout';
import Filters from '../components/filter/Filters';
import type { InventoryItem as InventoryItemType } from '../types/inventory';
import type { CatalogItem as CatalogItemType } from '../types/catalog';
import CatalogListDisplay from '../components/CatalogListDisplay';
import CatalogItemDetail from '../components/catalog/CatalogItemDetail';
import CatalogItemEdit from '../components/catalog/CatalogItemEdit';
import CatalogItemNew from '../components/catalog/CatalogItemNew';
import AddToInventoryModal from '../components/catalog/AddtoInventoryModal';
import ArchiveConfirmationModal from '../components/catalog/ArchiveConfirmationModal';

export default function CatalogPage({ view }: { view: 'active' | 'archived'}) {
  const { catalogItems, addNewCatalogItem, updateCatalogItem, archiveCatalogItem, unarchiveCatalogItem } = useCatalog();
  const { inventoryItems, fetchInventoryCountsforCatalog } = useInventory(); 

  const [viewMode, setViewMode] = useState<'grid-view' | 'list-view'>('grid-view');
  const [selectedTemplate, setSelectedTemplate] = useState<CatalogItemType | null>(null);
  const [editMode, setEditMode] = useState<true | false>(false);
  const [newMode, setNewMode] = useState<true | false>(false);
  const [archiveMode, setArchiveMode] = useState<true | false>(false);
  const [templateInfo, setTemplateInfo] = useState<{
    totalItemCount: number,
    availableCount: number,
    checkedOutCount: number
  } | null>(null);
  const [addItemsMode, setAddItemsMode] = useState<true | false>(false);
  const currentUserEmail = 'joncheng.dev@gmail.com';

  const itemsToDisplay = view === 'active'
    ? catalogItems.filter(item => !item.archived)
    : catalogItems.filter(item => item.archived);


  // Filter via Tags
  const availableFilterTags = ["Biology", "Chemistry", "Earth Science", "General", "Physics"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    let data = await fetchInventoryCountsforCatalog(selectedTemplate.id, inventoryItems);
    const { totalItemCount, availableCount, checkedOutCount } = data;
    setTemplateInfo({
      totalItemCount,
      availableCount,
      checkedOutCount
    });
  }

  const handleUnselectTemplate = () => {
    setSelectedTemplate(null);
    setTemplateInfo(null);
  }

  const handleArchiveClick = () => {
    setArchiveMode(true);
  }

  const handleArchiveConfirm = (selectedItem: CatalogItemType) => {
    archiveCatalogItem(selectedItem);
    handleUnselectTemplate();
  }

  const handleRestoreClick = (selectedTemplate: CatalogItemType) => {
    unarchiveCatalogItem(selectedTemplate);
    handleUnselectTemplate();
  }

  const handleArchiveCancel = () => {
    setArchiveMode(false);
  }

  const handleShowAddItemModal = () => {
    setAddItemsMode(true);
  }

  const handleAddItemConfirm = (items: Omit<InventoryItemType, 'id'>[]) => {
    console.log('CatalogPage handleAddItemConfirm, button clicked, items: ', items);
    // double check catalogItemId, archived should be not true
    // take in quantity
    // utility function adds items
  }

  const handleCloseAddItemModal = () => {
    setAddItemsMode(false);    
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
          showAddCatalogButton={true}
          onNewClick={setNewMode}
        />
      </div>
      <div className="flex flex-1 w-full">
        <div className="flex-1 border-r border-theme">
          <CatalogListDisplay
            catalogItems={itemsToDisplay}
            selectedTags={selectedTags}
            viewMode={viewMode}
            onSelectTemplate={handleSelectTemplate}
          />
        </div>
        {selectedTemplate && 
          <CatalogItemDetail
            selectedTemplate={selectedTemplate}
            setEditMode={setEditMode}
            onClose={() => handleUnselectTemplate()}
            onArchiveClick={handleArchiveClick}
            onRestoreClick={handleRestoreClick}
            onAddItemClick={handleShowAddItemModal}
          />
        }
        {selectedTemplate && addItemsMode && templateInfo && 
          <AddToInventoryModal
            template={selectedTemplate}
            currentInventoryCount={templateInfo.totalItemCount}
            currentAvailableCount={templateInfo.availableCount}
            onClose={handleCloseAddItemModal}
            onConfirm={handleAddItemConfirm}
          />
        }
        {selectedTemplate && archiveMode && templateInfo && 
          <ArchiveConfirmationModal
            template={selectedTemplate}
            inventoryItemCount={templateInfo.totalItemCount}
            checkedOutCount={templateInfo.checkedOutCount}
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
