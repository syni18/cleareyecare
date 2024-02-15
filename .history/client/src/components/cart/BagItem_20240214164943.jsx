import React from 'react'
import './bagitem.css';
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/action/cartAction';
function BagItem() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const handleIncreaseQuantity = (productId) => {
      dispatch(increaseQuantity(productId));
    };

    const handleDecreaseQuantity = (productId) => {
      dispatch(decreaseQuantity(productId));
    };
    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
      };
  return (
    <>
      {cartItems.map((item, index) => (
        <div className="bagitem-wrapper" key={index}>
          <div className="bagitem-container">
            <div className="bagitem-items">
              <img src={item.thumbnail} alt="" srcset="" />
              <div className="bagitem-item-det">
                <h4>{item.title}</h4>
                <button
                  className="bagitem-remove-btn"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="bagitem-attr-cnt">
              <div className="attr-cnt-det">
                <span>Color: {item.color}</span>
                <span>Size: {"One Size"}</span>
              </div>
            </div>
            <div className="bagitem-quantity">
              <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
              <span>{"1"}</span>
              <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            </div>
            <div className="bagitem-shipcost">
              <span>$15.00</span>
            </div>
            <div className="bagitem-price">
              <span>${item.price}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default BagItem