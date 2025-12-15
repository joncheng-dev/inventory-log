import { Link } from 'react-router-dom';

interface CatalogViewToggleProps {
  currentView: 'active' | 'archived';
}

export default function CatalogViewToggle({ currentView }: CatalogViewToggleProps) {
  return (
    <div className="flex gap-6 px-4 border-b border-theme-border">
      <Link 
        to="/catalog"
        className={`px-1 py-3 font-medium transition-colors duration-200 ${
          currentView === 'active' 
            ? 'text-primary-500 border-b-2 border-primary-500 -mb-[2px]' 
            : 'text-theme-secondary hover:text-theme-primary'
        }`}
      >
        Active Items
      </Link>
      <Link 
        to="/catalog/archived"
        className={`px-1 py-3 font-medium transition-colors duration-200 ${
          currentView === 'archived' 
            ? 'text-primary-500 border-b-2 border-primary-500 -mb-[2px]' 
            : 'text-theme-secondary hover:text-theme-primary'
        }`}
      >
        Archived
      </Link>
    </div>
  );
}
