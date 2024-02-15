import React from 'react'
import './bagitem.css';
import img1 from '../../assets/img1.png'
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity } from '../../redux/action/cartAction';
function BagItem() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const handleIncreaseQuantity = (productId) => {
      dispatch(increaseQuantity(productId));
    };

    const handleDecreaseQuantity = (productId) => {
      dispatch(decreaseQuantity(productId));
    };
  return (
    <>
    {
        cartItems.map((item, index))
    }
    </>
  );
}

export default BagItem