import { createContext, useContext, useEffect, useState } from "react";
import type { CatalogItem as CatalogItemType } from '../types/catalog';
import {
  getCatalogTemplates,
  createCatalogTemplate,
  updateCatalogTemplate,
  archiveCatalogTemplate,
  unarchiveCatalogTemplate
} from '../utils/catalog';

interface CatalogContextType {
  catalogItems: CatalogItemType[];
  loading: boolean;
  error: string | null;
  fetchCatalogItems: () => Promise<void>;
  addNewCatalogItem: (newItem: Omit<CatalogItemType, "id">) => Promise<void>;
  updateCatalogItem: (updated: CatalogItemType) => Promise<void>;
  archiveCatalogItem: (id: string) => Promise<void>;
  unarchiveCatalogItem: (id: string) => Promise<void>;
}

const CatalogContext = createContext<CatalogContextType | null>(null);

export const CatalogProvider = ({ children }: { children: React.ReactNode }) => {
  const [catalogItems, setCatalogItems] = useState<CatalogItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCatalogItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await getCatalogTemplates();
      setCatalogItems(items);
    } catch (err) {
      setError("Failed to fetch catalog items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addNewCatalogItem = async (newItem: Omit<CatalogItemType, "id">) => {
    setError(null);
    try {
      const id = await createCatalogTemplate(newItem);
      setCatalogItems(prev => [...prev, { id, ...newItem }]);
    } catch (err) {
      setError("Failed to add catalog item");
      console.error(err);
      throw err; 
    }
  };

  const updateCatalogItem = async (updated: CatalogItemType) => {
    setError(null);
    try {
      const { id, ...updates } = updated;
      await updateCatalogTemplate(id, updates);
      setCatalogItems(prev =>
        prev.map(item => (item.id === id ? updated : item))
      );
    } catch (err) {
      setError("Failed to update catalog item");
      console.error(err);
      throw err;
    }
  };

  const archiveCatalogItem = async (id: string) => {
    setError(null);
    try {
      await archiveCatalogTemplate(id);
      setCatalogItems(prev =>
        prev.map(item =>
          item.id === id
            ? { ...item, archived: true, archivedAt: new Date().toISOString() }
            : item
        )
      );
    } catch (err) {
      setError("Failed to archive catalog item");
      console.error(err);
      throw err;
    }
  };

  const unarchiveCatalogItem = async (id: string) => {
    setError(null);
    try {
      await unarchiveCatalogTemplate(id);
      setCatalogItems(prev =>
        prev.map(item =>
          item.id === id
            ? { ...item, archived: false, archivedAt: null }
            : item
        )
      );
    } catch (err) {
      setError("Failed to unarchive catalog item");
      console.error(err);
      throw err;
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchCatalogItems();
  }, []);

  return (
    <CatalogContext.Provider
      value={{
        catalogItems,
        loading,
        error,
        fetchCatalogItems,
        addNewCatalogItem,
        updateCatalogItem,
        archiveCatalogItem,
        unarchiveCatalogItem
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }
  return context;
};
