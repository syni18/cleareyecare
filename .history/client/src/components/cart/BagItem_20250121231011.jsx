import React, { useCallback, useEffect, useRef } from "react";
import "./bagitem.css";
import useCartStore from "../../redux/store/cartStore";
import { editItemsInCart, removeProductFromCart } from "../../helper/helper";

const BagItem = ({cartItems, increaseQuantity, decreaseQuantity, removeFromCart}) => {
  // const {
  //   cartItems,
  //   increaseQuantity,
  //   decreaseQuantity,
  //   removeFromCart,
  // } = useCartStore();


  const handleIncreaseQuantity = useCallback(
    async (id) => {
      increaseQuantity(id);
      await editItemsInCart({id, quantity: 1})
    },
    [increaseQuantity]
  );

  const handleDecreaseQuantity = useCallback(
    async (id) => {
        decreaseQuantity(id);
        await editItemsInCart({id, quantity: -1})
      },
    [decreaseQuantity]
  );

  const handleRemoveFromCart = useCallback(
    async (item) => {
      console.log("item", item);
       removeFromCart(item);
       await removeProductFromCart(item);
    },
    [removeFromCart]
  );

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>; // Handle empty cart case
  }

  return (
    <div className="bgt-wrapper">
      <div className="bgt-container">
        <div className="bgt-ct-left">
          <div className="ct-left-img">
            <img src="" alt="" srcset="" className="ct-lt-imgcard" />
          </div>
        </div>
        <div className="bgt-ct-right">
          <div className="ct-rt-top">
            <div className="rt-top-left"></div>
            <div className="rt-top-right"></div>
          </div>
          <div className="ct-rt-bottom">
            <div className="rt-bottom-left"></div>
            <div className="rt-bottom-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagItem;
