/**
 * Types for filtering and search functionality
 */

export interface FilterState {
  searchQuery: string;
  selectedTags: string[];
  viewMode: 'grid-view' | 'list-view';
}

export interface FilterProps {
  availableFilterTags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

