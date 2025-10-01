
interface ItemListDisplayProps {
  viewMode: 'grid-view' | 'list-view';
}

export default function ItemListDisplay({ viewMode }: ItemListDisplayProps) {
  console.log('ItemListDisplay props, viewMode: ', viewMode);
  
  return (
    <div>
      <h2>Item List Display</h2>
    </div>
  );
}