import type { InventoryItem as InventoryItemType } from "../types/inventory";

export const mockInventoryItems: InventoryItemType[] = [
  // 🌀 3 Slinkies (all available)
  { id: 'inv-slinky-001', catalogItemId: 'cat-slinky', isCheckedOut: false },
  { id: 'inv-slinky-002', catalogItemId: 'cat-slinky', isCheckedOut: false },
  { id: 'inv-slinky-003', catalogItemId: 'cat-slinky', isCheckedOut: false },

  // 🧪 12 Beaker Sets (2 checked out, 10 available)
  { id: 'inv-beaker-001', catalogItemId: 'cat-beaker-set', isCheckedOut: true, checkedOutBy: 'sarah.jones@school.edu', dateCheckedOut: '2025-09-28' },
  { id: 'inv-beaker-002', catalogItemId: 'cat-beaker-set', isCheckedOut: true, checkedOutBy: 'joncheng.dev@gmail.com', dateCheckedOut: '2025-09-29' },
  { id: 'inv-beaker-003', catalogItemId: 'cat-beaker-set', isCheckedOut: true, checkedOutBy: 'joncheng.dev@gmail.com', dateCheckedOut: '2025-09-29' },
  { id: 'inv-beaker-004', catalogItemId: 'cat-beaker-set', isCheckedOut: true, checkedOutBy: 'joncheng.dev@gmail.com', dateCheckedOut: '2025-09-29' },
  { id: 'inv-beaker-005', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-006', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-007', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-008', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-009', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-010', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-011', catalogItemId: 'cat-beaker-set', isCheckedOut: false },
  { id: 'inv-beaker-012', catalogItemId: 'cat-beaker-set', isCheckedOut: false },

  // 🔥 10 Bunsen Burners (1 checked out, 9 available)
  { id: 'inv-burner-001', catalogItemId: 'cat-bunsen-burner', isCheckedOut: true, checkedOutBy: 'joncheng.dev@gmail.com', dateCheckedOut: '2025-09-29' },
  { id: 'inv-burner-002', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-003', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-004', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-005', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-006', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-007', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-008', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-009', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },
  { id: 'inv-burner-010', catalogItemId: 'cat-bunsen-burner', isCheckedOut: false },

    // 3 Magnifying Glasses (2 checked out, 1 available)
  { id: 'inv-mag-glass-001', catalogItemId: 'cat-magnifying-glass', isCheckedOut: true, checkedOutBy: 'joncheng.dev@gmail.com', dateCheckedOut: '2025-10-08' },
  { id: 'inv-mag-glass-002', catalogItemId: 'cat-magnifying-glass', isCheckedOut: true, checkedOutBy: 'joncheng.dev@gmail.com', dateCheckedOut: '2025-10-08' },
  { id: 'inv-mag-glass-003', catalogItemId: 'cat-magnifying-glass', isCheckedOut: false },
];