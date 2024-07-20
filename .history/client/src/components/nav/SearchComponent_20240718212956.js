import React from "react";
import { Search } from "lucide-react";

export const SearchComponent = ({ searchInput, setSearchInput, handleSearch }) => (
  <div className="nav-search">
    <input
      type="search"
      name="search"
      id="search"
      className="search-input"
      placeholder="search products..."
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && searchInput.trim() !== "") {
          handleSearch(searchInput);
        }
      }}
    />
    <button onClick={() => handleSearch(searchInput)} className="search-label">
      <Search />
    </button>
  </div>
);

