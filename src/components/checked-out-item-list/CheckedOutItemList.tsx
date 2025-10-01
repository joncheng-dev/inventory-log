import CheckedOutItem from "./CheckedOutItem";

const mockData = [
  {
    id: '1',
    name: 'wooden plank',
    sku: '123123',
    isCheckedOut: true,
    checkedOutBy: 'joncheng.dev@gmail.com',
    checkOutDate: 'Oct 1, 2025',
  },
  {
    id: '2',
    name: 'meter stick',
    sku: '12341234',
    isCheckedOut: true,
    checkedOutBy: 'joncheng.dev@gmail.com',
    checkOutDate: 'Sept 28, 2025',
  },
  {
    id: '3',
    name: 'bunsen burner',
    sku: '1234512345',
    isCheckedOut: true,
    checkedOutBy: 'joncheng.dev@gmail.com',
    checkOutDate: 'Sept 28, 2025',
  },
];

export default function CheckedOutItemList() {
  const checkedOutItems = mockData;

  return (
    <div className="p-4 border-l border-theme h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Checked Out Items ({checkedOutItems.length})</h2>
        {checkedOutItems.length > 0 ? (
          <ul className="space-y-3">
            {checkedOutItems.map(item => (
              <CheckedOutItem key={item.id} item={item} />
            ))}
          </ul>
        ) : (
          <div className="text-theme-secondary text-sm italic">
            No items currently checked out.
          </div>
        )}
    </div>
  );
}