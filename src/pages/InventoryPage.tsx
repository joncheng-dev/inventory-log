import { useState } from 'react';
import Header from '../components/Header';
import Filters from '../components/filter/Filters';
import ItemListDisplay from '../components/ItemListDisplay';
import CheckedOutItemList from '../components/checked-out-item-list/CheckedOutItemList';
import type { InventoryItem as InventoryItemType } from '../types/inventory';
import InventoryItemDetail from '../components/inventory/InventoryItemDetail';
import type { CatalogItem as CatalogItemType } from '../types/catalog';

const mockCatalogItems: CatalogItemType[] = [
  {
    id: 'cat-slinky',
    displayName: 'Slinky',
    sku: 'PHYS-SLIN-001',
    description: 'A metal spring toy for physics demonstrations',
    location: 'metal cabinet by stairs',
    tags: ['Physics', 'General'],
  },
  {
    id: 'cat-beaker-set',
    displayName: 'Beaker Set (250ml) Beaker Set (250ml) Beaker Set (250ml) Beaker Set (250ml) Beaker Set (250ml) ',
    sku: 'CHEM-BEAK-250',
    description: 'Standard glass beaker set for chemistry labs',
    location: 'glass cabinet by sink',
    tags: ['Chemistry', 'General', 'Physics', 'Earth Science', 'Environmental Science', 'Biology', 'Zoology', 'Geology'],
  },
  {
    id: 'cat-bunsen-burner',
    displayName: 'Bunsen Burner',
    sku: 'CHEM-BURN-001',
    description: 'Gas burner for heating experiments',
    location: 'glass cabinet by sink, bottom shelf',
    tags: ['Chemistry'],
  },
  {
    id: 'cat-magnifying-class',
    displayName: 'Magnifying Glass',
    sku: 'GEN-EQUIP-001',
    description: 'Handheld lens for making smaller things appear larger',
    location: 'cabinet by stairway, top shelf',
    tags: ['Biology', 'General'],
  },
];

const mockInventoryItems: InventoryItemType[] = [
  // 🌀 3 Slinkies (all available)
  { id: 'inv-slinky-001', catalogItemId: 'cat-slinky', isCheckedOut: false },
  { id: 'inv-slinky-002', catalogItemId: 'cat-slinky', isCheckedOut: false },
  { id: 'inv-slinky-003', catalogItemId: 'cat-slinky', isCheckedOut: false },

  // 🧪 12 Beaker Sets (2 checked out, 10 available)
  { id: 'inv-beaker-001', catalogItemId: 'cat-beaker-set', isCheckedOut: true, checkedOutBy: 'sarah.jones@school.edu', dateCheckedOut: '2025-09-28' },
  { id: 'inv-beaker-002', catalogItemId: 'cat-beaker-set', isCheckedOut: true, checkedOutBy: 'sarah.jones@school.edu', dateCheckedOut: '2025-09-28' },
  { id: 'inv-beaker-003', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-004', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-005', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-006', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-007', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-008', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-009', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-010', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-011', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-012', catalogItemId: 'cat-beaker-set', isCheckedOut: false },

  // 🔥 10 Bunsen Burners (1 checked out, 9 available)
  { id: 'inv-burner-001', catalogItemId: 'cat-bunsen-burner', isCheckedOut: true, checkedOutBy: 'joncheng.dev@gmail.com', dateCheckedOut: '2025-09-28' },
  { id: 'inv-burner-002', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-003', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-004', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-005', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-006', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-007', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-008', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-009', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-010', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },

    // 2 Magnifying Glasses (2 checked out, 0 available)
  { id: 'inv-mag-glass-001', catalogItemId: 'cat-magnifying-class', isCheckedOut: true, checkedOutBy: 'joncheng.dev@gmail.com', dateCheckedOut: '2025-10-08' },
  { id: 'inv-mag-glass-001', catalogItemId: 'cat-magnifying-class', isCheckedOut: true, checkedOutBy: 'joncheng.dev@gmail.com', dateCheckedOut: '2025-10-08' },
];

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
            mockInventoryItems={mockInventoryItems}
            mockCatalogItems={mockCatalogItems}
          />
        </div>
        <div className="w-1/5">
          <CheckedOutItemList/>
        </div>
      </div>
      {selectedItem && 
        <InventoryItemDetail
          item={selectedItem}
          allInventoryItems={mockInventoryItems}
          catalogItems={mockCatalogItems}
          onClose={() => setSelectedItem(null)}
        />
      }
    </div>
  );
}