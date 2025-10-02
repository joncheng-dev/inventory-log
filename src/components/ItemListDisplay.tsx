import type { InventoryItem } from '../types/inventory';
import InventoryItemList from './inventory/InventoryItemList';

interface ItemListDisplayProps {
  viewMode: 'grid-view' | 'list-view';
  selectedTags: string[];
}

// Mock data for demonstration
const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Microscope - Compound',
    categories: ['Biology', 'General', 'Earth Science'],
    sku: 'BIO-MICRO-001',
    isCheckedOut: false,
    quantity: 5,
    description: 'High-quality compound microscope for cell observation',
  },
  {
    id: '2',
    name: 'Beaker Set (250ml)',
    categories: ['Chemistry', '12'],
    sku: 'CHEM-BEAK-250',
    isCheckedOut: true,
    checkedOutBy: 'sarah.jones@school.edu',
    checkOutDate: 'Sept 28, 2025',
    quantity: 12,
  },
  {
    id: '3',
    name: 'Digital Scale',
    categories: ['General'],
    sku: 'GEN-SCALE-001',
    isCheckedOut: false,
    quantity: 3,
  },
  {
    id: '4',
    name: 'Rock & Mineral Kit',
    categories: ['Earth Science'],
    sku: 'EARTH-ROCK-KIT',
    isCheckedOut: false,
    quantity: 8,
  },
  {
    id: '5',
    name: 'Bunsen Burner',
    categories: ['Chemistry'],
    sku: 'CHEM-BURN-001',
    isCheckedOut: true,
    checkedOutBy: 'joncheng.dev@gmail.com',
    checkOutDate: 'Sept 28, 2025',
    quantity: 10,
  },
  {
    id: '6',
    name: 'Newton\'s Cradle',
    categories: ['Physics'],
    sku: 'PHYS-NEWT-001',
    isCheckedOut: false,
    quantity: 2,
  },
  {
    id: '7',
    name: 'Petri Dishes (100mm)',
    categories: ['Biology'],
    sku: 'BIO-PETRI-100',
    isCheckedOut: false,
    quantity: 50,
  },
  {
    id: '8',
    name: 'pH Test Strips',
    categories: ['Chemistry', 'General'],
    sku: 'CHEM-PH-STRIP',
    isCheckedOut: true,
    checkedOutBy: 'teacher@school.edu',
    checkOutDate: 'Oct 1, 2025',
    quantity: 20,
  },
  {
    id: '9',
    name: 'Telescope - Reflector',
    categories: ['Physics'],
    sku: 'PHYS-TELE-001',
    isCheckedOut: false,
    quantity: 1,
  },
  {
    id: '10',
    name: 'Soil Testing Kit',
    categories: ['Earth Science', 'General'],
    sku: 'EARTH-SOIL-KIT',
    isCheckedOut: false,
    quantity: 6,
  },
  {
    id: '11',
    name: 'Safety Goggles',
    categories: ['General'],
    sku: 'GEN-GOGG-001',
    isCheckedOut: false,
    quantity: 30,
  },
  {
    id: '12',
    name: 'Dissection Kit',
    categories: ['Biology', 'General'],
    sku: 'BIO-DISS-KIT',
    isCheckedOut: true,
    checkedOutBy: 'lab.assistant@school.edu',
    checkOutDate: 'Sept 30, 2025',
    quantity: 15,
  },
];

export default function ItemListDisplay({ viewMode, selectedTags }: ItemListDisplayProps) {
  // Filter items based on selected tags
  const filteredItems = selectedTags.length === 0
    ? mockInventoryItems
    : mockInventoryItems.filter(item => item.categories.some(c => selectedTags.includes(c)));

  return (
    <div className="h-full overflow-y-auto">
      <InventoryItemList items={filteredItems} viewMode={viewMode} />
    </div>
  );
}