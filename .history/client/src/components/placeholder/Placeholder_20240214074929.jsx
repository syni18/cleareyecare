// ProductPlaceholder.jsx
import React from "react";
import "./Productlaceholder.css"; // Assume you have a CSS file for styling

const ProductPlaceholder = () => {
  return (
    <div className="product-placeholder">
      <div className="product-image-placeholder"></div>
      <div className="product-info-placeholder">
        <div className="product-title-placeholder"></div>
        <div className="product-price-placeholder"></div>
      </div>
    </div>
  );
};

export default ProductPlaceholder;
