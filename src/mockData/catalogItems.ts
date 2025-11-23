import type { CatalogItem as CatalogItemType } from '../types/catalog';

export const mockCatalogItems: CatalogItemType[] = [
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
    displayName: 'Beaker Set (250ml) Beaker Set (250ml) Beaker Set (250ml) Beaker Set (250ml)',
    sku: 'CHEM-BEAK-250',
    description: 'Standard glass beaker set for chemistry labs',
    location: 'glass cabinet by sink',
    tags: ['Chemistry', 'General', 'Earth Science'],
    archived: true,
    archivedAt: '323432431'
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
    id: 'cat-magnifying-glass',
    displayName: 'Magnifying Glass',
    sku: 'GEN-EQUIP-001',
    description: 'Handheld lens for making smaller things appear larger',
    location: 'cabinet by stairway, top shelf',
    tags: ['Biology', 'General'],
  },
];