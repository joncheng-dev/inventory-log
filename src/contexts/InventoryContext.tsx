import { createContext, useContext, useEffect, useState } from "react";
import type { InventoryItem as InventoryItemType, CheckedOutItemDataType, InventoryItemGroupedType } from "../types/inventory";
import { mockInventoryItems } from "../mockData/inventoryItems";
import { useCatalog } from "./CatalogContext";
import { buildInventoryView } from '../utils/inventory';

interface InventoryContextType {
  inventoryItems: InventoryItemType[];
  aggregatedInventory: Record<string, InventoryItemGroupedType>;
  checkedOutQty: Record<string, CheckedOutItemDataType>;
  filteredCheckedOutItems: Record<string, InventoryItemGroupedType>;
}

const InventoryContext = createContext<InventoryContextType | null>(null);

export const InventoryProvider = ({ children }: { children: React.ReactNode; }) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItemType[]>([]);
  const [aggregatedInventory, setAggregatedInventory] = useState<Record<string, InventoryItemGroupedType>>({});
  const [checkedOutQty, setCheckedOutQty] = useState<Record<string, CheckedOutItemDataType>>({});
  const [filteredCheckedOutItems, setFilteredCheckedOutItems] = useState<Record<string, InventoryItemGroupedType>>({});
  const { catalogItems } = useCatalog();
  const currentUserEmail = 'joncheng.dev@gmail.com';

  // Fetch -- currently using mock data
  const fetchInventoryItems = async () => {
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
        inventoryItems,
        aggregatedInventory,
        checkedOutQty,
        filteredCheckedOutItems,
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