import DropdownMenu from './DropdownMenu';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  return (
    <div className='w-full flex justify-between py-4 px-4 border-b border-theme bg-theme text-theme-primary transition-colors duration-200'>
      <div className='flex border border-theme rounded-lg overflow-hidden'>
        <div id="site-logo" className='px-3 py-2 bg-primary-500 text-white'>
          <span className="font-bold">LM</span>
        </div>
        <div id="site-name" className='px-3 py-2 bg-theme-surface text-theme-primary'>
          <p className="text-lg font-medium">
            Lab Manager
          </p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='px-3 py-2 rounded-lg hover:bg-theme-surface transition-colors duration-200'>
          <p className="text-lg text-theme-primary">
            Item Catalog
          </p>
        </div>
        <div className='px-3 py-2 rounded-lg hover:bg-theme-surface transition-colors duration-200'>
          <p className="text-lg text-theme-primary">
            Inventory
          </p>
        </div>
        <DarkModeToggle />
        <DropdownMenu />
      </div>
    </div>
  );
}