import { createContext, useContext, useEffect, useState } from "react";
import type { CatalogItem as CatalogItemType } from '../types/catalog';
import { archiveItem } from '../utils/catalog';
import { mockCatalogItems } from '../mockData/catalogItems';

interface CatalogContextType {
  catalogItems: CatalogItemType[];
  fetchCatalogItems: () => Promise<void>;
  updateCatalogItem: (updated: CatalogItemType) => Promise<void>;
  addNewCatalogItem: (newItem: CatalogItemType) => Promise<void>;
  archiveCatalogItem: (selectedItem: CatalogItemType) => Promise<void>;
}

const CatalogContext = createContext<CatalogContextType | null>(null);

export const CatalogProvider = ({ children }: { children: React.ReactNode; }) => {
  const [catalogItems, setCatalogItems] = useState<CatalogItemType[]>([]);

  // Fetch -- currently using mock data
  const fetchCatalogItems = async () => {
    await new Promise(r => setTimeout(r, 300));
    setCatalogItems(mockCatalogItems);
  };

  const addNewCatalogItem = async (newItem: CatalogItemType) => {
    await new Promise(r => setTimeout(r, 300));
    setCatalogItems(prev => [...prev, newItem]);
  };

  const updateCatalogItem = async (updated: CatalogItemType) => {
    await new Promise(r => setTimeout(r, 300));

    setCatalogItems(prev =>
      prev.map(item => (item.id === updated.id ? updated : item))
    );
  };

  const archiveCatalogItem = async (selectedItem: CatalogItemType) => {
    await new Promise(r => setTimeout(r, 300));
    const updatedItem = archiveItem(selectedItem);
    setCatalogItems(prev =>
      prev.map(item => item.id === updatedItem.id ? updatedItem : item)
    );
  }

  useEffect(() => {
    fetchCatalogItems();
  }, []);

  return (
    <CatalogContext.Provider
      value={{
        catalogItems,
        fetchCatalogItems,
        updateCatalogItem,
        addNewCatalogItem,
        archiveCatalogItem
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}