import { useState } from 'react';
import Header from '../components/Header';
import Filters from '../components/filter/Filters';
import ItemListDisplay from '../components/ItemListDisplay';
import CheckedOutItemList from '../components/checked-out-item-list/CheckedOutItemList';
import type { InventoryItem as InventoryItemType } from '../types/inventory';
import InventoryItemDetail from '../components/inventory/InventoryItemDetail';

export default function InventoryPage() {
  const [viewMode, setViewMode] = useState<'grid-view' | 'list-view'>('grid-view');
  const [selectedItem, setSelectedItem] = useState<InventoryItemType | null>(null);
  console.log('selectedItem: ', selectedItem);

  // Filter via Tags
  const availableFilterTags = ["Biology", "Chemistry", "Earth Science", "General", "Physics"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-theme text-theme-primary transition-colors duration-200">
      <Header />
      <div className="flex w-full border-b border-theme">
        <Filters
          viewMode={viewMode}
          setViewMode={setViewMode}
          availableFilterTags={availableFilterTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </div>
      <div className="flex flex-1 w-full">
        <div className="flex-1 border-r border-theme">
          <ItemListDisplay
            viewMode={viewMode}
            selectedTags={selectedTags}
            setSelectedItem={setSelectedItem}
          />
        </div>
        <div className="w-1/5">
          <CheckedOutItemList/>
        </div>
      </div>
      {selectedItem && 
        <InventoryItemDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      }
    </div>
  );
}