import React, { useState } from "react";
import "./bag.css";

const SelectionComponent = () => {
  const [size, setSize] = useState("XL");
  const [color, setColor] = useState("Blue");
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="selection-container">
      {/* Size Selector */}
      <select
        className="dropdown"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>

      {/* Color Selector */}
      <select
        className="dropdown"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Green">Green</option>
        <option value="Black">Black</option>
        <option value="White">White</option>
      </select>

      {/* Quantity Selector */}
      <div className="quantity-selector">
        <button
          className="quantity-btn"
          onClick={() => handleQuantityChange("decrement")}
        >
          -
        </button>
        <span className="quantity-display">{quantity}</span>
        <button
          className="quantity-btn"
          onClick={() => handleQuantityChange("increment")}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SelectionComponent;
