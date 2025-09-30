export default function SearchInput() {
  return (
    <div className='relative'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <svg className="w-5 h-5 text-theme-muted" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="pl-10 pr-4 py-2 w-full border border-theme rounded-md focus:outline-none focus:ring-2 focus:ring-theme-focus bg-theme text-theme-primary placeholder-theme-muted transition-colors duration-200"
      />          
    </div>
  );
}