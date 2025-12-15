interface CheckedOutToggleProps {
  count: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function CheckedOutToggle({
  count,
  isOpen,
  onToggle
}: CheckedOutToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={isOpen}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg border
        transition-all duration-200
        ${
          isOpen
            ? `
              bg-theme-surface border-theme-primary
              shadow-inner
              text-theme-primary
            `
            : `
              bg-theme-hover border-theme
              text-theme-secondary hover:text-theme-primary
            `
        }
      `}
    >
      <span>Checked Out</span>

      {count > 0 && (
        <span
          className={`
            px-2 py-0.5 text-xs rounded-full
            ${
              isOpen
                ? 'bg-theme-primary text-black'
                : 'bg-theme-primary/80 text-black'
            }
          `}
        >
          {count}
        </span>
      )}
      {/* Chevron / panel icon */}
      <svg
        className={`
          w-4 h-4 ml-1
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'rotate-180' : 'rotate-0'}
        `}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
      </svg>
    </button>
  );
}
