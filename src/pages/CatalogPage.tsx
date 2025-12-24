import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalog } from '../contexts/CatalogContext';
import { useInventory } from '../contexts/InventoryContext';
import { useNotification } from '../contexts/NotificationContext';
import { getErrorMessage } from '../utils/error';
import PageLayout from './PageLayout';
import LoadingScreen from '../components/ui/LoadingScreen';
import PageActionBar from '../components/PageActionBar';
import type { CatalogItem as CatalogItemType } from '../types/catalog';
import CatalogListDisplay from '../components/CatalogListDisplay';
import CatalogItemDetail from '../components/catalog/CatalogItemDetail';
import CatalogItemEdit from '../components/catalog/CatalogItemEdit';
import CatalogItemNew from '../components/catalog/CatalogItemNew';
import CatalogViewToggle from '../components/catalog/CatalogViewToggle';
import AddToInventoryModal from '../components/catalog/AddToInventoryModal';
import ArchiveConfirmationModal from '../components/catalog/ArchiveConfirmationModal';
import { getInventoryCountsforCatalog } from '../utils/inventory';
import { useAuth } from '../auth/AuthContext';

export default function CatalogPage({ view }: { view: 'active' | 'archived'}) {
  const { isAdmin, viewMode } = useAuth();
  const navigate = useNavigate();
  if (!isAdmin) {
    navigate('/unauthorized');
    return null;
  }
  const { success, error } = useNotification();
  const {
    catalogItems,
    catalogLoading,
    addNewCatalogItem,
    updateCatalogItem,
    archiveCatalogItem,
    unarchiveCatalogItem
  } = useCatalog();
  const { inventoryItems, addItemsToInventory } = useInventory(); 

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<true | false>(false);
  const [newMode, setNewMode] = useState<true | false>(false);
  const [archiveMode, setArchiveMode] = useState<true | false>(false);
  const [addItemsMode, setAddItemsMode] = useState<true | false>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const itemsToDisplay = view === 'active'
    ? catalogItems.filter(item => !item.archived)
    : catalogItems.filter(item => item.archived);

  const selectedTemplate = selectedTemplateId
    ? catalogItems.find((item) => item.id === selectedTemplateId) ?? null
    : null;
  
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
    try {
      updateCatalogItem(updatedItem);
      setSelectedTemplateId(updatedItem.id);
      closeEditModal();
      success('Template updated');
    } catch (err) {
      error(`Failed to update template: ${getErrorMessage(err)}`);
    }
  }
  
  const closeNewModal = () => {
    setNewMode(false);
  } 

  const handleSaveNew = (newItem: Omit<CatalogItemType, "id">) => {
    try {
      addNewCatalogItem(newItem);
      closeNewModal();
      success('Template added to catalog');
    } catch (err) {
      error(`Failed to add template: ${getErrorMessage(err)}`);
    }
  }

  const handleSelectTemplate = async (selectedTemplate: CatalogItemType) => {
    setSelectedTemplateId(selectedTemplate.id);
  }

  const handleArchiveClick = () => {
    setArchiveMode(true);
  }

  const handleArchiveConfirm = (selectedItem: CatalogItemType) => {
    try {
      archiveCatalogItem(selectedItem.id);
      setArchiveMode(false);
      setSelectedTemplateId(null);
      success("Template archived");
    } catch (err) {
      error(`Failed to archive template: ${getErrorMessage(err)}`);
    }
  }

  const handleRestoreClick = (selectedTemplate: CatalogItemType) => {
    try {
      unarchiveCatalogItem(selectedTemplate.id);
      setSelectedTemplateId(null);
      success("Template restored");
    } catch (err) {
      error(`Failed to restore template: ${getErrorMessage(err)}`);      
    }
  }

  const handleArchiveCancel = () => {
    setArchiveMode(false);
  }

  const handleShowAddItemModal = () => {
    setAddItemsMode(true);
  }

  const handleAddItemConfirm = (quantity: number) => {
    try {      
      if (!selectedTemplate) {
        console.error("Attempted to add item without a selected template.");
        return;
      }
      addItemsToInventory(selectedTemplate.id, quantity);
      setAddItemsMode(false);
      success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to inventory`);
    } catch (err) {
      error(`Failed to add items: ${getErrorMessage(err)}`);
    }
  }

  const handleCloseAddItemModal = () => {
    setAddItemsMode(false);    
  }

  return (
    <PageLayout>
      {catalogLoading ?
        <LoadingScreen pageType='Catalog' />
        : (
        <>
          <PageActionBar
            leftSlot={
              <CatalogViewToggle currentView={view} />
            }
            availableFilterTags={availableFilterTags}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            rightSlot={
              <button
                onClick={() => setNewMode(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
              >
                <span className="text-xl leading-none">+</span>
                Add New Template
              </button>
            }
          />
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
                onClose={() => setSelectedTemplateId(null)}
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
        </>
      )}
    </PageLayout>
  );
}
