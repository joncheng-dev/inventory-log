

interface CheckedOutItem {
  id: string;
  name: string;
  sku: string;
  isCheckedOut: boolean;
  checkedOutBy: string;
  checkOutDate: string;
}

type CheckedOutItemProps = {
  item: CheckedOutItem;
}

export default function CheckedOutItem({ item }: CheckedOutItemProps) {
  return (
    <li className="bg-theme-surface p-3 rounded shadow">
      <div className="font-medium">{item.name}</div>
      <div className="text-sm text-theme-secondary">Checked out: {item.checkOutDate}</div>
      <div className="text-sm text-primary-500">Due: Oct 2 (Overdue)</div>
      <div className="flex gap-2 mt-2">
        <button className="text-primary-500 text-sm hover:underline">View</button>
        <button className="text-primary-500 text-sm hover:underline">Return</button>
      </div>
    </li>
  );
}