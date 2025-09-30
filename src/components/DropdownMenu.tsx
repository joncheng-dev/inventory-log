import { useState } from 'react';

export default function DropdownMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='content-around ml-10 px-2 py-2 relative'>
      <svg 
        className='cursor-pointer' 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={toggleDropdown}
      >
        <path d="M4 6H20M4 12H20M4 18H20" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Inventory
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign In
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              About
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
