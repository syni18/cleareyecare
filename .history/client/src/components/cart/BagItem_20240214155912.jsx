import React from 'react'
import './bagitem.css';
import img1 from '../../assets/img1.png'
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity } from '../../redux/action/cartAction';
function BagItem() {
    const dispatch = useDispatch();
    // const cartItems = useSelector((state) => state.cart.cartItems);

    const handleIncreaseQuantity = (productId) => {
      dispatch(increaseQuantity(productId));
    };

    const handleDecreaseQuantity = (productId) => {
      dispatch(decreaseQuantity(productId));
    };
  return (
    <div className="bagitem-wrapper">
      <div className="bagitem-container">
        <div className="bagitem-items">
          <img src={img1} alt="" srcset="" />
          <div className="bagitem-item-det">
            <h4>{"alternate database systems "}</h4>
            <button className="bagitem-remove-btn">Remove</button>
          </div>
        </div>
        <div className="bagitem-attr-cnt">
          <div className="attr-cnt-det">
            <span>Color: {"Blue"}</span>
            <span>Size: {"One Size"}</span>
          </div>
        </div>
        <div className="bagitem-quantity">
          <button onClick={() => handleDecreaseQuantity(1)}>-</button>
          <span>{"5"}</span>
          <button onClick={() => handleIncreaseQuantity(1)}>+</button>
        </div>
      </div>
    </div>
  );
}

export default BagItem