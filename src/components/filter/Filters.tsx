import SearchInput from "./SearchInput";
import TagFilter from "./TagFilter";

export default function Filters() {
  return (
    <div className="flex gap-4 px-4 py-3 bg-theme-surface border-b border-theme">
      <SearchInput />
      <div className="flex items-center">
        <TagFilter/>
      </div>
      <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-theme-focus-ring transition-colors duration-200 font-medium">
        Add Item
      </button>
    </div>
  );
}