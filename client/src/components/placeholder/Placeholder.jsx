import React from "react";
import './productplaceholder.css';
// import useFetchProducts from "../../hooks/useFetechProducts";

const ProductPlaceholder = () => {
  // const { products, error, loading } = useFetchProducts();
  // console.log(products);
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
