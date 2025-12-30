import { Link } from 'react-router-dom';

interface CatalogViewToggleProps {
  currentView: 'active' | 'archived';
}

export default function CatalogViewToggle({ currentView }: CatalogViewToggleProps) {
  return (
    <>
      <Link 
        to="/admin/catalog"
        className={`px-4 py-2 font-medium transition-colors duration-200 rounded-lg ${
          currentView === 'active' 
            ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-hover'
        }`}
      >
        Active
      </Link>
      <Link 
        to="/admin/catalog/archived"
        className={`px-4 py-2 font-medium transition-colors duration-200 rounded-lg ${
          currentView === 'archived' 
            ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-hover'
        }`}
      >
        Archived
      </Link>
    </>
  );
}
