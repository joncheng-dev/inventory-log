import SearchInput from "./SearchInput";
import TagFilter from "./TagFilter";
import ViewToggle from "./ViewToggle";

interface FiltersProps {
  availableFilterTags: Array<string>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedTags: Array<string>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
  rightSlot?: React.ReactNode;
}

export default function Filters({
  availableFilterTags,
  searchTerm,
  setSearchTerm,
  selectedTags,
  setSelectedTags,
  rightSlot
}: FiltersProps) {
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 border-b border-theme">
      <div className="flex items-center gap-3 flex-1">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          />
        <TagFilter
          availableFilterTags={availableFilterTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </div>
      <div className="flex items-center gap-3">
        <ViewToggle />
        { rightSlot }
      </div>
    </div>
  );
}