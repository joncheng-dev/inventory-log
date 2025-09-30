import DropdownMenu from './DropdownMenu';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  return (
    <div className='w-full flex justify-between py-4 px-4 border border-amber-900 dark:border-amber-600 bg-white dark:bg-gray-900 transition-colors duration-200'>
      <div className='flex border border-3 border-amber-900 dark:border-amber-600'>
        <div id="site-logo" className='border border-1 content-around px-2 py-2 bg-amber-50 dark:bg-amber-900'>
          <span className="text-amber-900 dark:text-amber-100 font-bold">LM</span>
        </div>
        <div id="site-name" className='border border-1 content-around px-2 py-2 bg-amber-50 dark:bg-amber-900'>
          <p className="text-lg text-amber-900 dark:text-amber-100">
            Lab Manager
          </p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='content-around px-5 py-2'>
          <p className="text-lg text-gray-900 dark:text-gray-100">
            Item Catalog
          </p>
        </div>
        <div className='content-around px-5 py-2'>
          <p className="text-lg text-gray-900 dark:text-gray-100">
            Inventory
          </p>
        </div>
        <DarkModeToggle />
        <DropdownMenu />
      </div>
    </div>
  );
}