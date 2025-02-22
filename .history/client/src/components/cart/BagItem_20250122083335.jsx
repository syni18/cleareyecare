import React, { useCallback, useEffect, useRef } from "react";
import "./bagitem.css";
import useCartStore from "../../redux/store/cartStore";
import { editItemsInCart, removeProductFromCart } from "../../helper/helper";
import IMG from "../../assets/img1.png";

const BagItem = () => {
  // const {
  //   cartItems,
  //   increaseQuantity,
  //   decreaseQuantity,
  //   removeFromCart,
  // } = useCartStore();


  // const handleIncreaseQuantity = useCallback(
  //   async (id) => {
  //     increaseQuantity(id);
  //     await editItemsInCart({id, quantity: 1})
  //   },
  //   [increaseQuantity]
  // );

  // const handleDecreaseQuantity = useCallback(
  //   async (id) => {
  //       decreaseQuantity(id);
  //       await editItemsInCart({id, quantity: -1})
  //     },
  //   [decreaseQuantity]
  // );

  // const handleRemoveFromCart = useCallback(
  //   async (item) => {
  //     console.log("item", item);
  //      removeFromCart(item);
  //      await removeProductFromCart(item);
  //   },
  //   [removeFromCart]
  // );

  // if (cartItems.length === 0) {
  //   return <div>Your cart is empty.</div>; // Handle empty cart case
  // }

  return (
    <div className="bgt-wrapper">
      <div className="bgt-container">
        <div className="bgt-ct-left">
          <div className="ct-left-img">
            <img src={IMG} alt="" srcset="" className="ct-lt-imgcard" />
          </div>
        </div>
        <div className="bgt-ct-right">
          <div className="ct-rt-top">
            <div className="rt-top-left">
              <span className="top-lt-name">Relexed Fit T-shirt</span>
              <span className="top-lt-det">
                <span className="lt-det-price">$12.00</span>
                <span className="lt-det-break">|</span>
                <span className="lt-det-stock">In Stock</span>
              </span>
            </div>
            <span className="rt-top-right">$19.56</span>
          </div>
          <div className="ct-rt-bottom">
            <div className="rt-bottom-left">
              <div className="bt-lt-size">
                <select
                  className="dropdown"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              <div className="bt-lt-color">
                <select
                  className="dropdown"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                </select>
              </div>
              .bt-lt-
            </div>
            <div className="rt-bottom-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagItem;
