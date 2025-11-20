import { createContext, useContext, useEffect, useState } from "react";
import type { InventoryItem as InventoryItemType, CheckedOutItemDataType, InventoryItemGroupedType } from "../types/inventory";
import { mockInventoryItems } from "../mockData/inventoryItems";
import { useCatalog } from "./CatalogContext";
import { buildInventoryView, buildSelectedItemDetails } from '../utils/inventory';

interface InventoryContextType {
  inventoryLoading: boolean;
  inventoryItems: InventoryItemType[];
  aggregatedInventory: Record<string, InventoryItemGroupedType>;
  checkedOutQty: Record<string, CheckedOutItemDataType>;
  filteredCheckedOutItems: Record<string, InventoryItemGroupedType>;
  selectedItemLoading: boolean;
  fetchSelectedItemDetails: (selectedItem: InventoryItemGroupedType) => Promise<void>;
  selectedItemDetails: InventoryItemGroupedType | null;
  relatedItems: InventoryItemType[];
}

const InventoryContext = createContext<InventoryContextType | null>(null);

export const InventoryProvider = ({ children }: { children: React.ReactNode; }) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItemType[]>([]);
  const [aggregatedInventory, setAggregatedInventory] = useState<Record<string, InventoryItemGroupedType>>({});
  const [checkedOutQty, setCheckedOutQty] = useState<Record<string, CheckedOutItemDataType>>({});
  const [filteredCheckedOutItems, setFilteredCheckedOutItems] = useState<Record<string, InventoryItemGroupedType>>({});
  const { catalogItems } = useCatalog();
  const currentUserEmail = 'joncheng.dev@gmail.com';
  
  // Selected Item Details
  const [selectedItemDetails, setSelectedItemDetails] = useState<InventoryItemGroupedType | null>(null);
  const [relatedItems, setRelatedItems] = useState<InventoryItemType[]>([]);
  
  // Loading States
  const [inventoryLoading, setInventoryLoading] = useState(true);
  const [selectedItemLoading, setSelectedItemLoading] = useState(false);

  // Fetch -- currently using mock data
  const fetchInventoryItems = async () => {
    setInventoryLoading(true);
    await new Promise(r => setTimeout(r, 300));
    setInventoryItems(mockInventoryItems);
  }

  // Fetch grouped inventory items
  const fetchInventoryPageData = async () => {
    await new Promise(r => setTimeout(r, 300));
    // Use existing inventory item list to generate a list of unique inventory items with quantity values
    // Calculate checked out items associated with current user
    const {
      aggregatedItems,
      checkedOutQty,
      filteredCheckedOutItems
    } = buildInventoryView(currentUserEmail, inventoryItems, catalogItems);

    setAggregatedInventory(aggregatedItems);
    setCheckedOutQty(checkedOutQty);
    setFilteredCheckedOutItems(filteredCheckedOutItems);
    setInventoryLoading(false);
  }

  const fetchSelectedItemDetails = async (selectedItem: InventoryItemGroupedType) => {
    setSelectedItemDetails(null);
    setSelectedItemLoading(true);
    // await new Promise(r => setTimeout(r, 300));
    const {
      itemDetails,
      relatedItems
    } = buildSelectedItemDetails(inventoryItems, catalogItems, selectedItem);
    setSelectedItemDetails(itemDetails);
    setRelatedItems(relatedItems);
    setSelectedItemLoading(false);
  }

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  useEffect(() => {
    if (inventoryItems.length > 0) fetchInventoryPageData();      
  }, [inventoryItems]);

  return (
    <InventoryContext.Provider
      value={{
        inventoryLoading,
        inventoryItems,
        aggregatedInventory,
        checkedOutQty,
        filteredCheckedOutItems,
        selectedItemLoading,
        fetchSelectedItemDetails,
        selectedItemDetails,
        relatedItems,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider');
  return ctx;
}