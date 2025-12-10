import { createContext, useContext, useEffect, useState } from "react";
import type { InventoryItem as InventoryItemType, CheckedOutItemDataType, InventoryItemGroupedType } from "../types/inventory";
import { useCatalog } from "./CatalogContext";
import {
  getInventoryItems,
  createInventoryItemsBatch,
  updateInventoryItemsBatch,
  deleteInventoryItemsBatch,
  generateNewInventoryItems,
  buildInventoryView,
  buildSelectedItemDetails,
  removeInventoryItems,
  checkOutInventoryItems,
  returnAllInventoryItems,
  returnInventoryItem
} from '../utils/inventory';

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
  addItemsToInventory: (catalogItemId: string, quantity: number) => Promise<void>;
  removeItemsFromInventory: (catalogItemId: string, quantity: number) => Promise<void>;
  checkOutItems: (catalogItemId: string, qtyToCheckOut: number) => Promise<void>;
  returnAllItems: (catalogItemId: string) => Promise<void>;
  returnItem: (itemId: string) => Promise<void>;
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

  const fetchInventoryItems = async () => {
    setInventoryLoading(true);
    try {
      const items = await getInventoryItems();
      setInventoryItems(items);
    } catch (err) {
      console.error("Failed to fetch inventory items: ", err);
    } finally {
      setInventoryLoading(false);
    }
  }

  const addItemsToInventory = async(
    catalogItemId: string,
    quantity: number
  ): Promise<void> => {
    const template = catalogItems.find((item) => item.id === catalogItemId);
    if (!template) {
      throw new Error(`Catalog template with ID ${catalogItemId} not found.`);
    }
    if (template.archived) {
      throw new Error("Cannot add inventory to an archived template.");
    }
    try {
      const newItems = generateNewInventoryItems(catalogItemId, quantity);
      const ids = await createInventoryItemsBatch(newItems);
      
      // Add to local state with IDs
      const itemsWithIds = newItems.map((item, index) => ({
        ...item,
        id: ids[index]
      }));
      setInventoryItems(prev => [...prev, ...itemsWithIds]);
    } catch (err) {
      console.error("Failed to add items to inventory:", err);
      throw err;
    }
  };

  const removeItemsFromInventory = async (
    catalogItemId: string,
    quantity: number
  ): Promise<void> => {
    const template = catalogItems.find((item) => item.id === catalogItemId);
    if (!template) {
      throw new Error(`Catalog template with ID ${catalogItemId} not found.`);
    }

    try {
      const updatedList = removeInventoryItems(inventoryItems, catalogItemId, quantity);
      const removedItems = inventoryItems.filter(item => !updatedList.includes(item));
      const idsToRemove = removedItems.map(item => item.id);

      await deleteInventoryItemsBatch(idsToRemove);
      setInventoryItems(updatedList);
    } catch (err) {
      console.error("Failed to remove items from inventory: ", err);
      throw err;
    }
  }

  const checkOutItems = async (
    catalogItemId: string,
    qtyToCheckOut: number
  ): Promise<void> => {
    try {
      const updatedList = checkOutInventoryItems(currentUserEmail, inventoryItems, catalogItemId, qtyToCheckOut);
      const checkedOutItems = updatedList.filter((item, index) => {
        const originalItem = inventoryItems[index];
        return item.isCheckedOut && !originalItem.isCheckedOut;
      });

      const updates = checkedOutItems.map(item => ({
        id: item.id,
        data: {
          isCheckedOut: true,
          checkedOutBy: currentUserEmail,
          dateCheckedOut: item.dateCheckedOut
        }
      }));

      await updateInventoryItemsBatch(updates);
      setInventoryItems(updatedList);
    } catch (err) {
      console.error("Failed to check out items: ", err);
      throw err;
    }
  }

  const returnAllItems = async (catalogItemId: string): Promise<void> => {
    try {
      const updatedList = returnAllInventoryItems(currentUserEmail, inventoryItems, catalogItemId);
      const returnedItems = inventoryItems.filter(
        item => item.checkedOutBy === currentUserEmail && item.catalogItemId === catalogItemId
      );
      const updates = returnedItems.map(item => ({
        id: item.id,
        data: {
          isCheckedOut: false,
          checkedOutBy: null,
          dateCheckedOut: null
        }
      }));

      await updateInventoryItemsBatch(updates);
      setInventoryItems(updatedList);
    } catch (err) {
      console.error("Failed to return all items: ", err);
      throw err;
    }
  };

  const returnItem = async (itemId: string): Promise<void> => {
    try {
      const updatedList = returnInventoryItem(inventoryItems, itemId);

      await updateInventoryItemsBatch([{
        id: itemId,
        data: {
          isCheckedOut: false,
          checkedOutBy: null,
          dateCheckedOut: null
        }
      }]);

      setInventoryItems(updatedList);
    } catch (err) {
      console.error("Failed to return item: ", err);
      throw err;
    }
  };

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
        addItemsToInventory,
        removeItemsFromInventory,
        checkOutItems,
        returnAllItems,
        returnItem
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