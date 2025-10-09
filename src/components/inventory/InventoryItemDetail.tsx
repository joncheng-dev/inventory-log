import type { InventoryItem as InventoryItemType } from '../../types/inventory';
import type { CatalogItem } from '../../types/catalog';

interface InventoryItemDetailProps {
  item: InventoryItemType;
  onClose: React.Dispatch<React.SetStateAction<InventoryItemType | null>>;
}

// Purpose of this component
// Display details of inventory item
//
// from InventoryItem entry:
// catalogItemId (targets correct catalog item)
// isCheckedOut (tally of total)
// checkedOutBy (connects with count of isCheckedOut)
// dateCheckedOut (connects with the above 2)

// from CatalogItem entry (pull in details from here to display):
// displayName
// sku
// description
// location
// tags (array)

export default function InventoryItemDetail({ item, onClose }: InventoryItemDetailProps ) {

  return (
    // aN EMPTY modal
    <div className="modal">
      <p>modal text</p>
      <button
        className='closeModal'
        onClick={() => onClose(null)}
      >
        Close modal
      </button>
    </div>
  );
}