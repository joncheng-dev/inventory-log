import { Link } from 'react-router-dom';

interface CatalogViewToggleProps {
  currentView: 'active' | 'archived';
}

export default function CatalogViewToggle({ currentView }: CatalogViewToggleProps) {
  return (
    <div className="flex gap-1 px-4 pt-4 bg-theme">
      <Link 
        to="/catalog"
        className={`px-4 py-2 rounded-t-lg font-medium transition-colors duration-200 ${
          currentView === 'active' 
            ? 'bg-theme-surface text-primary-500 border-b-2 border-primary-500' 
            : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-surface/50'
        }`}
      >
        Active Items
      </Link>
      <Link 
        to="/catalog/archived"
        className={`px-4 py-2 rounded-t-lg font-medium transition-colors duration-200 ${
          currentView === 'archived' 
            ? 'bg-theme-surface text-primary-500 border-b-2 border-primary-500' 
            : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-surface/50'
        }`}
      >
        Archived
      </Link>
    </div>
  );
}
