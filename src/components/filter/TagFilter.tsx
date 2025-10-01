import { useState } from "react";

const availableFilterTags = ["Biology", "Chemistry", "Earth Science", "General", "Physics"];

export default function TagFilter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="px-4 py-2 border rounded-md text-theme-primary"
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