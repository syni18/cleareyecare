import React from "react";
import "./productcard.css";
import Img4 from '../../assets/img4.png'
import dummy from '../../assets/dummy.png';

function ProductCard() {
  return (
    <div className="productcard-wrapper">
      <div className="product">
        <img
          src={Img4}
          alt="product"
          className="product-image"
        />
        <div className="product-info">
          <h3 className="product-title">Iphone 12</h3>
          <p className="product-price">Rs {product.price}</p>
        </div>
      </div>
      <a href="" className="body-buy-btn">
        Buy
      </a>
      <a href="" className="body-cart-btn">
        Add to Cart
      </a>
    </div>
  );
}

export default ProductCard;
