import { useState } from 'react';
import { useCatalog } from '../contexts/CatalogContext';
import { useInventory } from '../contexts/InventoryContext';
import PageLayout from './PageLayout';
import Filters from '../components/filter/Filters';
import ItemListDisplay from '../components/ItemListDisplay';
import CheckedOutItemList from '../components/checked-out-item-list/CheckedOutItemList';
import type { InventoryItem as InventoryItemType, InventoryItemGroupedType, CheckedOutItemDataType } from '../types/inventory';
import InventoryItemDetail from '../components/inventory/InventoryItemDetail';
import { calculateInventoryQuantities, gatherInventoryItemData, groupInventoryByCatalogItem, gatherCheckoutItemQuantities } from '../utils/inventory';

export default function InventoryPage() {
  const { catalogItems } = useCatalog();
  const { inventoryItems } = useInventory();

  const [viewMode, setViewMode] = useState<'grid-view' | 'list-view'>('grid-view');
  const [selectedItem, setSelectedItem] = useState<InventoryItemGroupedType | null>(null);
  const currentUserEmail = 'joncheng.dev@gmail.com';

  // Filter via Tags
  const availableFilterTags = ["Biology", "Chemistry", "Earth Science", "General", "Physics"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // CONVERT RAW INVENTORY ITEM DATA TO CONDENSED OBJECTS WITH QUANTITY
  const groupedItems = groupInventoryByCatalogItem(inventoryItems);
  const inventoryItemData = gatherInventoryItemData(groupedItems, catalogItems);
  
  // COUNT CHECKED OUT ITEMS  
  let checkedOutItemQuantities: Record<string, CheckedOutItemDataType> | null = {};
  if (inventoryItemData) {    
    checkedOutItemQuantities = gatherCheckoutItemQuantities(currentUserEmail, inventoryItems, catalogItems);
  }
  let filteredInventoryItemData = {};
  if (checkedOutItemQuantities && inventoryItemData) {    
    filteredInventoryItemData = Object.fromEntries(
      Object.entries(inventoryItemData)
        .filter(([key]) => Object.keys(checkedOutItemQuantities).includes(key))
    );
  }
  
  // Inventory Item Details (props to pass in to component)
  let selectedItemDetails: InventoryItemGroupedType | null = null;
  let relatedItems: InventoryItemType[] = [];

  if (selectedItem) {    
    relatedItems = inventoryItems.filter((inv) => inv.catalogItemId === selectedItem.catalogItemId);
    const { quantityTotal, quantityAvailable } = calculateInventoryQuantities(relatedItems);
    const catalogItem = catalogItems.find(cat => cat.id === selectedItem.catalogItemId);
    if (catalogItem) {      
      selectedItemDetails = {
        catalogItemId: catalogItem.id,
        displayName: catalogItem.displayName,
        sku: catalogItem.sku,
        description: catalogItem.description,
        location: catalogItem.location,
        tags: catalogItem.tags,
        quantityTotal: quantityTotal,
        quantityAvailable: quantityAvailable,
      }
    }
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
          showAddCatalogButton={false}
        />
      </div>
      <div className="flex flex-1 w-full">
        <div className="flex-1 border-r border-theme">
          <ItemListDisplay
            inventoryItemData={inventoryItemData}
            catalogItems={catalogItems}
            selectedTags={selectedTags}
            setSelectedItem={setSelectedItem}
            viewMode={viewMode}
          />
        </div>
        <div className="w-1/5">
          <CheckedOutItemList
            checkedOutItemsList={filteredInventoryItemData}
            checkedOutItemQuantities={checkedOutItemQuantities}
            setSelectedItem={setSelectedItem}
          />
        </div>
      </div>
      {selectedItem && selectedItemDetails && 
        <InventoryItemDetail
          selectedItemDetails={selectedItemDetails}
          relatedItems={relatedItems}
          onClose={() => setSelectedItem(null)}
        />
      }
    </PageLayout>
  );
}
