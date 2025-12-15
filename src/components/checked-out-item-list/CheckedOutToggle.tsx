interface CheckedOutToggleProps {
  count: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function CheckedOutToggle({ count, isOpen, onToggle }: CheckedOutToggleProps) {
  return (
    <button 
      onClick={onToggle}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-200 
        flex items-center gap-2
        ${isOpen
          ? 'bg-primary-500 text-white shadow-lg'
          : 'bg-theme-surface text-theme-primary hover:bg-theme-hover border border-theme-border'
        }
      `}
    >
      <span>Checked Out</span>
      {count > 0 && (
        <span className={`
          px-2 py-0.5 rounded-full text-xs font-bold
          ${isOpen ? 'bg-white/20 text-white' : 'bg-primary-500 text-white'}
        `}>
          {count}
        </span>
      )}
    </button>
  );
}
