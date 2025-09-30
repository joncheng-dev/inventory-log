import Header from '../components/Header';
import Filters from '../components/filter/Filters';
import ItemList from '../components/ItemList';
import CheckedOutItemList from '../components/CheckedOutItemList';

export default function InventoryPage() {
  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="flex w-full border border-fuchsia-300 dark:border-fuchsia-600">
        <Filters/>
      </div>
      <div className="flex flex-1 w-full">
        <div className="flex-1 border border-cyan-300 dark:border-cyan-600">
          <ItemList />
        </div>
        <div className="w-1/5 border border-teal-200 dark:border-teal-600">
          <CheckedOutItemList/>
        </div>
      </div>
    </div>
  );
}