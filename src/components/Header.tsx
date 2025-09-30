export default function Header() {
  return (
    <div className='w-full flex justify-between py-4 px-4 border border-amber-900'>
      <div className='flex border border-3 border-amber-900'>
        <div id="site-logo" className='border border-1 content-around px-2 py-2'>
          LM
        </div>
        <div id="site-name" className='border border-1 content-around px-2 py-2'>
          <p className="text-lg">
            Lab Manager
          </p>
        </div>
      </div>
      <div className='flex'>
        <div className='content-around px-5 py-2'>
          <p className="text-lg">
            Item Catalog
          </p>
        </div>
        <div className='content-around px-5 py-2'>
          <p className="text-lg">
            Inventory
          </p>
        </div>
        <div className='content-around ml-10 px-2 py-2'>
          <svg className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}