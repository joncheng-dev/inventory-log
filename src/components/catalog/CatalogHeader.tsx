import { Link } from 'react-router-dom';

interface CatalogHeaderProps {
  currentView: 'active' | 'archived';
  onNewClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CatalogHeader({ currentView, onNewClick }: CatalogHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 border-b border-theme-border">
      <div className="flex gap-6">
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
      
      <button
        onClick={() => onNewClick(true)}
        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
      >
        <span className="text-xl leading-none">+</span>
        Add New Template
      </button>
    </div>
  );
}
