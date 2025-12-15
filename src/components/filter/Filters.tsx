import SearchInput from "./SearchInput";
import TagFilter from "./TagFilter";
import ViewToggle from "./ViewToggle";

interface FiltersProps {
  availableFilterTags: Array<string>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedTags: Array<string>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  viewMode: 'grid-view' | 'list-view';
  setViewMode: React.Dispatch<React.SetStateAction<'grid-view' | 'list-view'>>;
}

export default function Filters({
  availableFilterTags,
  searchTerm,
  setSearchTerm,
  selectedTags,
  setSelectedTags,
  viewMode,
  setViewMode,
}: FiltersProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-theme-surface border-b border-theme">
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <TagFilter
        availableFilterTags={availableFilterTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <ViewToggle viewMode={viewMode} setViewMode={setViewMode}/>
    </div>
  );
}