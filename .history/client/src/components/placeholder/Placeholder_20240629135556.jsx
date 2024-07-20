import React from "react";
import "./ProductPlaceholder.css";

const ProductPlaceholder = () => {
  return (
    <div className="product-placeholder">
      <div className="product-placeholder-image"></div>
      <div className="product-placeholder-info">
        <div className="product-placeholder-title"></div>
        <div className="product-placeholder-price"></div>
      </div>
    </div>
  );
};

export default ProductPlaceholder;
