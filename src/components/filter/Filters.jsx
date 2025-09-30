import React from "react";
import SearchInput from "./SearchInput";
import TagFilter from "./TagFilter";

export default function Filters() {
  return (
    <div className="flex gap-4 px-2 py-2 ml-2 border border-lime-200">
      <SearchInput />
      <div className="flex items-center">
        <TagFilter/>
      </div>
      <button className="text-lg bg-red-200 border px-2 py-2 border-lime-200">
        Add Item
      </button>
    </div>
  );
}