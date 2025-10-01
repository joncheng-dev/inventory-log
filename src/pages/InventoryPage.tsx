import { useState } from 'react';
import { MainLayout } from '../layouts';
import type { ViewMode } from '../types';
import { AVAILABLE_FILTER_TAGS } from '../lib/constants';
import Filters from '../components/filter/Filters';
import ItemListDisplay from '../components/ItemListDisplay';
import CheckedOutItemList from '../components/checked-out-item-list/CheckedOutItemList';

export default function InventoryPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid-view');

  // Filter via Tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  console.log("selectedTags: ", selectedTags);

  return (
    <MainLayout>
      <div className="flex flex-col h-full w-full">
        <div className="flex w-full border-b border-theme">
          <Filters
            viewMode={viewMode}
            setViewMode={setViewMode}
            availableFilterTags={AVAILABLE_FILTER_TAGS}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </div>
        <div className="flex flex-1 w-full">
          <div className="flex-1 border-r border-theme">
            <ItemListDisplay viewMode={viewMode} />
          </div>
          <div className="w-1/5">
            <CheckedOutItemList/>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}