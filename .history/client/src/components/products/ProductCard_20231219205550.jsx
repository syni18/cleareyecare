import React from "react";
import "./productcard.css";
import Img4 from '../../assets/img4.png'
import dummy from '../../assets/dummy.png';

function ProductCard() {
  return (
    <div className="productcard-wrapper">
      <img src={Img4} alt="" />
      <div className="productcard-body">
        <h5 className="body-title">Card</h5>
        <p>Some text details</p>
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
