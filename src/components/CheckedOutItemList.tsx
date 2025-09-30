import CheckedOutItem from "./CheckedOutItem";

export default function CheckedOutItemList() {
  return (
    <div className="p-4 border-l border-gray-200 h-full bg-gray-50 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Checked Out Items (1)</h2>
      <ul className="space-y-3">
        <CheckedOutItem/>
      </ul>
    </div>
  );
}