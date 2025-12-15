import SearchInput from "./filter/SearchInput";
import TagFilter from "./filter/TagFilter";
import ViewToggle from "./filter/ViewToggle";

interface PageActionBarProps {
  // Left slot - page-specific navigation
  leftSlot?: React.ReactNode;
  
  // Center - common filters (always present)
  availableFilterTags: Array<string>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedTags: Array<string>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  viewMode: 'grid-view' | 'list-view';
  setViewMode: React.Dispatch<React.SetStateAction<'grid-view' | 'list-view'>>;
  
  // Right slot - page-specific actions
  rightSlot?: React.ReactNode;
}

export default function PageActionBar({
  leftSlot,
  availableFilterTags,
  searchTerm,
  setSearchTerm,
  selectedTags,
  setSelectedTags,
  viewMode,
  setViewMode,
  rightSlot
}: PageActionBarProps) {
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 border-b border-theme gap-4">
      {/* Left: Page-specific navigation */}
      <div className="flex items-center gap-1">
        {leftSlot}
      </div>
      
      {/* Center: Common filters */}
      <div className="flex items-center gap-3 flex-1 justify-center max-w-2xl">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TagFilter
          availableFilterTags={availableFilterTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      
      {/* Right: Page-specific actions */}
      <div className="flex items-center gap-3">
        {rightSlot}
      </div>
    </div>
  );
}
