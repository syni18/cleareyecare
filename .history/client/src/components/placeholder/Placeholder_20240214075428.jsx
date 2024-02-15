// ProductPlaceholder.jsx
import React from "react";
import "./productplaceholder.css"; // Assume you have a CSS file for styling

const ProductPlaceholder = () => {
  return (
    <div className="product">
      <img
        src=""
        alt=""
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">Rs {product.price}</p>
      </div>
    </div>
  );
};

export default ProductPlaceholder;
