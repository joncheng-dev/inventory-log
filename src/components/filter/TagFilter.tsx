import { useState, useEffect, useRef } from "react";

interface TagFilterProps {
  availableFilterTags: Array<string>;
  selectedTags: Array<string>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TagFilter({
  availableFilterTags,
  selectedTags,
  setSelectedTags,
}: TagFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        className="px-4 py-2 border border-theme rounded-md text-theme-primary"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Filter by Tags
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-56 bg-theme-surface rounded-md shadow-lg border border-theme z-50">
          <ul className="p-2 space-y-1 max-h-60 overflow-y-auto">
            {availableFilterTags.map((tag) => (
              <li key={tag}>
                <button
                  onClick={() => toggleTag(tag)}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${
                    selectedTags.includes(tag)
                      ? "bg-theme-focus text-theme-focus"
                      : "hover:bg-theme text-theme-primary"
                  }`}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
