import { useCatalog } from "../../contexts/CatalogContext";
import { useInventory } from "../../contexts/InventoryContext";
import { buildInventoryView } from "../../utils/inventory";

export default function ExpandedUserCheckout({ userEmail, userId }: { userEmail: string; userId: string; }) {
  const { inventoryItems } = useInventory();
  const { catalogItems } = useCatalog();
  const { checkedOutQty, filteredCheckedOutItems } = buildInventoryView(
    userEmail,
    inventoryItems,
    catalogItems
  );

  const totalItems = Object.values(checkedOutQty).reduce((sum, item) => sum + item.quantityCheckedOut, 0);

  return (
    <tr key={`${userId}-expanded`} className="bg-theme-secondary/5">
      <td colSpan={6} className="px-4 py-4">
        <div className="ml-8 mr-4">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-theme-primary">
              Checked Out Items ({totalItems} total)
            </h3>
          </div>
          
          {totalItems === 0 ? (
            <div className="text-sm text-theme-secondary py-3 text-center">
              No items currently checked out
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                    <th className="w-[45%] px-4 py-2.5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      Item Name
                    </th>
                    <th className="w-[35%] px-4 py-2.5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      SKU
                    </th>
                    <th className="w-[20%] px-4 py-2.5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {Object.entries(filteredCheckedOutItems).map(([catalogItemId, itemData]) => {
                    const qty = checkedOutQty[catalogItemId]?.quantityCheckedOut || 0;
                    return (
                      <tr key={catalogItemId}>
                        <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-medium">
                          {itemData.displayName}
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 font-mono text-xs">
                          {itemData.sku}
                        </td>
                        <td className="px-4 py-3 text-gray-900 dark:text-gray-100 text-xs font-semibold text-theme-primary">
                          {qty}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
