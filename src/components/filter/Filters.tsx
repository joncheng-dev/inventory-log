import SearchInput from "./SearchInput";
import TagFilter from "./TagFilter";
import ViewToggle from "./ViewToggle";

interface FiltersProps {
  viewMode: 'grid-view' | 'list-view';
  setViewMode: React.Dispatch<React.SetStateAction<'grid-view' | 'list-view'>>;
}

export default function Filters({ viewMode, setViewMode }: FiltersProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-theme-surface border-b border-theme">
      <SearchInput />
      <TagFilter/>
      <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-theme-focus-ring transition-colors duration-200 font-medium">
        Add Item
      </button>
      <ViewToggle viewMode={viewMode} setViewMode={setViewMode}/>
    </div>
  );
}