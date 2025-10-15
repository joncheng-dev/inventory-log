import type { InventoryItemGroupedType, CheckedOutItemDataType } from "../../types/inventory";
import CheckedOutItem from "./CheckedOutItem";

interface CheckedOutItemListProps {
  checkedOutItemsList: Record<string, InventoryItemGroupedType> | null;
  checkedOutItemQuantities: Record<string, CheckedOutItemDataType> | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItemGroupedType | null>>;
}

export default function CheckedOutItemList({ checkedOutItemsList, checkedOutItemQuantities, setSelectedItem }: CheckedOutItemListProps) {
  let checkedOutItemTypes = 0;
  if (checkedOutItemsList) {    
    checkedOutItemTypes = Object.keys(checkedOutItemsList).length;
  }

  return (
    <div className="p-4 border-l border-theme h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Checked Out Items ({checkedOutItemTypes})</h2>
        {checkedOutItemTypes > 0 && checkedOutItemsList && checkedOutItemQuantities ? (
          <ul className="space-y-3">
            {Object.entries(checkedOutItemsList).map(([key, item]) => {
              const quantity = checkedOutItemQuantities?.[key];

              return (
                <CheckedOutItem
                  key={key}
                  checkedOutItem={item}
                  checkedOutItemQuantities={quantity}
                  setSelectedItem={setSelectedItem}
                />
              );
            })}
          </ul>
        ) : (
          <div className="text-theme-secondary text-sm italic">
            No items currently checked out.
          </div>
        )}
    </div>
  );
}