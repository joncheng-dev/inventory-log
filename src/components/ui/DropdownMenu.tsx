import { useState } from 'react';

export default function DropdownMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentUser = 'joncheng.dev@gmail.com';

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='ml-10 px-2 py-2 relative'>
      <svg 
        className='cursor-pointer text-theme-primary hover:text-primary-500 transition-colors duration-200' 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={toggleDropdown}
      >
        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-theme-surface rounded-md shadow-lg border border-theme z-50">
          <div className="py-2 px-4 border-b border-theme-muted">
            <p className="text-xs text-theme-secondary mb-1">Signed in as</p>
            <p className="text-sm font-medium text-theme-primary truncate">
              {currentUser}
            </p>
          </div>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-theme-primary hover:bg-theme transition-colors duration-200"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-theme-primary hover:bg-theme transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-theme-primary hover:bg-theme transition-colors duration-200"
            >
              Sign Out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
