import { createContext, useContext, useEffect, useState } from "react";
import type { InventoryItem as InventoryItemType } from "../types/inventory";
import { mockInventoryItems } from "../mockData/inventoryItems";

interface InventoryContextType {
  inventoryItems: InventoryItemType[];
  fetchInventoryItems: () => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | null>(null);

export const InventoryProvider = ({ children }: { children: React.ReactNode; }) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItemType[]>([]);

  // Fetch -- currently using mock data
  const fetchInventoryItems = async () => {
    await new Promise(r => setTimeout(r, 300));
    setInventoryItems(mockInventoryItems);
  }

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  return (
    <InventoryContext.Provider
      value={{ inventoryItems, fetchInventoryItems }}
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