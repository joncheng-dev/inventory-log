import type { InventoryItemGroupedType, CheckedOutItemDataType } from "../../types/inventory";

type CheckedOutItemProps = {
  checkedOutItem: InventoryItemGroupedType;
  checkedOutItemQuantities: CheckedOutItemDataType;
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItemGroupedType | null>>;
}

export default function CheckedOutItem({ checkedOutItem, checkedOutItemQuantities, setSelectedItem }: CheckedOutItemProps) {
  return (
    <li className="bg-theme-surface p-3 rounded shadow">
      <div className="font-medium truncate">{checkedOutItem.displayName}</div>
      {/* <div className="text-sm text-theme-secondary">Checked out: {item.checkOutDate}</div> */}
      <div className="text-sm text-primary-500">Quantity Checked Out: {checkedOutItemQuantities.quantityCheckedOut}</div>
      <div className="flex gap-2 mt-2">
        <button
          className="text-primary-500 text-sm hover:underline"
          onClick={() => setSelectedItem(checkedOutItem)}
        >
          View
        </button>
        {/* <button className="text-primary-500 text-sm hover:underline">Return</button> */}
      </div>
    </li>
  );
}