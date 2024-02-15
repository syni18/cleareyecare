import React from "react";
import "./productcard.css";

import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartReducer'; // Adjust the import path

function ProductCard({item}) {
  const dispatch = useDispatch();
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
      <a href="" className="body-cart-btn" onClick={dispatch(addToCart(item))}>
        Add to Cart
      </a>
    </div>
  );
}

export default ProductCard;
