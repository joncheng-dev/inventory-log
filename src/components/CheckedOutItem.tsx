export default function CheckedOutItem() {
  return (
    <li className="bg-white p-3 rounded shadow">
      <div className="font-medium">Meter Stick</div>
      <div className="text-sm text-gray-600">Checked out: Sept 25</div>
      <div className="text-sm text-red-600">Due: Oct 2 (Overdue)</div>
      <div className="flex gap-2 mt-2">
        <button className="text-blue-600 text-sm hover:underline">View</button>
        <button className="text-red-600 text-sm hover:underline">Return</button>
      </div>
    </li>
  );
}