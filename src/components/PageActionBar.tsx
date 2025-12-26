import SearchInput from "./filter/SearchInput";
import TagFilter from "./filter/TagFilter";
import ViewToggle from "./filter/ViewToggle";

interface PageActionBarProps {
  // Left slot - page-specific navigation
  leftSlot?: React.ReactNode;
  
  // Center - common search input (always present)
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  // Center - for catalog and inventory pages
  showTagFilter: boolean;
  availableFilterTags?: Array<string>;
  selectedTags?: Array<string>;
  setSelectedTags?: React.Dispatch<React.SetStateAction<string[]>>;
  showViewToggle?: boolean;

  // Right slot - page-specific actions
  rightSlot?: React.ReactNode;
}

export default function PageActionBar({
  leftSlot,
  searchTerm,
  setSearchTerm,
  showTagFilter = false,
  availableFilterTags,
  selectedTags,
  setSelectedTags,
  showViewToggle = false,
  rightSlot
}: PageActionBarProps) {
  return (
    <div className="grid grid-cols-[auto,1fr] lg:grid-cols-[1fr,auto,1fr] items-center w-full px-4 py-3 border-b border-theme gap-4">
      {/* Left: Page-specific navigation - hidden on mobile */}
      <div className="hidden lg:flex items-center gap-1">
        {leftSlot}
      </div>
      
      {/* Center: Common filters */}
      <div className="flex items-center gap-3 justify-center lg:justify-center">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {showTagFilter && availableFilterTags && selectedTags && setSelectedTags && (
          <TagFilter
            availableFilterTags={availableFilterTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        )}
        {showViewToggle && (
          <ViewToggle />
        )}
      </div>
      
      {/* Right: Page-specific actions */}
      <div className="flex items-center gap-3 justify-end">
        {rightSlot}
      </div>
    </div>
  );
}
