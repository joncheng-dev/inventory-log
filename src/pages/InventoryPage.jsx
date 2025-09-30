import React from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import ItemList from '../components/ItemList';
import InfoPanel from '../components/InfoPanel';

export default function InventoryPage() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex flex-1 w-full">
        <div className="w-1/6 border border-lime-200">
          <Filters />
        </div>
        <div className="flex-1 border border-cyan-300">
          <ItemList />
        </div>
        <div className="w-1/5 border border-teal-200">
          <InfoPanel/>
        </div>
      </div>
    </div>
  );
}