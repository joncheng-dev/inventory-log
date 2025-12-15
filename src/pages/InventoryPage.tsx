import { useEffect, useState } from 'react';
import { useCatalog } from '../contexts/CatalogContext';
import { useInventory } from '../contexts/InventoryContext';
import PageLayout from './PageLayout';
import PageActionBar from '../components/PageActionBar';
import ItemListDisplay from '../components/ItemListDisplay';
import CheckedOutSidebar from '../components/checked-out-item-list/CheckedOutSidebar';
import CheckedOutToggle from '../components/checked-out-item-list/CheckedOutToggle';
import type { InventoryItemGroupedType } from '../types/inventory';
import InventoryItemDetail from '../components/inventory/InventoryItemDetail';
import AdjustQuantityModal from '../components/inventory/AdjustQuantityModal';

export default function InventoryPage() {
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

  const [viewMode, setViewMode] = useState<'grid-view' | 'list-view'>('grid-view');
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
    if (selectedItemDetails) {      
      const adjustQty = newTotalQuantity - selectedItemDetails.quantityTotal;
      if (adjustQty > 0) {
        addItemsToInventory(catalogItemId, adjustQty);
      } else if (adjustQty < 0) {
        removeItemsFromInventory(catalogItemId, Math.abs(adjustQty));
      } else {
        throw new Error("Cannot update. New quantity is the same as the previous quantity."); 
      }
    }
  }

  const handleCheckout = (qtyToCheckOut: number) => {
    if (!selectedItem?.catalogItemId) return;
    checkOutItems(selectedItem.catalogItemId, qtyToCheckOut);
  }

  const handleReturnItem = (itemId: string) => {
    returnItem(itemId);
  }

  const handleReturnAllMyItems = () => {
    if (!selectedItem?.catalogItemId) return;
    returnAllItems(selectedItem.catalogItemId);
  }

  return (
    <PageLayout>
      {inventoryLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-full p-8 text-lg text-theme-secondary">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-theme-primary" viewBox="0 0 24 24">
            {/* Spinner SVG */}
          </svg>
          Loading Inventory...
        </div>
      ) : (
        <>
          <PageActionBar
            leftSlot={null}
            availableFilterTags={availableFilterTags}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            viewMode={viewMode}
            setViewMode={setViewMode}
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
