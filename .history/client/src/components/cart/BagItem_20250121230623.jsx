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
        
      </div>

    </div>
  );
};

export default BagItem;
