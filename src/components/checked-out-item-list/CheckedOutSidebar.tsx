import type { InventoryItemGroupedType, CheckedOutItemDataType } from "../../types/inventory";
import CheckedOutItem from "./CheckedOutItem";

interface CheckedOutSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  checkedOutItemsList: Record<string, InventoryItemGroupedType> | null;
  checkedOutItemQuantities: Record<string, CheckedOutItemDataType> | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<InventoryItemGroupedType | null>>;
}

export default function CheckedOutSidebar({ 
  isOpen,
  onClose,
  checkedOutItemsList, 
  checkedOutItemQuantities, 
  setSelectedItem 
}: CheckedOutSidebarProps) {
  const checkedOutItemTypes = checkedOutItemsList ? Object.keys(checkedOutItemsList).length : 0;
  
  return (
    <>
      {/* Backdrop for mobile - click to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className="
          fixed lg:static
          top-0 right-0
          h-full w-80
          bg-theme border-l border-theme
          z-50
          flex flex-col
        ">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-theme shrink-0">
          <h2 className="text-lg font-semibold text-theme-primary">
            Checked Out Items ({checkedOutItemTypes})
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-theme-hover rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {checkedOutItemTypes > 0 &&
          checkedOutItemsList &&
          checkedOutItemQuantities ? (
            <ul className="space-y-3">
              {Object.entries(checkedOutItemsList).map(([key, item]) => (
                <CheckedOutItem
                  key={key}
                  checkedOutItem={item}
                  checkedOutItemQuantities={checkedOutItemQuantities[key]}
                  setSelectedItem={setSelectedItem}
                />
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-center text-theme-secondary mt-8">
              No items currently checked out.
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
