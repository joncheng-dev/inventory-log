import type { ViewMode } from '../types';

interface ItemListDisplayProps {
  viewMode: ViewMode;
}

export default function ItemListDisplay({ viewMode }: ItemListDisplayProps) {
  console.log('ItemListDisplay props, viewMode: ', viewMode);
  
  return (
    <div>
      <h2>Item List Display</h2>
    </div>
  );
}