import { useEffect, useState } from 'react';
import { useCatalog } from '../contexts/CatalogContext';
import { useInventory } from '../contexts/InventoryContext';
import PageLayout from './PageLayout';
import Filters from '../components/filter/Filters';
import ItemListDisplay from '../components/ItemListDisplay';
import CheckedOutItemList from '../components/checked-out-item-list/CheckedOutItemList';
import type { InventoryItemGroupedType } from '../types/inventory';
import InventoryItemDetail from '../components/inventory/InventoryItemDetail';
import AdjustQuantityModal from '../components/inventory/AdjustQuantityModal';

export default function InventoryPage() {
  const { catalogItems } = useCatalog();
  const {
    inventoryLoading,
    aggregatedInventory,
    checkedOutQty,
    filteredCheckedOutItems,
    selectedItemLoading,
    fetchSelectedItemDetails,
    selectedItemDetails,
    relatedItems,
  } = useInventory();

  const [viewMode, setViewMode] = useState<'grid-view' | 'list-view'>('grid-view');

  // Filter via Tags
  const availableFilterTags = ["Biology", "Chemistry", "Earth Science", "General", "Physics"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Inventory Item Details (props to pass in to component)
  const [selectedItem, setSelectedItem] = useState<InventoryItemGroupedType | null>(null);
  const [adjustQtyMode, setAdjustQtyMode] = useState<true | false>(false);

  useEffect(() => {
    if(selectedItem) fetchSelectedItemDetails(selectedItem);
  }, [selectedItem]);

  const handleConfirmAdjustStock = (
    catalogItemId: string,
    newTotalQuantity: number
  ) => {
    console.log('AdjustStockModal onConfirm clicked, catalogItemId', catalogItemId);
    console.log('newTotalQuantity: ', newTotalQuantity);
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
          <div className="flex w-full border-b border-theme">
            <Filters
              availableFilterTags={availableFilterTags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              viewMode={viewMode}
              setViewMode={setViewMode}
              showAddCatalogButton={false}
            />
          </div>
          <div className="flex flex-1 w-full">
            <div className="flex-1 border-r border-theme">
              <ItemListDisplay
                inventoryItemData={aggregatedInventory}
                catalogItems={catalogItems}
                selectedTags={selectedTags}
                setSelectedItem={setSelectedItem}
                viewMode={viewMode}
              />
            </div>
            <div className="w-1/5">
              <CheckedOutItemList
                checkedOutItemsList={filteredCheckedOutItems}
                checkedOutItemQuantities={checkedOutQty}
                setSelectedItem={setSelectedItem}
              />
            </div>
          </div>
        </>
      )}
      {selectedItem && selectedItemDetails && !selectedItemLoading && (
        <InventoryItemDetail
          selectedItemDetails={selectedItemDetails}
          relatedItems={relatedItems}
          setAdjustQtyMode={setAdjustQtyMode}
          onClose={() => setSelectedItem(null)}
        />
      )}
      {selectedItem && selectedItemLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-theme-surface border border-theme rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] p-8 text-center">
            Loading Item Details...
          </div>
        </div>
      )}
      {selectedItem && selectedItemDetails && adjustQtyMode && 
        <AdjustQuantityModal
          item={selectedItem}
          onClose={() => setAdjustQtyMode(false)}
          onConfirm={handleConfirmAdjustStock}
        />
      }
    </PageLayout>
  );
}
