import React, { useMemo } from "react";

const Dropdown = ({ category, items, visible, toggleDropdown }) => {
  const chunkedItems = useMemo(() => chunkItems(items, 10), [items]);

  return (
    <li
      className="nav-item"
      onMouseEnter={() => toggleDropdown(category)}
      onMouseLeave={() => toggleDropdown("")}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
      {visible === category && (
        <div className="dropdown-content">
          {chunkedItems.map((chunk, index) => (
            <div key={index} className="dropdown-column">
              {chunk.map((item) => (
                <a key={item} href="#">
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

const chunkItems = (items, size) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

export default Dropdown;
