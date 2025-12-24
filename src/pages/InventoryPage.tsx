import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useCatalog } from '../contexts/CatalogContext';
import { useInventory } from '../contexts/InventoryContext';
import { useNotification } from '../contexts/NotificationContext';
import { getErrorMessage } from '../utils/error';
import PageLayout from './PageLayout';
import LoadingScreen from '../components/ui/LoadingScreen';
import PageActionBar from '../components/PageActionBar';
import ItemListDisplay from '../components/ItemListDisplay';
import CheckedOutSidebar from '../components/checked-out-item-list/CheckedOutSidebar';
import CheckedOutToggle from '../components/checked-out-item-list/CheckedOutToggle';
import type { InventoryItemGroupedType } from '../types/inventory';
import InventoryItemDetail from '../components/inventory/InventoryItemDetail';
import AdjustQuantityModal from '../components/inventory/AdjustQuantityModal';

export default function InventoryPage() {
  const { viewMode } = useAuth();
  const { success, error } = useNotification();
  const { catalogItems } = useCatalog();
  const {
    inventoryItems,
    inventoryLoading,
    aggregatedInventory,
    checkedOutQty,
    filteredCheckedOutItems,
    selectedItemLoading,
    fetchSelectedItemDetails,
    selectedItemDetails,
    relatedItems,
    addItemsToInventory,
    removeItemsFromInventory,
    checkOutItems,
    returnAllItems,
    returnItem
  } = useInventory();

  
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  // Filter via Tags
  const availableFilterTags = ["Biology", "Chemistry", "Earth Science", "General", "Physics"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Inventory Item Details (props to pass in to component)
  const [selectedItem, setSelectedItem] = useState<InventoryItemGroupedType | null>(null);
  const [adjustQtyMode, setAdjustQtyMode] = useState<true | false>(false);
  
  useEffect(() => {
    if(selectedItem) fetchSelectedItemDetails(selectedItem);
  }, [inventoryItems, selectedItem, adjustQtyMode]);

  const selectedCatalogTemplate = selectedItem
    ? catalogItems.find((item) => item.id === selectedItem.catalogItemId)
    : null;

  const checkedOutItemTypes = filteredCheckedOutItems 
    ? Object.keys(filteredCheckedOutItems).length 
    : 0;
  
  const handleConfirmAdjustQty = (
    catalogItemId: string,
    newTotalQuantity: number
  ) => {
    try {
      if (selectedItemDetails) {
        const adjustQty = newTotalQuantity - selectedItemDetails.quantityTotal;
        if (adjustQty > 0) {
          addItemsToInventory(catalogItemId, adjustQty);
          success("Inventory updated");
        } else if (adjustQty < 0) {
          removeItemsFromInventory(catalogItemId, Math.abs(adjustQty));
          success("Inventory updated");
        }
      }
    } catch (err) {
      error(`Failed to update inventory: ${getErrorMessage(err)}`);
    }
  }

  const handleCheckout = (qtyToCheckOut: number) => {
    try {
      if (!selectedItem?.catalogItemId) return;
      checkOutItems(selectedItem.catalogItemId, qtyToCheckOut);
      success(`Checked out ${qtyToCheckOut} item${qtyToCheckOut > 1 ? 's' : ''}`);
    } catch (err) {
      error(`Failed to check out items: ${getErrorMessage(err)}`);
    }
  }

  const handleReturnItem = (itemId: string) => {
    try {
      returnItem(itemId);
      success("Item returned");
    } catch (err) {
      error(`Failed to return item: ${getErrorMessage(err)}`);
    }
  }

  const handleReturnAllMyItems = () => {
    try {
      if (!selectedItem?.catalogItemId) return;
      returnAllItems(selectedItem.catalogItemId);
      success("All items returned");
    } catch (err) {
      error(`Failed to return items: ${getErrorMessage(err)}`);
    }
  }

  return (
    <PageLayout>
      {inventoryLoading ? 
        <LoadingScreen pageType='Inventory'/>
      : (
        <>
          <PageActionBar
            leftSlot={null}
            availableFilterTags={availableFilterTags}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            rightSlot={
              <CheckedOutToggle
                count={checkedOutItemTypes}
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            }
          />
          <div className="flex flex-1 w-full">
            <div className="flex-1 border-r border-theme">
              <ItemListDisplay
                inventoryItemData={aggregatedInventory}
                catalogItems={catalogItems}
                searchTerm={searchTerm}
                selectedTags={selectedTags}
                setSelectedItem={setSelectedItem}
                viewMode={viewMode}
                />
            </div>
            {isSidebarOpen && (                
              <CheckedOutSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                checkedOutItemsList={filteredCheckedOutItems}
                checkedOutItemQuantities={checkedOutQty}
                setSelectedItem={setSelectedItem}
              />
            )}
          </div>
        </>
      )}
      {selectedItem && selectedItemDetails && !selectedItemLoading && (
        <InventoryItemDetail
          selectedItemDetails={selectedItemDetails}
          relatedItems={relatedItems}
          setAdjustQtyMode={setAdjustQtyMode}
          onCheckout={handleCheckout}
          onReturnItem={handleReturnItem}
          onReturnAllMyItems={handleReturnAllMyItems}
          onClose={() => setSelectedItem(null)}
          isBlurred={adjustQtyMode}
        />
      )}
      {selectedItem && selectedItemLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-theme-surface border border-theme rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] p-8 text-center">
            Loading Item Details...
          </div>
        </div>
      )}
      {selectedItem && selectedItemDetails && adjustQtyMode && selectedCatalogTemplate && 
        <AdjustQuantityModal
          item={selectedItemDetails}
          catalogTemplate={selectedCatalogTemplate}
          onClose={() => setAdjustQtyMode(false)}
          onConfirm={handleConfirmAdjustQty}
        />
      }
    </PageLayout>
  );
}
