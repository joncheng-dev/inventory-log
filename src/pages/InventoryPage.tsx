import Header from '../components/Header';
import Filters from '../components/filter/Filters';
import ItemList from '../components/ItemList';
import CheckedOutItemList from '../components/CheckedOutItemList';

export default function InventoryPage() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex w-full border border-fuchsia-300">
        <Filters/>
      </div>
      <div className="flex flex-1 w-full">
        <div className="flex-1 border border-cyan-300">
          <ItemList />
        </div>
        <div className="w-1/5 border border-teal-200">
          <CheckedOutItemList/>
        </div>
      </div>
    </div>
  );
}