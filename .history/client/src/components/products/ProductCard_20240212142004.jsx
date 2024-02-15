import React from "react";
import "./productcard.css";
import Img4 from '../../assets/img4.png'
import dummy from '../../assets/dummy.png';
import { Link } from "react-router-dom";
import { UseDispatch } from "react-redux";
import { addToCart } from "../../store/cartReducer";

function ProductCard({item}) {
  
  return (
    <div className="productcard-wrapper">
        <Link to={`/item/${item.id}`}>
          <div className="product">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">{item.title}</h3>
              <p className="product-price">Rs {item.price}</p>
            </div>
          </div>
        </Link>
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
